import {
  REACTION_DATA,
} from "./reactionData";

import {
  getReactionTalentSection,
  type DedicatedReactionId,
} from "./reactionEngine";

import {
  getReactionInternalEntryKeyFromTalent,
} from "./reactionEntryAdapter";

import type {
  TalentEntry,
} from "./talents";

export type LunarReferenceStat =
  | "atk"
  | "hp"
  | "def"
  | "em";

export type ResolvedDedicatedReaction = {
  reactionId: DedicatedReactionId;
  referenceStat: LunarReferenceStat;
  matchedBy:
    | "character-rule"
    | "label"
    | "adapter"
    | "single-rule-fallback";
  internalEntryKey: string | null;
};

type CharacterLunarRule = {
  characterId: string;
  reactionId: DedicatedReactionId;
  referenceStat: LunarReferenceStat;
  skillIndexes?: number[];
  includeAny?: string[];
  includeAll?: string[];
};

const CHARACTER_LUNAR_RULES:
  CharacterLunarRule[] = [
  /*
   * イネファ
   * 月感電扱いの固有追撃は攻撃力参照。
   * 現在のダメージ表に固有天賦行が追加された場合も拾える。
   */
  {
    characterId: "10000116",
    reactionId: "lunarCharged",
    referenceStat: "atk",
    includeAny: [
      "オーバークロック",
      "追加攻撃",
      "懲戒訓示",
      "月感電",
    ],
  },

  /*
   * ラウマ
   * C0では元素スキル長押し2段目が月開花扱い。
   */
  {
    characterId: "10000119",
    reactionId: "lunarBloom",
    referenceStat: "em",
    skillIndexes: [1],
    includeAll: [
      "2段",
      "ダメージ",
    ],
  },

  /*
   * フリンズ
   * 爆発の中段/最終攻撃と特殊爆発が月感電扱い。
   */
  {
    characterId: "10000120",
    reactionId: "lunarCharged",
    referenceStat: "atk",
    skillIndexes: [2],
    includeAny: [
      "月感電",
      "中段攻撃",
      "最終攻撃",
      "雷霆のシンフォニー",
    ],
  },

  /*
   * ネフェル
   * 「自身の幻の戯」は通常草ダメージ。
   * 「虚ろな影」の3段だけが月開花。
   */
  {
    characterId: "10000122",
    reactionId: "lunarBloom",
    referenceStat: "em",
    skillIndexes: [1],
    includeAny: [
      "「虚ろな影」",
      "虚ろな影",
    ],
  },

  /*
   * コロンビーナ
   * 月露浄化は月開花。
   */
  {
    characterId: "10000125",
    reactionId: "lunarBloom",
    referenceStat: "hp",
    skillIndexes: [0],
    includeAny: [
      "月露浄化",
    ],
  },

  /*
   * コロンビーナ
   * 元素スキル「引力の干渉」の3種。
   */
  {
    characterId: "10000125",
    reactionId: "lunarCharged",
    referenceStat: "hp",
    skillIndexes: [1],
    includeAny: [
      "月感電",
    ],
  },
  {
    characterId: "10000125",
    reactionId: "lunarBloom",
    referenceStat: "hp",
    skillIndexes: [1],
    includeAny: [
      "月開花",
    ],
  },
  {
    characterId: "10000125",
    reactionId: "lunarCrystallize",
    referenceStat: "hp",
    skillIndexes: [1],
    includeAny: [
      "月結晶",
    ],
  },

  /*
   * シハク（Nanoka ID 10000126 / 兹白）
   * 強化通常4段目追加・特殊元素スキル・爆発2段目が月結晶。
   */
  {
    characterId: "10000126",
    reactionId: "lunarCrystallize",
    referenceStat: "def",
    skillIndexes: [1],
    includeAny: [
      "月結晶",
      "翔ける霊駒",
      "4段目",
      "4段追加",
      "四段目",
    ],
  },
  {
    characterId: "10000126",
    reactionId: "lunarCrystallize",
    referenceStat: "def",
    skillIndexes: [2],
    includeAny: [
      "月結晶",
      "2段",
      "2段目",
    ],
  },

  /*
   * リンネア
   * パワーハンマー / 100万トンハンマーが月結晶扱い。
   */
  {
    characterId: "10000130",
    reactionId: "lunarCrystallize",
    referenceStat: "def",
    skillIndexes: [1],
    includeAny: [
      "月結晶",
      "パワーハンマー",
      "100万トンハンマー",
    ],
  },
];

const GENERIC_LABEL_RULES: Array<{
  keywords: string[];
  reactionId: DedicatedReactionId;
}> = [
  {
    keywords: [
      "月感電",
      "ルナ感電",
      "lunar charged",
      "lunarcharged",
    ],
    reactionId:
      "lunarCharged",
  },
  {
    keywords: [
      "月開花",
      "ルナ開花",
      "lunar bloom",
      "lunarbloom",
    ],
    reactionId:
      "lunarBloom",
  },
  {
    keywords: [
      "月結晶",
      "ルナ結晶",
      "lunar crystallize",
      "lunarcrystallize",
    ],
    reactionId:
      "lunarCrystallize",
  },
  {
    keywords: [
      "星電導",
      "stellar conduct",
      "stellarconduct",
    ],
    reactionId:
      "stellarConduct",
  },
];

const CHARACTER_DEFAULT_REFERENCE_STAT:
  Record<string, LunarReferenceStat> = {
  "10000116": "atk", // イネファ
  "10000119": "em",  // ラウマ
  "10000120": "atk", // フリンズ
  "10000122": "em",  // ネフェル
  "10000125": "hp",  // コロンビーナ
  "10000126": "def", // シハク / 兹白
  "10000130": "def", // リンネア
  "10000133": "atk", // サンドローネ
};

function normalizeText(
  value: string
) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function includesKeyword(
  label: string,
  keyword: string
) {
  return normalizeText(label).includes(
    normalizeText(keyword)
  );
}

function matchesCharacterRule(
  rule: CharacterLunarRule,
  characterId: string,
  skillIndex: number,
  label: string
) {
  if (
    rule.characterId !==
    characterId
  ) {
    return false;
  }

  if (
    rule.skillIndexes &&
    !rule.skillIndexes.includes(
      skillIndex
    )
  ) {
    return false;
  }

  if (
    rule.includeAll &&
    !rule.includeAll.every(
      (keyword) =>
        includesKeyword(
          label,
          keyword
        )
    )
  ) {
    return false;
  }

  if (
    rule.includeAny &&
    !rule.includeAny.some(
      (keyword) =>
        includesKeyword(
          label,
          keyword
        )
    )
  ) {
    return false;
  }

  return true;
}

function getGenericReactionIdFromLabel(
  label: string
): DedicatedReactionId | null {
  for (
    const rule of
    GENERIC_LABEL_RULES
  ) {
    if (
      rule.keywords.some(
        (keyword) =>
          includesKeyword(
            label,
            keyword
          )
      )
    ) {
      return rule.reactionId;
    }
  }

  return null;
}

function getSectionRuleEntries({
  characterId,
  skillIndex,
}: {
  characterId: string;
  skillIndex: number;
}) {
  const section =
    getReactionTalentSection(
      skillIndex
    );

  if (!section) {
    return [];
  }

  const characterRules =
    REACTION_DATA
      .directReactionEntryRules[
        characterId as keyof typeof REACTION_DATA.directReactionEntryRules
      ];

  if (!characterRules) {
    return [];
  }

  const sectionRules =
    characterRules[
      section as keyof typeof characterRules
    ];

  if (!sectionRules) {
    return [];
  }

  return Object.entries(
    sectionRules
  ).filter(
    (
      entry
    ): entry is [
      string,
      DedicatedReactionId,
    ] => {
      const reactionId =
        entry[1];

      return (
        reactionId ===
          "lunarCharged" ||
        reactionId ===
          "lunarBloom" ||
        reactionId ===
          "lunarCrystallize" ||
        reactionId ===
          "stellarConduct"
      );
    }
  );
}

export function resolveDedicatedReaction({
  characterId,
  skillIndex,
  entry,
}: {
  characterId: string;
  skillIndex: number;
  entry: TalentEntry;
}): ResolvedDedicatedReaction | null {
  /*
   * 1. 月反応7キャラの実際の天賦仕様を優先。
   */
  const characterRule =
    CHARACTER_LUNAR_RULES.find(
      (rule) =>
        matchesCharacterRule(
          rule,
          characterId,
          skillIndex,
          entry.label
        )
    );

  if (characterRule) {
    return {
      reactionId:
        characterRule.reactionId,
      referenceStat:
        characterRule.referenceStat,
      matchedBy:
        "character-rule",
      internalEntryKey:
        null,
    };
  }

  /*
   * 2. 明示的に「月感電 / 月開花 / 月結晶 / 星電導」と
   *    書かれている項目。
   */
  const byLabel =
    getGenericReactionIdFromLabel(
      entry.label
    );

  if (byLabel) {
    return {
      reactionId:
        byLabel,
      referenceStat:
        CHARACTER_DEFAULT_REFERENCE_STAT[
          characterId
        ] ?? "atk",
      matchedBy:
        "label",
      internalEntryKey:
        null,
    };
  }

  /*
   * 3. Nanoka param → 内部キー adapter。
   *    サンドローネ等の安定した対応に使用。
   */
  const section =
    getReactionTalentSection(
      skillIndex
    );

  if (section) {
    const internalEntryKey =
      getReactionInternalEntryKeyFromTalent({
        characterId,
        section,
        entry,
      });

    if (internalEntryKey) {
      const entries =
        getSectionRuleEntries({
          characterId,
          skillIndex,
        });

      const matched =
        entries.find(
          ([key]) =>
            key ===
            internalEntryKey
        );

      if (matched) {
        return {
          reactionId:
            matched[1],
          referenceStat:
            CHARACTER_DEFAULT_REFERENCE_STAT[
              characterId
            ] ?? "atk",
          matchedBy:
            "adapter",
          internalEntryKey,
        };
      }
    }
  }

  /*
   * 4. single-rule fallback は月反応7キャラには使わない。
   *    通常ダメージまで月反応化する事故を防ぐ。
   */
  if (
    characterId in
    CHARACTER_DEFAULT_REFERENCE_STAT
  ) {
    /*
     * 月反応7キャラ + サンドローネは
     * character-rule / label / adapter のみで判定する。
     *
     * single-rule fallback を使うと、
     * その天賦内の全ダメージ項目が
     * 専用反応として誤判定される可能性がある。
     */
    return null;
  }

  const sectionEntries =
    getSectionRuleEntries({
      characterId,
      skillIndex,
    });

  if (
    sectionEntries.length ===
    1
  ) {
    return {
      reactionId:
        sectionEntries[0][1],
      referenceStat:
        CHARACTER_DEFAULT_REFERENCE_STAT[
          characterId
        ] ?? "atk",
      matchedBy:
        "single-rule-fallback",
      internalEntryKey:
        sectionEntries[0][0],
    };
  }

  return null;
}
