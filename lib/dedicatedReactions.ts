import {
  getCritMultiplier,
  getResistanceMultiplier,
} from "./damage";

import {
  getReactionLevelMultiplier,
  getStarReactionEmBonus,
} from "./reactions";

import {
  REACTION_DATA,
} from "./reactionData";

export type LunarParticipant = {
  characterLevel: number;
  elementalMastery: number;
  critDamagePercent: number;
};

export type LunarStandaloneReaction =
  | "lunarCharged"
  | "lunarCrystallize";

export type LunarDirectReaction =
  | "lunarCharged"
  | "lunarBloom"
  | "lunarCrystallize";

export function calculateLunarParticipantContribution({
  reaction,
  participant,
  weight,
  lunarReactionBonusPercent = 0,
}: {
  reaction: LunarStandaloneReaction;
  participant: LunarParticipant;
  weight: number;
  lunarReactionBonusPercent?: number;
}) {
  const option =
    REACTION_DATA.options[
      reaction
    ];

  const levelMultiplier =
    getReactionLevelMultiplier(
      participant.characterLevel
    );

  const emBonus =
    getStarReactionEmBonus(
      participant.elementalMastery
    );

  const critMultiplier =
    getCritMultiplier(
      participant.critDamagePercent
    );

  return (
    levelMultiplier *
    option.coefficient *
    (
      1 +
      emBonus +
      lunarReactionBonusPercent /
        100
    ) *
    critMultiplier *
    weight
  );
}

export function calculateLunarStandaloneDamage({
  reaction,
  participants,
  lunarReactionBonusPercent = 0,
  enemyResistancePercent = 10,
  resistanceShredPercent = 0,
}: {
  reaction: LunarStandaloneReaction;
  participants: LunarParticipant[];
  lunarReactionBonusPercent?: number;
  enemyResistancePercent?: number;
  resistanceShredPercent?: number;
}) {
  const option =
    REACTION_DATA.options[
      reaction
    ];

  const weights =
    option.contributionWeights;

  const subtotal =
    participants
      .slice(
        0,
        weights.length
      )
      .reduce(
        (
          total,
          participant,
          index
        ) => {
          return (
            total +
            calculateLunarParticipantContribution({
              reaction,
              participant,
              weight:
                weights[
                  index
                ] ?? 0,
              lunarReactionBonusPercent,
            })
          );
        },
        0
      );

  const resistanceMultiplier =
    getResistanceMultiplier(
      enemyResistancePercent,
      resistanceShredPercent
    );

  return (
    subtotal *
    resistanceMultiplier
  );
}

/*
 * 月反応扱いの「天賦ダメージ」専用式。
 *
 * referenceValue はキャラごとに異なる。
 * - イネファ / フリンズ: 攻撃力
 * - ネフェル / ラウマ: 元素熟知
 * - コロンビーナ: HP上限
 * - シハク / リンネア: 防御力
 *
 * 通常の元素ダメージバフ、
 * 与えるダメージ、
 * 通常/重撃/スキル/爆発ダメージ、
 * 防御補正は使わない。
 */
export function calculateLunarDirectDamage({
  reaction,
  referenceValue,
  multiplier,
  elementalMastery,
  lunarReactionBonusPercent = 0,
  critDamagePercent,
  resistanceMultiplier,
}: {
  reaction: LunarDirectReaction;
  referenceValue: number;
  multiplier: number;
  elementalMastery: number;
  lunarReactionBonusPercent?: number;
  critDamagePercent: number;
  resistanceMultiplier: number;
}) {
  const option =
    REACTION_DATA.options[
      reaction
    ];

  const directCoefficient =
    option.directCoefficient;

  const emBonus =
    getStarReactionEmBonus(
      elementalMastery
    );

  return (
    referenceValue *
    multiplier *
    directCoefficient *
    (
      1 +
      emBonus +
      lunarReactionBonusPercent /
        100
    ) *
    getCritMultiplier(
      critDamagePercent
    ) *
    resistanceMultiplier
  );
}
