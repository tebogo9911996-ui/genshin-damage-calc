import type {
  WeaponData,
} from "../types";

import type {
  WeaponRuleResult,
} from "./generic";

export function getTranscendenceKeyEffects({
  weapon,
  refinement,
  stacks,
}: {
  weapon: WeaponData;
  refinement: number;
  stacks: number;
}): WeaponRuleResult {
  const refinementData =
    weapon.refinement?.[
      String(refinement)
    ];

  if (!refinementData) {
    return {
      attackPercentBonus: 0,
      damageBonus: 0,
      reactionBonus: 0,
      notes: [],
    };
  }

  const attackPercentBonus =
    (
      refinementData
        .param_list?.[0] ??
      0
    ) * 100;

  const reactionBonusPerStack =
    refinementData
      .param_list?.[1] ??
    0;

  const safeStacks =
    Math.min(
      3,
      Math.max(
        0,
        stacks
      )
    );

  const reactionBonus =
    reactionBonusPerStack *
    safeStacks;

  return {
    attackPercentBonus,
    damageBonus: 0,
    reactionBonus,

    notes: [
      `超越の鍵：攻撃力+${attackPercentBonus.toFixed(
        1
      )}%`,
      `超越：${safeStacks}層`,
      `星反応ダメージ+${(
        reactionBonus *
        100
      ).toFixed(1)}%`,
    ],
  };
}