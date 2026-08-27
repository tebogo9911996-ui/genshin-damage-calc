import {
  getCritMultiplier,
} from "./damage";

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
 *
 * 現在よく使うLvを正式値で登録。
 * それ以外のLvは後でNanoka/GameDataから
 * 完全なLv1～100表を入れられる構造。
 * ==================================================
 */

const REACTION_LEVEL_MULTIPLIER:
Record<number, number> = {
  1: 17.165605,
  10: 34.143343,
  20: 80.584775,
  30: 136.29291,
  40: 207.382042,
  50: 323.601597,
  60: 492.88489,
  70: 765.640231,
  80: 1077.443668,
  90: 1446.853458,
  95: 1561.47,
  100: 1674.81,
};

/*
 * 登録Lv以外の場合は
 * 前後の登録値から線形補間。
 *
 * 後で完全なLvテーブルへ差し替え可能。
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
    REACTION_LEVEL_MULTIPLIER[
      safeLevel
    ];

  if (exact !== undefined) {
    return exact;
  }

  const levels =
    Object.keys(
      REACTION_LEVEL_MULTIPLIER
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
    REACTION_LEVEL_MULTIPLIER[
      lower
    ];

  const upperValue =
    REACTION_LEVEL_MULTIPLIER[
      upper
    ];

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
 * 現在の星反応コードで使用
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

/*
 * 基礎倍率
 *
 * 炎 → 水   蒸発 = 1.5
 * 水 → 炎   蒸発 = 2.0
 *
 * 炎 → 氷   溶解 = 2.0
 * 氷 → 炎   溶解 = 1.5
 */
export function getAmplifyingBaseMultiplier(
  reaction: AmplifyingReaction
) {
  switch (
    reaction
  ) {
    case "vaporize_pyro":
      return 1.5;

    case "vaporize_hydro":
      return 2.0;

    case "melt_pyro":
      return 2.0;

    case "melt_cryo":
      return 1.5;

    default:
      return 1;
  }
}

/*
 * 最終蒸発・溶解倍率
 *
 * 基礎倍率
 * ×
 * (1 + 熟知補正 + 反応バフ)
 */
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

/*
 * 通常ダメージへ
 * 蒸発・溶解を掛けるだけ
 */
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
      return 0.25;

    case "superconduct":
      return 1.5;

    case "swirl":
      return 0.6;

    case "electro_charged":
      return 2.0;

    case "shatter":
      return 3.0;

    case "overloaded":
      return 2.75;

    case "bloom":
      return 2.0;

    case "hyperbloom":
      return 3.0;

    case "burgeon":
      return 3.0;

    default:
      return 0;
  }
}

/*
 * 劇変反応ダメージ
 *
 * Lv基礎値
 * × 反応係数
 * × (1 + 熟知補正 + 反応バフ)
 * × 耐性補正
 *
 * 防御補正なし
 * 通常ダメバフなし
 * 原則会心なし
 */
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
      return 1.15;

    case "spread":
      return 1.25;

    default:
      return 0;
  }
}

/*
 * 激化による「実数ダメージ加算値」
 *
 * この値自体が最終ダメージではない。
 *
 * 元攻撃の基礎ダメージに加算してから
 * ダメバフ・会心・防御・耐性を掛ける。
 */
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

/*
 * 激化込み最終ダメージ
 *
 * baseDamage
 * =
 * 攻撃力×天賦倍率など
 */
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