import {
  REACTION_DATA,
} from "./reactionData";

export type ReactionTalentSection =
  | "normalAttack"
  | "skill"
  | "burst";

export type DedicatedReactionId =
  | "lunarCharged"
  | "lunarBloom"
  | "lunarCrystallize"
  | "stellarConduct";

export type DirectReactionMatch = {
  reactionId: DedicatedReactionId;
  optionKey:
    | "lunarCharged"
    | "lunarBloom"
    | "lunarCrystallize"
    | "stellarConduct";
  labelJa: string;
  family: "dedicated";
  dedicatedKind:
    | "directOnly"
    | "indirectLunar";
  standaloneDamage: boolean;
};

/*
 * ==================================================
 * 天賦種別
 * ==================================================
 */

export function getReactionTalentSection(
  skillIndex: number
): ReactionTalentSection | null {
  if (skillIndex === 0) {
    return "normalAttack";
  }

  if (skillIndex === 1) {
    return "skill";
  }

  if (skillIndex === 2) {
    return "burst";
  }

  return null;
}

/*
 * ==================================================
 * 直接反応ルール取得
 * ==================================================
 *
 * characterId
 * + normalAttack / skill / burst
 * + entryKey
 *
 * から、その天賦項目が
 * 月反応 / 星電導扱いかを判定する。
 *
 * ラベル文字列には依存しない。
 */

export function getDirectReactionId({
  characterId,
  section,
  entryKey,
}: {
  characterId: string;
  section: ReactionTalentSection;
  entryKey: string;
}): DedicatedReactionId | null {
  const characterRules =
    REACTION_DATA
      .directReactionEntryRules[
        characterId as keyof typeof REACTION_DATA.directReactionEntryRules
      ];

  if (!characterRules) {
    return null;
  }

  const sectionRules =
    characterRules[
      section as keyof typeof characterRules
    ];

  if (!sectionRules) {
    return null;
  }

  const reactionId =
    sectionRules[
      entryKey as keyof typeof sectionRules
    ];

  if (
    reactionId ===
      "lunarCharged" ||
    reactionId ===
      "lunarBloom" ||
    reactionId ===
      "lunarCrystallize" ||
    reactionId ===
      "stellarConduct"
  ) {
    return reactionId;
  }

  return null;
}

/*
 * ==================================================
 * option情報へ変換
 * ==================================================
 */

export function getDirectReactionMatch({
  characterId,
  skillIndex,
  entryKey,
}: {
  characterId: string;
  skillIndex: number;
  entryKey: string;
}): DirectReactionMatch | null {
  const section =
    getReactionTalentSection(
      skillIndex
    );

  if (!section) {
    return null;
  }

  const reactionId =
    getDirectReactionId({
      characterId,
      section,
      entryKey,
    });

  if (!reactionId) {
    return null;
  }

  const option =
    REACTION_DATA.options[
      reactionId
    ];

  if (
    option.family !==
    "dedicated"
  ) {
    return null;
  }

  return {
    reactionId,
    optionKey:
      reactionId,
    labelJa:
      option.labelJa,
    family:
      "dedicated",
    dedicatedKind:
      option.dedicatedKind,
    standaloneDamage:
      option.standaloneDamage,
  };
}

/*
 * ==================================================
 * 専用反応係数
 * ==================================================
 */

export function getDedicatedDirectCoefficient(
  reactionId: DedicatedReactionId
) {
  const option =
    REACTION_DATA.options[
      reactionId
    ];

  if (
    "directCoefficient" in
      option &&
    typeof option
      .directCoefficient ===
      "number"
  ) {
    return option
      .directCoefficient;
  }

  return null;
}

export function getDedicatedIndirectCoefficient(
  reactionId: DedicatedReactionId
) {
  const option =
    REACTION_DATA.options[
      reactionId
    ];

  if (
    "coefficient" in
      option &&
    typeof option
      .coefficient ===
      "number"
  ) {
    return option
      .coefficient;
  }

  return null;
}

/*
 * 星電導の直接係数
 *
 * base + perStack × stacks
 */
export function getStellarConductDirectCoefficient(
  fieldStacks: number
) {
  const option =
    REACTION_DATA.options
      .stellarConduct;

  const safeStacks =
    Math.max(
      0,
      Math.min(
        option.maxFieldStacks,
        fieldStacks
      )
    );

  return (
    option.directCoefficientBase +
    option.directCoefficientPerStack *
      safeStacks
  );
}

/*
 * 月感電 / 月結晶の参加者寄与率
 */
export function getLunarContributionWeights(
  reactionId:
    | "lunarCharged"
    | "lunarCrystallize"
) {
  const option =
    REACTION_DATA.options[
      reactionId
    ];

  return [
    ...option
      .contributionWeights,
  ];
}
