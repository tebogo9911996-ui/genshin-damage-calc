import type {
  CharacterData,
  WeaponData,
} from "./types";

import {
  getGenericCharacterEffects,
} from "./characterRules/generic";

import {
  getSandroneEffects,
} from "./characterRules/sandrone";

import {
  getGenericWeaponEffects,
} from "./weaponRules/generic";

import {
  getTranscendenceKeyEffects,
} from "./weaponRules/transcendenceKey";

export type SpecialEffectResult = {
  attackPercentBonus: number;
  damageBonus: number;
  reactionBonus: number;

  /*
   * 天賦倍率そのものへの補正
   */
  talentMultiplierScale: number;

  notes: string[];
};

function getCharacterEffects({
  characterId,
  character,
  calculationLoad,
  skillIndex,
}: {
  characterId: string;
  character: CharacterData;
  calculationLoad: number;
  skillIndex: number;
}) {
  switch (characterId) {
    /*
     * サンドローネ
     */
    case "10000133":
      return getSandroneEffects({
        character,
        calculationLoad,
        skillIndex,
      });

    /*
     * その他
     */
    default:
      return getGenericCharacterEffects({
        character,
      });
  }
}

function getWeaponEffects({
  weaponId,
  weapon,
  refinement,
  specialStacks,
}: {
  weaponId: string;
  weapon: WeaponData;
  refinement: number;
  specialStacks: number;
}) {
  switch (weaponId) {
    /*
     * 超越の鍵
     */
    case "12516":
      return getTranscendenceKeyEffects({
        weapon,
        refinement,
        stacks: specialStacks,
      });

    /*
     * その他
     */
    default:
      return getGenericWeaponEffects({
        weapon,
      });
  }
}

export function getSpecialEffects({
  characterId,
  weaponId,
  character,
  weapon,
  refinement,
  specialStacks,
  calculationLoad = 0,
  skillIndex = 0,
}: {
  characterId: string;
  weaponId: string;

  character: CharacterData;
  weapon: WeaponData;

  refinement: number;
  specialStacks: number;

  calculationLoad?: number;
  skillIndex?: number;
}): SpecialEffectResult {
  /*
   * キャラ
   */
  const characterEffects =
    getCharacterEffects({
      characterId,
      character,
      calculationLoad,
      skillIndex,
    });

  /*
   * 武器
   */
  const weaponEffects =
    getWeaponEffects({
      weaponId,
      weapon,
      refinement,
      specialStacks,
    });

  return {
    /*
     * 攻撃力%
     */
    attackPercentBonus:
      characterEffects
        .attackPercentBonus +
      weaponEffects
        .attackPercentBonus,

    /*
     * ダメージバフ
     */
    damageBonus:
      characterEffects
        .damageBonus +
      weaponEffects
        .damageBonus,

    /*
     * 反応ダメージバフ
     */
    reactionBonus:
      characterEffects
        .reactionBonus +
      weaponEffects
        .reactionBonus,

    /*
     * 天賦倍率補正
     *
     * 現時点では
     * キャラ側のみ
     */
    talentMultiplierScale:
      characterEffects
        .talentMultiplierScale,

    /*
     * 表示用
     */
    notes: [
      ...characterEffects.notes,
      ...weaponEffects.notes,
    ],
  };
}