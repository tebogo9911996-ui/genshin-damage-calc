import {
  getCritMultiplier,
} from "./damage";

import {
  REACTION_DATA,
  getReactionLevelMultiplierFromData,
} from "./reactionData";

/*
 * ==================================================
 * 元素反応の種類
 * ==================================================
 */

export type AmplifyingReaction =
  | "vaporize_pyro"
  | "vaporize_hydro"
  | "melt_pyro"
  | "melt_cryo";

export type TransformativeReaction =
  | "burning"
  | "superconduct"
  | "swirl"
  | "electro_charged"
  | "shatter"
  | "overloaded"
  | "bloom"
  | "hyperbloom"
  | "burgeon";

export type AdditiveReaction =
  | "aggravate"
  | "spread";

/*
 * ==================================================
 * Lvごとの反応基礎値
 * ==================================================
 *
 * 以前は reactions.ts 内に一部Lvだけ直書きしていたが、
 * 今後は reactionData.ts を唯一のデータ元として使う。
 */

export function getReactionLevelMultiplier(
  level: number
) {
  const safeLevel =
    Math.max(
      1,
      Math.min(
        100,
        level
      )
    );

  const exact =
    getReactionLevelMultiplierFromData(
      safeLevel
    );

  if (exact !== null) {
    return exact;
  }

  /*
   * reactionData.ts は基本的にLv1～90を
   * 1刻みで持つ。
   *
   * 91～94 / 96～99など未登録Lvは、
   * 登録済みの前後Lvから線形補間する。
   */
  const table =
    REACTION_DATA
      .characterLevelMultipliers;

  const levels =
    Object.keys(
      table
    )
      .map(Number)
      .sort(
        (a, b) =>
          a - b
      );

  let lower =
    levels[0];

  let upper =
    levels[
      levels.length - 1
    ];

  for (
    let i = 0;
    i <
    levels.length - 1;
    i++
  ) {
    if (
      safeLevel >
        levels[i] &&
      safeLevel <
        levels[i + 1]
    ) {
      lower =
        levels[i];

      upper =
        levels[i + 1];

      break;
    }
  }

  const lowerValue =
    table[
      String(
        lower
      ) as keyof typeof table
    ];

  const upperValue =
    table[
      String(
        upper
      ) as keyof typeof table
    ];

  if (
    lower ===
    upper
  ) {
    return lowerValue;
  }

  const ratio =
    (
      safeLevel -
      lower
    ) /
    (
      upper -
      lower
    );

  return (
    lowerValue +
    (
      upperValue -
      lowerValue
    ) *
      ratio
  );
}

/*
 * ==================================================
 * 熟知補正
 * ==================================================
 */

/*
 * 蒸発・溶解
 *
 * 2.78 × EM / (EM + 1400)
 */
export function getAmplifyingEmBonus(
  elementalMastery: number
) {
  if (
    elementalMastery <= 0
  ) {
    return 0;
  }

  return (
    2.78 *
    elementalMastery /
    (
      elementalMastery +
      1400
    )
  );
}

/*
 * 過負荷・超電導・感電・燃焼
 * 氷砕き・拡散・開花系
 *
 * 16 × EM / (EM + 2000)
 */
export function getTransformativeEmBonus(
  elementalMastery: number
) {
  if (
    elementalMastery <= 0
  ) {
    return 0;
  }

  return (
    16 *
    elementalMastery /
    (
      elementalMastery +
      2000
    )
  );
}

/*
 * 超激化・草激化
 *
 * 5 × EM / (EM + 1200)
 */
export function getAdditiveEmBonus(
  elementalMastery: number
) {
  if (
    elementalMastery <= 0
  ) {
    return 0;
  }

  return (
    5 *
    elementalMastery /
    (
      elementalMastery +
      1200
    )
  );
}

/*
 * 星反応 / 月反応系
 *
 * 現在の星反応コードで使用。
 * 月反応の専用式もこの補正を使う場合は、
 * 後で dedicatedReactions 側から参照する。
 */
export function getStarReactionEmBonus(
  elementalMastery: number
) {
  if (
    elementalMastery <= 0
  ) {
    return 0;
  }

  return (
    6 *
    elementalMastery /
    (
      elementalMastery +
      2000
    )
  );
}

/*
 * ==================================================
 * 蒸発・溶解
 * ==================================================
 */

export function getAmplifyingBaseMultiplier(
  reaction: AmplifyingReaction
) {
  switch (
    reaction
  ) {
    case "vaporize_pyro":
      return REACTION_DATA
        .options
        .vaporize15
        .coefficient;

    case "vaporize_hydro":
      return REACTION_DATA
        .options
        .vaporize20
        .coefficient;

    case "melt_pyro":
      return REACTION_DATA
        .options
        .melt20
        .coefficient;

    case "melt_cryo":
      return REACTION_DATA
        .options
        .melt15
        .coefficient;

    default:
      return 1;
  }
}

export function getAmplifyingReactionMultiplier(
  reactionBaseMultiplier: number,
  elementalMastery: number,
  reactionBonusPercent = 0
) {
  const emBonus =
    getAmplifyingEmBonus(
      elementalMastery
    );

  return (
    reactionBaseMultiplier *
    (
      1 +
      emBonus +
      reactionBonusPercent /
        100
    )
  );
}

export function getAmplifyingMultiplierByReaction({
  reaction,
  elementalMastery,
  reactionBonusPercent = 0,
}: {
  reaction: AmplifyingReaction;
  elementalMastery: number;
  reactionBonusPercent?: number;
}) {
  return getAmplifyingReactionMultiplier(
    getAmplifyingBaseMultiplier(
      reaction
    ),
    elementalMastery,
    reactionBonusPercent
  );
}

export function applyAmplifyingReaction({
  damage,
  reaction,
  elementalMastery,
  reactionBonusPercent = 0,
}: {
  damage: number;
  reaction: AmplifyingReaction;
  elementalMastery: number;
  reactionBonusPercent?: number;
}) {
  const multiplier =
    getAmplifyingMultiplierByReaction({
      reaction,
      elementalMastery,
      reactionBonusPercent,
    });

  return (
    damage *
    multiplier
  );
}

/*
 * ==================================================
 * 劇変反応
 * ==================================================
 */

export function getTransformativeReactionCoefficient(
  reaction: TransformativeReaction
) {
  switch (
    reaction
  ) {
    case "burning":
      return REACTION_DATA
        .options
        .burning
        .coefficient;

    case "superconduct":
      return REACTION_DATA
        .options
        .superconduct
        .coefficient;

    case "swirl":
      return REACTION_DATA
        .options
        .swirl
        .coefficient;

    case "electro_charged":
      return REACTION_DATA
        .options
        .electroCharged
        .coefficient;

    case "shatter":
      return REACTION_DATA
        .options
        .shatter
        .coefficient;

    case "overloaded":
      return REACTION_DATA
        .options
        .overload
        .coefficient;

    case "bloom":
      return REACTION_DATA
        .options
        .bloom
        .coefficient;

    case "hyperbloom":
      return REACTION_DATA
        .options
        .hyperbloom
        .coefficient;

    case "burgeon":
      return REACTION_DATA
        .options
        .burgeon
        .coefficient;

    default:
      return 0;
  }
}

export function calculateTransformativeReactionDamage({
  reaction,
  characterLevel,
  elementalMastery,
  reactionBonusPercent = 0,
  resistanceMultiplier,
  flatDamageBonus = 0,
  reactionCritMultiplier = 1,
}: {
  reaction: TransformativeReaction;
  characterLevel: number;
  elementalMastery: number;
  reactionBonusPercent?: number;
  resistanceMultiplier: number;
  flatDamageBonus?: number;
  reactionCritMultiplier?: number;
}) {
  const levelMultiplier =
    getReactionLevelMultiplier(
      characterLevel
    );

  const reactionCoefficient =
    getTransformativeReactionCoefficient(
      reaction
    );

  const emBonus =
    getTransformativeEmBonus(
      elementalMastery
    );

  const baseDamage =
    levelMultiplier *
    reactionCoefficient *
    (
      1 +
      emBonus +
      reactionBonusPercent /
        100
    );

  return (
    (
      baseDamage +
      flatDamageBonus
    ) *
    reactionCritMultiplier *
    resistanceMultiplier
  );
}

/*
 * ==================================================
 * 超激化・草激化
 * ==================================================
 */

export function getAdditiveReactionCoefficient(
  reaction: AdditiveReaction
) {
  switch (
    reaction
  ) {
    case "aggravate":
      return REACTION_DATA
        .options
        .aggravate
        .coefficient;

    case "spread":
      return REACTION_DATA
        .options
        .spread
        .coefficient;

    default:
      return 0;
  }
}

export function calculateAdditiveReactionBonus({
  reaction,
  characterLevel,
  elementalMastery,
  reactionBonusPercent = 0,
}: {
  reaction: AdditiveReaction;
  characterLevel: number;
  elementalMastery: number;
  reactionBonusPercent?: number;
}) {
  const levelMultiplier =
    getReactionLevelMultiplier(
      characterLevel
    );

  const reactionCoefficient =
    getAdditiveReactionCoefficient(
      reaction
    );

  const emBonus =
    getAdditiveEmBonus(
      elementalMastery
    );

  return (
    levelMultiplier *
    reactionCoefficient *
    (
      1 +
      emBonus +
      reactionBonusPercent /
        100
    )
  );
}

export function calculateAdditiveReactionDamage({
  baseDamage,
  additiveReactionBonus,
  damageBonusPercent,
  critDamagePercent,
  defenseMultiplier,
  resistanceMultiplier,
}: {
  baseDamage: number;
  additiveReactionBonus: number;
  damageBonusPercent: number;
  critDamagePercent: number;
  defenseMultiplier: number;
  resistanceMultiplier: number;
}) {
  return (
    (
      baseDamage +
      additiveReactionBonus
    ) *
    (
      1 +
      damageBonusPercent /
        100
    ) *
    getCritMultiplier(
      critDamagePercent
    ) *
    defenseMultiplier *
    resistanceMultiplier
  );
}

/*
 * ==================================================
 * 星反応
 * ==================================================
 *
 * ここは現行UIとの互換用。
 * 反応種別の判定は reactionEngine.ts が担当する。
 */

export function calculateStarReactionDamage({
  attack,
  multiplier,
  reactionCoefficient,
  baseMultiplier,
  reactionBonus,
  elementalMastery,
  critDamage,
  defenseMultiplier,
  resistanceMultiplier,
}: {
  attack: number;
  multiplier: number;
  reactionCoefficient: number;
  baseMultiplier: number;
  reactionBonus: number;
  elementalMastery: number;
  critDamage: number;
  defenseMultiplier: number;
  resistanceMultiplier: number;
}) {
  const emBonus =
    getStarReactionEmBonus(
      elementalMastery
    );

  return (
    attack *
    multiplier *
    reactionCoefficient *
    baseMultiplier *
    (
      1 +
      reactionBonus +
      emBonus
    ) *
    getCritMultiplier(
      critDamage
    ) *
    defenseMultiplier *
    resistanceMultiplier
  );
}
