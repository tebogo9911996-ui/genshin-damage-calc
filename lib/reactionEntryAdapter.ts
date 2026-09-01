import type {
  TalentEntry,
} from "./talents";

import type {
  ReactionTalentSection,
} from "./reactionEngine";

/*
 * ==================================================
 * Nanoka天賦キー → 反応ルール内部キー変換
 * ==================================================
 *
 * reactionData.ts の directReactionEntryRules は、
 * charged_damage_3 / damage_3 / damage_6 のような
 * 内部キーで定義されている。
 *
 * 一方、Nanokaの日本語レスポンスから安定して取得できるのは
 * param6 / param2 / param3 のような param 番号。
 *
 * ここで両者を接続する。
 *
 * 将来キャラを追加するときは、この表に
 * 「characterId → section → paramX → internalKey」
 * を足すだけでよい。
 */

type SectionEntryMap =
  Partial<
    Record<
      ReactionTalentSection,
      Record<string, string>
    >
  >;

type CharacterEntryAdapterMap =
  Record<
    string,
    SectionEntryMap
  >;

export const REACTION_ENTRY_ADAPTERS:
  CharacterEntryAdapterMap = {
  /*
   * サンドローネ
   *
   * Nanoka:
   * 通常:
   *   param6 = 重撃冷却ビーム星電導ダメージ
   *
   * スキル:
   *   param2 = プリズム弾星電導ダメージ
   *
   * 爆発:
   *   param3 = エネルギー光線星電導ダメージ
   *
   * reactionData.ts:
   *   charged_damage_3 / damage_3 / damage_6
   */
  "10000133": {
    normalAttack: {
      param6:
        "charged_damage_3",
    },

    skill: {
      param2:
        "damage_3",
    },

    burst: {
      param3:
        "damage_6",
    },
  },
};

/*
 * Nanokaの sourceKey から
 * reactionData.ts 側の内部キーを取得する。
 */
export function getReactionInternalEntryKey({
  characterId,
  section,
  sourceKey,
}: {
  characterId: string;
  section: ReactionTalentSection;
  sourceKey: string | null;
}): string | null {
  if (!sourceKey) {
    return null;
  }

  const characterMap =
    REACTION_ENTRY_ADAPTERS[
      characterId
    ];

  if (!characterMap) {
    return null;
  }

  const sectionMap =
    characterMap[
      section
    ];

  if (!sectionMap) {
    return null;
  }

  return (
    sectionMap[
      sourceKey
    ] ??
    null
  );
}

/*
 * TalentEntry をそのまま渡して
 * 内部キーを取得できる便利関数。
 */
export function getReactionInternalEntryKeyFromTalent({
  characterId,
  section,
  entry,
}: {
  characterId: string;
  section: ReactionTalentSection;
  entry: TalentEntry;
}): string | null {
  return getReactionInternalEntryKey({
    characterId,
    section,
    sourceKey:
      entry.sourceKey,
  });
}
