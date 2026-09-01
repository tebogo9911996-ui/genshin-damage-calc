import {
  calculateDirectDamage,
} from "./damage";

import {
  calculateLunarDirectDamage,
} from "./dedicatedReactions";

export type SpecialDamageSource =
  | "passive"
  | "constellation"
  | "weapon"
  | "artifact"
  | "other";

export type SpecialDamageType =
  | "direct"
  | "lunarCharged"
  | "lunarBloom"
  | "lunarCrystallize";

export type SpecialScalingStat =
  | "atk"
  | "hp"
  | "def"
  | "em";

export type SpecialDamageEntry = {
  id: string;
  sourceType: SpecialDamageSource;
  sourceName: string;
  label: string;
  damageType: SpecialDamageType;
  scalingStat: SpecialScalingStat;
  multiplier: number;
  rawText: string;
  path: string;
};

type ScanContext = {
  path: string[];
  inheritedName?: string;
};

/*
 * ==================================================
 * Nanokaデータから「追加ダメージ候補」を自動抽出
 * ==================================================
 *
 * CharacterDataの型に依存せず、レスポンス全体を再帰走査する。
 *
 * 強い条件だけを採用:
 * - 「ダメージ」を含む
 * - ATK / HP / DEF / EM のどれかを参照
 * - 具体的な%倍率が本文にある
 *
 * これにより、固有天賦や命ノ星座の追加攻撃を
 * キャラごとのpage.tsx直書きなしで拾える。
 */

function normalizeText(
  value: string
) {
  return value
    /*
     * Nanoka / Genshin本文に含まれる表示用タグを除去。
     * 例:
     * <color=#FFD780FF>特殊元素スキル</color>
     */
    .replace(
      /<color=[^>]+>/gi,
      ""
    )
    .replace(
      /<\/color>/gi,
      ""
    )
    /*
     * LINK参照タグを除去。
     * 例:
     * {LINK#N11160001}
     * {LINK#S11165}
     * {/LINK}
     * {LINK}
     */
    .replace(
      /\{\/?LINK(?:#[^}]*)?\}/gi,
      ""
    )
    /*
     * 万一括弧なしのLINK表記が混じった場合も除去。
     */
    .replace(
      /\/?LINK(?:#[A-Z]?\d+)?/gi,
      ""
    )
    /*
     * 将来ほかの簡単な表示タグが混じっても、
     * UI上にはタグ文字列を出さない。
     */
    .replace(
      /<[^>]+>/g,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();
}

function getSourceType(
  path: string[]
): SpecialDamageSource {
  const joined =
    path.join(".").toLowerCase();

  if (
    joined.includes(
      "constellation"
    ) ||
    joined.includes(
      "constellations"
    )
  ) {
    return "constellation";
  }

  if (
    joined.includes(
      "passive"
    ) ||
    joined.includes(
      "talent"
    ) ||
    joined.includes(
      "inherent"
    )
  ) {
    return "passive";
  }

  if (
    joined.includes(
      "weapon"
    )
  ) {
    return "weapon";
  }

  if (
    joined.includes(
      "artifact"
    )
  ) {
    return "artifact";
  }

  return "other";
}

function getConstellationNumber(
  path: string[]
) {
  for (
    let i = 0;
    i < path.length;
    i++
  ) {
    const part =
      path[i].toLowerCase();

    if (
      part ===
        "constellation" ||
      part ===
        "constellations"
    ) {
      const next =
        path[
          i + 1
        ];

      if (
        next !==
          undefined &&
        /^\d+$/.test(
          next
        )
      ) {
        return (
          Number(
            next
          ) + 1
        );
      }
    }

    const directMatch =
      part.match(
        /^constellation[_-]?(\d+)$/
      );

    if (directMatch) {
      return Number(
        directMatch[1]
      );
    }
  }

  return null;
}

function isMainSkillPath(
  path: string[]
) {
  return path.some(
    (part) =>
      part.toLowerCase() ===
      "skills"
  );
}

function getDamageType(
  text: string
): SpecialDamageType {
  if (
    text.includes(
      "月感電"
    )
  ) {
    return "lunarCharged";
  }

  if (
    text.includes(
      "月開花"
    )
  ) {
    return "lunarBloom";
  }

  if (
    text.includes(
      "月結晶"
    )
  ) {
    return "lunarCrystallize";
  }

  return "direct";
}

function parseScaling(
  text: string
): {
  scalingStat: SpecialScalingStat;
  multiplier: number;
} | null {
  const patterns: Array<{
    stat: SpecialScalingStat;
    regex: RegExp;
  }> = [
    {
      stat: "atk",
      regex:
        /攻撃力(?:の)?\s*([0-9]+(?:\.[0-9]+)?)%/,
    },
    {
      stat: "hp",
      regex:
        /(?:HP上限|最大HP)(?:の)?\s*([0-9]+(?:\.[0-9]+)?)%/,
    },
    {
      stat: "def",
      regex:
        /防御力(?:の)?\s*([0-9]+(?:\.[0-9]+)?)%/,
    },
    {
      stat: "em",
      regex:
        /元素熟知(?:の)?\s*([0-9]+(?:\.[0-9]+)?)%/,
    },
  ];

  for (
    const pattern of
    patterns
  ) {
    const match =
      text.match(
        pattern.regex
      );

    if (match) {
      return {
        scalingStat:
          pattern.stat,
        multiplier:
          Number(
            match[1]
          ) /
          100,
      };
    }
  }

  return null;
}

function getObjectName(
  value: Record<
    string,
    unknown
  >
) {
  const candidates = [
    value.name,
    value.title,
    value.label,
  ];

  for (
    const candidate of
    candidates
  ) {
    if (
      typeof candidate ===
      "string" &&
      candidate.trim()
    ) {
      return candidate.trim();
    }
  }

  return undefined;
}

function looksLikeDirectDamageText(
  text: string
) {
  /*
   * 「ダメージアップ」「与えるダメージ+○%」などの
   * バフ説明を追加ダメージとして誤検出しない。
   */
  const buffLikePatterns = [
    /ダメージ(?:が|を)?(?:アップ|上昇|増加)/,
    /与えるダメージ/,
    /ダメージ(?:バフ|ボーナス)/,
    /ダメージ\+?\s*[0-9]+(?:\.[0-9]+)?%/,
    /与ダメージ/,
    /damage bonus/i,
    /damage increased/i,
    /increase(?:s|d)? .* damage/i,
  ];

  if (
    buffLikePatterns.some(
      (pattern) =>
        pattern.test(
          text
        )
    )
  ) {
    return false;
  }

  /*
   * 追加攻撃そのものを表す表現だけ通す。
   * 自然言語の単なる「ダメージ」という単語だけでは採用しない。
   */
  const directDamagePatterns = [
    /ダメージを与え/,
    /ダメージを与える/,
    /ダメージを発生/,
    /ダメージとして扱/,
    /追加攻撃/,
    /追撃/,
    /範囲ダメージ/,
    /元素ダメージ/,
    /物理ダメージ/,
    /deals? .* damage/i,
    /deal .* damage/i,
  ];

  return directDamagePatterns.some(
    (pattern) =>
      pattern.test(
        text
      )
  );
}

function scanNode(
  node: unknown,
  context: ScanContext,
  output: SpecialDamageEntry[]
) {
  if (
    node === null ||
    node === undefined
  ) {
    return;
  }

  if (
    typeof node ===
    "string"
  ) {
    const text =
      normalizeText(
        node
      );

    if (
      !text.includes(
        "ダメージ"
      ) ||
      !looksLikeDirectDamageText(
        text
      )
    ) {
      return;
    }

    /*
     * 通常/スキル/爆発の倍率表は既存damageGroupsが担当。
     * ここではそこを二重登録しない。
     */
    if (
      isMainSkillPath(
        context.path
      )
    ) {
      return;
    }

    const scaling =
      parseScaling(
        text
      );

    if (!scaling) {
      return;
    }

    const sourceType =
      getSourceType(
        context.path
      );

    const constellationNumber =
      sourceType ===
        "constellation"
        ? getConstellationNumber(
            context.path
          )
        : null;

    const baseSourceName =
      context
        .inheritedName ??
      (
        sourceType ===
        "constellation"
          ? "命ノ星座"
          : sourceType ===
            "passive"
          ? "固有天賦"
          : "特殊効果"
      );

    const sourceName =
      sourceType ===
        "constellation" &&
      constellationNumber !==
        null
        ? `C${constellationNumber} ${baseSourceName}`
        : baseSourceName;

    const damageType =
      getDamageType(
        text
      );

    const path =
      context.path.join(
        "."
      );

    const id =
      `${path}:${scaling.scalingStat}:${scaling.multiplier}:${damageType}`;

    /*
     * 文章全体ではなく、UIには短いラベルを表示。
     */
    const firstSentence =
      text
        .split(
          /[。！？]/
        )[0]
        ?.trim() ||
      "追加ダメージ";

    output.push({
      id,
      sourceType,
      sourceName,
      label:
        firstSentence.length >
        60
          ? `${firstSentence.slice(
              0,
              57
            )}…`
          : firstSentence,
      damageType,
      scalingStat:
        scaling.scalingStat,
      multiplier:
        scaling.multiplier,
      rawText:
        text,
      path,
    });

    return;
  }

  if (
    Array.isArray(
      node
    )
  ) {
    node.forEach(
      (
        item,
        index
      ) => {
        scanNode(
          item,
          {
            path: [
              ...context.path,
              String(index),
            ],
            inheritedName:
              context.inheritedName,
          },
          output
        );
      }
    );

    return;
  }

  if (
    typeof node ===
    "object"
  ) {
    const record =
      node as Record<
        string,
        unknown
      >;

    const ownName =
      getObjectName(
        record
      );

    Object.entries(
      record
    ).forEach(
      ([
        key,
        value,
      ]) => {
        /*
         * name/title自体をダメージ本文として解析しない。
         */
        if (
          key === "name" ||
          key === "title" ||
          key === "label"
        ) {
          return;
        }

        scanNode(
          value,
          {
            path: [
              ...context.path,
              key,
            ],
            inheritedName:
              ownName ??
              context.inheritedName,
          },
          output
        );
      }
    );
  }
}

export function extractSpecialDamageEntries(
  characterData: unknown
) {
  const output:
    SpecialDamageEntry[] = [];

  scanNode(
    characterData,
    {
      path: [
        "character",
      ],
    },
    output
  );

  /*
   * 同じ説明が複数フィールドに存在する場合の重複除去。
   */
  const unique =
    new Map<
      string,
      SpecialDamageEntry
    >();

  output.forEach(
    (entry) => {
      const key =
        [
          entry.sourceName,
          entry.rawText,
          entry.damageType,
          entry.scalingStat,
          entry.multiplier,
        ].join(
          "::"
        );

      if (
        !unique.has(
          key
        )
      ) {
        unique.set(
          key,
          entry
        );
      }
    }
  );

  return [
    ...unique.values(),
  ];
}

/*
 * ==================================================
 * 追加ダメージ計算
 * ==================================================
 */

export function calculateSpecialDamage({
  entry,
  attack,
  hp,
  defense,
  elementalMastery,
  critDamage,
  elementDamageBonus,
  genericDamageBonus,
  lunarChargedBonus,
  lunarBloomBonus,
  lunarCrystallizeBonus,
  defenseMultiplier,
  resistanceMultiplier,
}: {
  entry: SpecialDamageEntry;
  attack: number;
  hp: number;
  defense: number;
  elementalMastery: number;
  critDamage: number;
  elementDamageBonus: number;
  genericDamageBonus: number;
  lunarChargedBonus: number;
  lunarBloomBonus: number;
  lunarCrystallizeBonus: number;
  defenseMultiplier: number;
  resistanceMultiplier: number;
}) {
  const referenceValue =
    entry.scalingStat ===
    "hp"
      ? hp
      : entry.scalingStat ===
        "def"
      ? defense
      : entry.scalingStat ===
        "em"
      ? elementalMastery
      : attack;

  if (
    entry.damageType ===
      "lunarCharged" ||
    entry.damageType ===
      "lunarBloom" ||
    entry.damageType ===
      "lunarCrystallize"
  ) {
    const lunarBonus =
      entry.damageType ===
      "lunarCharged"
        ? lunarChargedBonus
        : entry.damageType ===
          "lunarBloom"
        ? lunarBloomBonus
        : lunarCrystallizeBonus;

    return calculateLunarDirectDamage({
      reaction:
        entry.damageType,
      referenceValue,
      multiplier:
        entry.multiplier,
      elementalMastery,
      lunarReactionBonusPercent:
        lunarBonus,
      critDamagePercent:
        critDamage,
      resistanceMultiplier,
    });
  }

  return calculateDirectDamage({
    attack:
      referenceValue,
    multiplier:
      entry.multiplier,
    damageBonus:
      elementDamageBonus +
      genericDamageBonus,
    critDamage,
    defenseMultiplier,
    resistanceMultiplier,
  });
}
