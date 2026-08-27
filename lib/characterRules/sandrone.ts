import type {
  CharacterData,
} from "../types";

import type {
  CharacterRuleResult,
} from "./generic";

/*
 * サンドローネ
 *
 * 演算負荷50以上
 * → 強化E
 */
export function isSandroneEnhancedSkill(
  calculationLoad: number
) {
  return calculationLoad >= 50;
}

export function getSandroneEffects({
  character,
  calculationLoad = 0,
  skillIndex = 0,
}: {
  character: CharacterData;
  calculationLoad?: number;
  skillIndex?: number;
}): CharacterRuleResult {
  const notes: string[] = [];

  const enhancedSkill =
    isSandroneEnhancedSkill(
      calculationLoad
    );

  /*
   * Nanokaのskills配列
   *
   * 0 = 通常攻撃
   * 1 = 元素スキル
   * 2 = 元素爆発
   *
   * 元素スキルを選択中か判定
   */
  const isElementalSkill =
    skillIndex === 1;

  /*
   * 強化Eのみ倍率×4
   */
  const talentMultiplierScale =
    enhancedSkill &&
    isElementalSkill
      ? 4
      : 1;

  notes.push(
    `${character.name}専用ルールを使用`
  );

  notes.push(
    `演算負荷：${calculationLoad}`
  );

  if (enhancedSkill) {
    notes.push(
      "元素スキル：強化状態"
    );
  } else {
    notes.push(
      "元素スキル：通常状態"
    );
  }

  if (
    enhancedSkill &&
    isElementalSkill
  ) {
    notes.push(
      "元素スキル倍率：×4"
    );
  }

  return {
    attackPercentBonus: 0,
    damageBonus: 0,
    reactionBonus: 0,
    talentMultiplierScale,
    notes,
  };
}