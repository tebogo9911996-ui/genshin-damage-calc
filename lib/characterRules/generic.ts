import type {
  CharacterData,
} from "../types";

export type CharacterRuleResult = {
  attackPercentBonus: number;
  damageBonus: number;
  reactionBonus: number;

  /*
   * 天賦倍率そのものに掛ける倍率
   *
   * 通常は1
   */
  talentMultiplierScale: number;

  notes: string[];
};

export function getGenericCharacterEffects({
  character,
}: {
  character: CharacterData;
}): CharacterRuleResult {
  return {
    attackPercentBonus: 0,
    damageBonus: 0,
    reactionBonus: 0,

    talentMultiplierScale: 1,

    notes: [
      `${character.name}：登録済みの専用自動効果なし`,
    ],
  };
}