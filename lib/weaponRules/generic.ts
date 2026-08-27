import type {
  WeaponData,
} from "../types";

export type WeaponRuleResult = {
  attackPercentBonus: number;
  damageBonus: number;
  reactionBonus: number;
  notes: string[];
};

export function getGenericWeaponEffects({
  weapon,
}: {
  weapon: WeaponData;
}): WeaponRuleResult {
  return {
    attackPercentBonus: 0,
    damageBonus: 0,
    reactionBonus: 0,
    notes: [
      `${weapon.name}：登録済みの専用自動効果なし`,
    ],
  };
}