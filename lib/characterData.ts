import type {
  CharacterData,
  CharacterListEntry,
  WeaponData,
  WeaponListEntry,
} from "./types";

const DATA_VERSION = "7.0.52";

const NANOKA_BASE =
  `https://static.nanoka.cc/gi/${DATA_VERSION}`;

const NANOKA_JA_BASE =
  `https://static.nanoka.cc/gi/${DATA_VERSION}/ja`;

/*
 * キャラクター詳細
 */
export async function fetchCharacterData(
  characterId: string | number
): Promise<CharacterData> {
  const response = await fetch(
    `${NANOKA_JA_BASE}/character/${characterId}.json`
  );

  if (!response.ok) {
    throw new Error(
      `キャラクターデータ取得失敗: ${characterId}`
    );
  }

  return response.json();
}

/*
 * 武器詳細
 */
export async function fetchWeaponData(
  weaponId: string | number
): Promise<WeaponData> {
  const response = await fetch(
    `${NANOKA_JA_BASE}/weapon/${weaponId}.json`
  );

  if (!response.ok) {
    throw new Error(
      `武器データ取得失敗: ${weaponId}`
    );
  }

  return response.json();
}

/*
 * 全キャラ一覧
 */
export async function fetchCharacterList():
Promise<CharacterListEntry[]> {
  const response = await fetch(
    `${NANOKA_BASE}/character.json`
  );

  if (!response.ok) {
    throw new Error(
      "キャラクター一覧を取得できませんでした"
    );
  }

  const data: Record<
    string,
    {
      ja?: string;
      en?: string;
      element?: string;
      weapon?: string;
      rank?: string;
      icon?: string;
      release?: string;
    }
  > = await response.json();

  return Object.entries(data)
    .map(([id, item]) => ({
      id,
      name:
        item.ja ??
        item.en ??
        id,
      element:
        item.element ?? "",
      weapon:
        item.weapon ?? "",
      rank:
        item.rank ?? "",
      icon:
        item.icon,
    }))
    .sort((a, b) =>
      a.name.localeCompare(
        b.name,
        "ja"
      )
    );
}

/*
 * 全武器一覧
 */
export async function fetchWeaponList():
Promise<WeaponListEntry[]> {
  const response = await fetch(
    `${NANOKA_BASE}/weapon.json`
  );

  if (!response.ok) {
    throw new Error(
      "武器一覧を取得できませんでした"
    );
  }

  const data: Record<
    string,
    {
      ja?: string;
      en?: string;
      name?: string;
      weapon?: string;
      weapon_type?: string;
      type?: string;
      rank?: string | number;
      rarity?: string | number;
      icon?: string;
    }
  > = await response.json();

  return Object.entries(data)
    .map(([id, item]) => ({
      id,

      name:
        item.ja ??
        item.name ??
        item.en ??
        id,

      weaponType:
        item.weapon_type ??
        item.weapon ??
        item.type,

      rank:
        item.rank ??
        item.rarity,

      icon:
        item.icon,
    }))
    .sort((a, b) =>
      a.name.localeCompare(
        b.name,
        "ja"
      )
    );
}

/*
 * キャラ突破段階
 */
export function getCharacterAscensionIndex(
  level: number
) {
  if (level >= 80) return 5;
  if (level >= 70) return 4;
  if (level >= 60) return 3;
  if (level >= 50) return 2;
  if (level >= 40) return 1;

  return 0;
}

/*
 * 武器突破段階
 */
export function getWeaponAscensionIndex(
  level: number
) {
  if (level >= 80) return 6;
  if (level >= 70) return 5;
  if (level >= 60) return 4;
  if (level >= 50) return 3;
  if (level >= 40) return 2;
  if (level >= 20) return 1;

  return 0;
}

/*
 * キャラ基礎攻撃力
 */
export function getCharacterBaseAtk(
  character: CharacterData,
  level: number
) {
  const levelMultiplier =
    character.stats_modifier.atk[
      String(level)
    ];

  const ascensionIndex =
    getCharacterAscensionIndex(
      level
    );

  const ascensionAtk =
    character.stats_modifier
      .ascension[
        ascensionIndex
      ]?.fight_prop_base_attack ??
    0;

  return (
    character.base_atk *
      levelMultiplier +
    ascensionAtk
  );
}

/*
 * 武器基礎攻撃力
 */
export function getWeaponBaseAtk(
  weapon: WeaponData,
  level: number
) {
  const levelMultiplier =
    weapon.stats_modifier.atk
      .levels[
        String(level)
      ];

  const ascensionIndex =
    getWeaponAscensionIndex(
      level
    );

  const ascensionAtk =
    weapon.ascension[
      String(
        ascensionIndex
      )
    ]?.fight_prop_base_attack ??
    0;

  return (
    weapon.stats_modifier.atk
      .base *
      levelMultiplier +
    ascensionAtk
  );
}

/*
 * 武器サブステータス
 */
export function getWeaponStat(
  weapon: WeaponData,
  statName: string,
  level: number
) {
  const stat =
    weapon.stats_modifier[
      statName
    ];

  if (!stat) {
    return 0;
  }

  const levelValue =
    stat.levels[
      String(level)
    ];

  if (
    levelValue === undefined
  ) {
    return 0;
  }

  return (
    stat.base *
    levelValue
  );
}

/*
 * 天賦Lvデータ
 */
export function getTalentLevelData(
  character: CharacterData,
  skillIndex: number,
  talentLevel: number
) {
  const skill =
    character.skills[
      skillIndex
    ];

  if (!skill) {
    return null;
  }

  return (
    skill.promote[
      String(
        talentLevel - 1
      )
    ] ?? null
  );
}

/*
 * 天賦param取得
 */
export function getTalentParam(
  character: CharacterData,
  skillIndex: number,
  talentLevel: number,
  paramIndex: number
) {
  const data =
    getTalentLevelData(
      character,
      skillIndex,
      talentLevel
    );

  if (!data) {
    return 0;
  }

  return (
    data.param[
      paramIndex
    ] ?? 0
  );
}