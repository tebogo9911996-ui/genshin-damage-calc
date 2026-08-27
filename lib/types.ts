export type PromoteData = {
  level: number;
  icon?: string;
  desc: string[];
  param: number[];
};

export type SkillData = {
  id: number;
  name: string;
  desc: string;
  promote: Record<string, PromoteData>;
};

export type PassiveData = {
  id: number;
  name: string;
  desc: string;
  icon?: string;
  unlock: number;
  param_list: number[];
};

export type ConstellationData = {
  id: number;
  name: string;
  desc: string;
  icon?: string;
  param_list: number[];
};

export type AttackData = {
  name: string;

  icd?: {
    tag: string | null;
    group: string;
  };

  gauge: number | null;

  poise?: {
    level: string;
    value: number;
  };

  element: string;
  attack_type: string;
  strike_type: string;

  damage_param: string | number | null;
};

export type EnergyData = {
  name: string;
  skill: string;
  kind: string;
  element: string;
  per_drop: number;
  lifetime: number;
  chance: number;
  cd: number;
  applications: number;
  drop_id: number;
};

export type CharacterAscensionData = {
  fight_prop_base_hp?: number;
  fight_prop_base_defense?: number;
  fight_prop_base_attack?: number;

  fight_prop_critical?: number;
  fight_prop_critical_hurt?: number;
  fight_prop_attack_percent?: number;
  fight_prop_element_mastery?: number;
  fight_prop_charge_efficiency?: number;

  [key: string]: number | undefined;
};

export type CharacterData = {
  name: string;

  weapon: string;
  rarity: string;
  element: string;

  base_hp: number;
  base_atk: number;
  base_def: number;

  crit_rate: number;
  crit_dmg: number;
  elemental_mastery: number;

  stats_modifier: {
    hp: Record<string, number>;
    atk: Record<string, number>;
    def: Record<string, number>;

    ascension: CharacterAscensionData[];

    [key: string]: unknown;
  };

  skills: SkillData[];
  passives: PassiveData[];
  constellations: ConstellationData[];

  attack?: AttackData[];
  energy?: EnergyData[];

  [key: string]: unknown;
};

export type WeaponAscensionData = {
  fight_prop_base_attack?: number;

  [key: string]: number | undefined;
};

export type WeaponStatData = {
  base: number;
  levels: Record<string, number>;
};

export type WeaponRefinementData = {
  name: string;
  desc: string;
  param_list: number[];
};

export type WeaponData = {
  name: string;

  weapon_type?: string;
  rarity?: number;

  stats_modifier: {
    atk: WeaponStatData;

    fight_prop_critical?: WeaponStatData;
    fight_prop_critical_hurt?: WeaponStatData;
    fight_prop_attack_percent?: WeaponStatData;
    fight_prop_element_mastery?: WeaponStatData;
    fight_prop_charge_efficiency?: WeaponStatData;

    [key: string]: WeaponStatData | undefined;
  };

  ascension: Record<string, WeaponAscensionData>;
  refinement: Record<string, WeaponRefinementData>;

  [key: string]: unknown;
};

/*
 * 一覧表示用
 */

export type CharacterListEntry = {
  id: string;
  name: string;
  element: string;
  weapon: string;
  rank: string;
  icon?: string;
};

export type WeaponListEntry = {
  id: string;
  name: string;
  weaponType?: string;
  rank?: string | number;
  icon?: string;
};