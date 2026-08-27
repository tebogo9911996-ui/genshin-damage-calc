"use client";

import {
  evaluateBuffByName,
} from "@/lib/buffEngine";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import type {
  CharacterData,
  CharacterListEntry,
  WeaponData,
  WeaponListEntry,
} from "@/lib/types";

import {
  fetchCharacterData,
  fetchCharacterList,
  fetchWeaponData,
  fetchWeaponList,
  getCharacterAscensionIndex,
  getCharacterBaseAtk,
  getWeaponBaseAtk,
  getWeaponStat,
} from "@/lib/characterData";

import {
  calculateDirectDamage,
  getDefenseMultiplier,
  getFinalAttack,
  getResistanceMultiplier,
} from "@/lib/damage";

import {
  calculateStarReactionDamage,
  calculateTransformativeReactionDamage,
  getAmplifyingMultiplierByReaction,
} from "@/lib/reactions";

import {
  getTalentEntries,
} from "@/lib/talents";

import {
  getSpecialEffects,
} from "@/lib/specialRules";

import {
  ARTIFACT_SETS,
  getArtifactEffects,
  getArtifactSetById,
} from "@/lib/artifacts";

/* =========================
 * Nanoka画像
 * ========================= */

const ASSET_BASE =
  "https://static.nanoka.cc/assets/gi";

function getAssetUrl(
  icon?: string
) {
  if (!icon) {
    return "";
  }

  return `${ASSET_BASE}/${icon}.webp`;
}

/* =========================
 * 元素
 * ========================= */

function getElementName(
  element: string
) {
  const names: Record<
    string,
    string
  > = {
    Pyro: "炎",
    Hydro: "水",
    Electro: "雷",
    Cryo: "氷",
    Anemo: "風",
    Geo: "岩",
    Dendro: "草",
  };

  return (
    names[element] ??
    element
  );
}

function getElementDamageKey(
  element: string
) {
  const keys: Record<
    string,
    string
  > = {
    Pyro:
      "fight_prop_fire_add_hurt",

    Hydro:
      "fight_prop_water_add_hurt",

    Electro:
      "fight_prop_electric_add_hurt",

    Cryo:
      "fight_prop_ice_add_hurt",

    Anemo:
      "fight_prop_wind_add_hurt",

    Geo:
      "fight_prop_rock_add_hurt",

    Dendro:
      "fight_prop_grass_add_hurt",
  };

  return keys[element] ?? "";
}

function getArtifactElementDamageBonus(
  element: string,
  effects: ReturnType<
    typeof getArtifactEffects
  >
) {
  switch (element) {
    case "Pyro":
      return effects.pyroDamageBonus;

    case "Hydro":
      return effects.hydroDamageBonus;

    case "Electro":
      return effects.electroDamageBonus;

    case "Cryo":
      return effects.cryoDamageBonus;

    case "Anemo":
      return effects.anemoDamageBonus;

    case "Geo":
      return effects.geoDamageBonus;

    case "Dendro":
      return effects.dendroDamageBonus;

    default:
      return 0;
  }
}


const BUFF_ENGINE_ARTIFACT_IDS =
  new Set([
    15046, // 影に沈む幻
    15031, // ファントムハンター
    15032, // 黄金の劇団
    15038, // 黒曜の秘典
    15017, // 千岩牢固
    15007, // 旧貴族のしつけ
  ]);

function isBuffEngineArtifact(
  artifactId: number | null
) {
  return (
    artifactId !== null &&
    BUFF_ENGINE_ARTIFACT_IDS.has(
      artifactId
    )
  );
}

/* =========================
 * レアリティ
 * ========================= */

function getStars(
  rank?: string | number
) {
  if (
    typeof rank === "number"
  ) {
    return Math.max(
      1,
      Math.min(
        5,
        rank
      )
    );
  }

  if (!rank) {
    return 0;
  }

  if (
    rank.includes(
      "ORANGE"
    )
  ) {
    return 5;
  }

  if (
    rank.includes(
      "PURPLE"
    )
  ) {
    return 4;
  }

  if (
    rank.includes(
      "BLUE"
    )
  ) {
    return 3;
  }

  if (
    rank.includes(
      "GREEN"
    )
  ) {
    return 2;
  }

  const number =
    Number(rank);

  if (
    Number.isFinite(
      number
    )
  ) {
    return number;
  }

  return 0;
}

function StarDisplay({
  rank,
}: {
  rank?: string | number;
}) {
  const stars =
    getStars(rank);

  if (!stars) {
    return null;
  }

  return (
    <div className="text-xs text-yellow-400">
      {"★".repeat(stars)}
    </div>
  );
}

/* =========================
 * HP / DEF
 * ========================= */

function getCharacterBaseHp(
  character: CharacterData,
  level: number
) {
  const levelMultiplier =
    character
      .stats_modifier
      .hp[String(level)];

  const index =
    getCharacterAscensionIndex(
      level
    );

  const ascension =
    character
      .stats_modifier
      .ascension[index];

  return (
    character.base_hp *
      levelMultiplier +
    (
      ascension
        ?.fight_prop_base_hp ??
      0
    )
  );
}

function getCharacterBaseDef(
  character: CharacterData,
  level: number
) {
  const levelMultiplier =
    character
      .stats_modifier
      .def[String(level)];

  const index =
    getCharacterAscensionIndex(
      level
    );

  const ascension =
    character
      .stats_modifier
      .ascension[index];

  return (
    character.base_def *
      levelMultiplier +
    (
      ascension
        ?.fight_prop_base_defense ??
      0
    )
  );
}

/* =========================
 * ダメージ表
 * ========================= */

type DamageRowData = {
  id: string;
  label: string;
  expected: number;
  crit: number;
  nonCrit: number;
  reaction?: boolean;
  baselineExpected?: number;
  baselineCrit?: number;
  baselineNonCrit?: number;
};

type DamageGroup = {
  id: string;
  name: string;
  rows: DamageRowData[];
};

type ReactionSelection =
  | "none"
  | "vaporize"
  | "melt"
  | "overloaded"
  | "electro_charged"
  | "superconduct"
  | "burning"
  | "bloom"
  | "hyperbloom"
  | "burgeon"
  | "swirl";

type ReactionButtonData = {
  id: ReactionSelection;
  label: string;
  kind:
    | "none"
    | "amplifying"
    | "transformative";
  displayValue?: string;
};

/* =========================
 * Main
 * ========================= */

export default function Home() {
  /* 一覧 */

  const [
    characterList,
    setCharacterList,
  ] = useState<
    CharacterListEntry[]
  >([]);

  const [
    weaponList,
    setWeaponList,
  ] = useState<
    WeaponListEntry[]
  >([]);

  /* 選択 */

  const [
    characterId,
    setCharacterId,
  ] = useState(
    "10000133"
  );

  const [
    weaponId,
    setWeaponId,
  ] = useState(
    "12516"
  );

  const [
    character,
    setCharacter,
  ] =
    useState<CharacterData | null>(
      null
    );

  const [
    weapon,
    setWeapon,
  ] =
    useState<WeaponData | null>(
      null
    );

  /* 選択画面 */

  const [
    characterPickerOpen,
    setCharacterPickerOpen,
  ] = useState(false);

  const [
    weaponPickerOpen,
    setWeaponPickerOpen,
  ] = useState(false);

  const [
    characterSearch,
    setCharacterSearch,
  ] = useState("");

  const [
    weaponSearch,
    setWeaponSearch,
  ] = useState("");

  /* 聖遺物 */

  const [
    artifactId,
    setArtifactId,
  ] = useState<number | null>(
    null
  );

  const [
    artifactPickerOpen,
    setArtifactPickerOpen,
  ] = useState(false);

  const [
    artifactSearch,
    setArtifactSearch,
  ] = useState("");

  const [
    artifactFourPieceEnabled,
    setArtifactFourPieceEnabled,
  ] = useState(true);

  const [
    artifactTargetAffected,
    setArtifactTargetAffected,
  ] = useState(false);

  const [
    artifactNightsoulBlessing,
    setArtifactNightsoulBlessing,
  ] = useState(false);

  const [
    artifactObsidianCritActive,
    setArtifactObsidianCritActive,
  ] = useState(false);

  const [
    artifactMarechausseeStacks,
    setArtifactMarechausseeStacks,
  ] = useState(0);

  const [
    artifactGoldenTroupeOffField,
    setArtifactGoldenTroupeOffField,
  ] = useState(false);

  const [
    artifactMillelithBuffActive,
    setArtifactMillelithBuffActive,
  ] = useState(false);

  const [
    artifactNoblesseBuffActive,
    setArtifactNoblesseBuffActive,
  ] = useState(false);

  /* 比較基準 */

  const [
    baselineDamageGroups,
    setBaselineDamageGroups,
  ] = useState<DamageGroup[] | null>(
    null
  );

  /* 状態 */

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  /* レベル */

  const [
    charLevel,
    setCharLevel,
  ] = useState(90);

  const [
    weaponLevel,
    setWeaponLevel,
  ] = useState(90);

  const [
    refinement,
    setRefinement,
  ] = useState(1);

  /* 天賦 */

  const [
    normalTalentLevel,
    setNormalTalentLevel,
  ] = useState(10);

  const [
    skillTalentLevel,
    setSkillTalentLevel,
  ] = useState(10);

  const [
    burstTalentLevel,
    setBurstTalentLevel,
  ] = useState(10);

  /* キャラ効果 */

  const [
    enhancedSkillEnabled,
    setEnhancedSkillEnabled,
  ] = useState(false);

  /* 武器効果 */

  const [
    specialStacks,
    setSpecialStacks,
  ] = useState(0);

  /* 通常元素反応 */

  const [
    selectedReaction,
    setSelectedReaction,
  ] = useState<ReactionSelection>(
    "none"
  );

  /* 星反応 */

  const [
    useStarReaction,
    setUseStarReaction,
  ] = useState(false);

  const [
    starReactionCoefficient,
    setStarReactionCoefficient,
  ] = useState(1.8);

  const [
    starBaseMultiplier,
    setStarBaseMultiplier,
  ] = useState(1.14);

  /* 敵 */

  const [
    enemyLevel,
    setEnemyLevel,
  ] = useState(90);

  const [
    enemyResistance,
    setEnemyResistance,
  ] = useState(10);

  const [
    resistanceShred,
    setResistanceShred,
  ] = useState(0);

  const [
    defenseShred,
    setDefenseShred,
  ] = useState(0);

  const [
    defenseIgnore,
    setDefenseIgnore,
  ] = useState(0);

  /*
   * =========================
   * 追加バフ
   * =========================
   *
   * 攻撃 / HP / 防御
   * → %
   *
   * 熟知
   * → 固定値
   *
   * その他
   * → percentage point
   */

  const [
    addHpPercent,
    setAddHpPercent,
  ] = useState(0);

  const [
    addAtkPercent,
    setAddAtkPercent,
  ] = useState(0);

  const [
    addDefPercent,
    setAddDefPercent,
  ] = useState(0);

  const [
    addEm,
    setAddEm,
  ] = useState(0);

  const [
    addEr,
    setAddEr,
  ] = useState(0);

  const [
    addCritRate,
    setAddCritRate,
  ] = useState(0);

  const [
    addCritDamage,
    setAddCritDamage,
  ] = useState(0);

  const [
    addElementDamage,
    setAddElementDamage,
  ] = useState(0);

  const [
    addGenericDamage,
    setAddGenericDamage,
  ] = useState(0);

  const [
    addNormalDamage,
    setAddNormalDamage,
  ] = useState(0);

  const [
    addChargedDamage,
    setAddChargedDamage,
  ] = useState(0);

  const [
    addSkillDamage,
    setAddSkillDamage,
  ] = useState(0);

  const [
    addBurstDamage,
    setAddBurstDamage,
  ] = useState(0);

  const [
    addReactionDamage,
    setAddReactionDamage,
  ] = useState(0);

  /*
   * 手動で表示する
   * ダメージ補正
   */

  const [
    showGenericDamage,
    setShowGenericDamage,
  ] = useState(false);

  const [
    showNormalDamage,
    setShowNormalDamage,
  ] = useState(false);

  const [
    showChargedDamage,
    setShowChargedDamage,
  ] = useState(false);

  const [
    showSkillDamage,
    setShowSkillDamage,
  ] = useState(false);

  const [
    showBurstDamage,
    setShowBurstDamage,
  ] = useState(false);

  /* =========================
   * 一覧取得
   * ========================= */

  useEffect(() => {
    async function loadLists() {
      try {
        const [
          characters,
          weapons,
        ] =
          await Promise.all([
            fetchCharacterList(),
            fetchWeaponList(),
          ]);

        setCharacterList(
          characters
        );

        setWeaponList(
          weapons
        );
      } catch (err) {
        console.error(err);

        setError(
          "キャラ・武器一覧の取得に失敗しました"
        );
      }
    }

    loadLists();
  }, []);

  /* =========================
   * 詳細取得
   * ========================= */

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [
          characterData,
          weaponData,
        ] =
          await Promise.all([
            fetchCharacterData(
              characterId
            ),

            fetchWeaponData(
              weaponId
            ),
          ]);

        setCharacter(
          characterData
        );

        setWeapon(
          weaponData
        );
      } catch (err) {
        console.error(err);

        setError(
          "キャラクターまたは武器データの取得に失敗しました"
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [
    characterId,
    weaponId,
  ]);

  /* =========================
   * 選択中
   * ========================= */

  const selectedCharacter =
    useMemo(() => {
      return (
        characterList.find(
          (item) =>
            item.id ===
            characterId
        ) ?? null
      );
    }, [
      characterList,
      characterId,
    ]);

  const selectedWeapon =
    useMemo(() => {
      return (
        weaponList.find(
          (item) =>
            item.id ===
            weaponId
        ) ?? null
      );
    }, [
      weaponList,
      weaponId,
    ]);

  const selectedArtifact =
    useMemo(() => {
      if (!artifactId) {
        return null;
      }

      return getArtifactSetById(
        artifactId
      );
    }, [artifactId]);

  /*
   * =========================
   * 汎用バフエンジン
   * 選択中の聖遺物データを取得
   * =========================
   */

  const artifactBaseBuffResult =
    useMemo(() => {
      if (
        !selectedArtifact ||
        !isBuffEngineArtifact(
          artifactId
        )
      ) {
        return null;
      }

      return evaluateBuffByName(
        "artifacts",
        selectedArtifact.name,
        refinement,
        {
          fourPieceEnabled:
            false,

          targetAffectedBySuperconductOrStarConduction:
            false,

          nightsoulBlessing:
            artifactNightsoulBlessing,

          sourceOnField:
            true,

          obsidianCritActive:
            false,

          goldenTroupeOffField:
            false,

          millelithBuffActive:
            false,

          noblesseBuffActive:
            false,

          stackCount:
            0,
        }
      );
    }, [
      selectedArtifact,
      artifactId,
      refinement,
      artifactNightsoulBlessing,
    ]);

  const artifactBuffResult =
    useMemo(() => {
      if (
        !selectedArtifact ||
        !isBuffEngineArtifact(
          artifactId
        )
      ) {
        return null;
      }

      return evaluateBuffByName(
        "artifacts",
        selectedArtifact.name,
        refinement,
        {
          fourPieceEnabled:
            artifactFourPieceEnabled,

          targetAffectedBySuperconductOrStarConduction:
            artifactTargetAffected,

          nightsoulBlessing:
            artifactNightsoulBlessing,

          sourceOnField:
            !artifactGoldenTroupeOffField,

          sourceOffField:
            artifactGoldenTroupeOffField,

          obsidianCritActive:
            artifactObsidianCritActive,

          goldenTroupeOffField:
            artifactGoldenTroupeOffField,

          millelithBuffActive:
            artifactMillelithBuffActive,

          noblesseBuffActive:
            artifactNoblesseBuffActive,

          stackCount:
            artifactMarechausseeStacks,
        }
      );
    }, [
      selectedArtifact,
      artifactId,
      refinement,
      artifactFourPieceEnabled,
      artifactTargetAffected,
      artifactNightsoulBlessing,
      artifactObsidianCritActive,
      artifactGoldenTroupeOffField,
      artifactMillelithBuffActive,
      artifactNoblesseBuffActive,
      artifactMarechausseeStacks,
    ]);

  function getEngineElementBonus(
    result:
      | NonNullable<
          typeof artifactBuffResult
        >
      | null
  ) {
    if (
      !result ||
      !character
    ) {
      return 0;
    }

    switch (
      character.element
    ) {
      case "Pyro":
        return result.pyroDamageBonus;

      case "Hydro":
        return result.hydroDamageBonus;

      case "Electro":
        return result.electroDamageBonus;

      case "Cryo":
        return result.cryoDamageBonus;

      case "Anemo":
        return result.anemoDamageBonus;

      case "Geo":
        return result.geoDamageBonus;

      case "Dendro":
        return result.dendroDamageBonus;

      default:
        return 0;
    }
  }

  /* =========================
   * 検索
   * ========================= */

  const sortedCharacters =
    useMemo(() => {
      return [...characterList].sort(
        (a, b) =>
          Number(b.id) -
          Number(a.id)
      );
    }, [
      characterList,
    ]);

  const filteredCharacters =
    useMemo(() => {
      const keyword =
        characterSearch
          .trim()
          .toLowerCase();

      if (!keyword) {
        return sortedCharacters;
      }

      return sortedCharacters.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(keyword)
      );
    }, [
      sortedCharacters,
      characterSearch,
    ]);

  const sortedWeapons =
    useMemo(() => {
      return [...weaponList].sort(
        (a, b) =>
          Number(b.id) -
          Number(a.id)
      );
    }, [
      weaponList,
    ]);

  const compatibleWeapons =
    useMemo(() => {
      if (!selectedCharacter) {
        return sortedWeapons;
      }

      const filtered =
        sortedWeapons.filter(
          (item) =>
            !item.weaponType ||
            item.weaponType ===
              selectedCharacter.weapon
        );

      return filtered.length
        ? filtered
        : sortedWeapons;
    }, [
      sortedWeapons,
      selectedCharacter,
    ]);

  const filteredWeapons =
    useMemo(() => {
      const keyword =
        weaponSearch
          .trim()
          .toLowerCase();

      if (!keyword) {
        return compatibleWeapons;
      }

      return compatibleWeapons.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(keyword)
      );
    }, [
      compatibleWeapons,
      weaponSearch,
    ]);

  const filteredArtifacts =
    useMemo(() => {
      const keyword =
        artifactSearch
          .trim()
          .toLowerCase();

      if (!keyword) {
        return ARTIFACT_SETS;
      }

      return ARTIFACT_SETS.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(keyword) ||
          (
            item.enName
              ?.toLowerCase()
              .includes(keyword) ??
            false
          )
      );
    }, [artifactSearch]);

  const artifactBaseEffects =
    useMemo(
      () =>
        getArtifactEffects({
          artifactId:
            isBuffEngineArtifact(
              artifactId
            )
              ? null
              : artifactId,
          conditions: {
            fourPieceEnabled:
              false,
          },
        }),
      [artifactId]
    );

  const artifactEffects =
    useMemo(
      () =>
        getArtifactEffects({
          artifactId:
            isBuffEngineArtifact(
              artifactId
            )
              ? null
              : artifactId,
          conditions: {
            fourPieceEnabled:
              artifactFourPieceEnabled,

            targetAffectedBySuperconductOrStarConduction:
              artifactTargetAffected,

            nightsoulBlessing:
              artifactNightsoulBlessing,

            obsidianCritActive:
              artifactObsidianCritActive,

            marechausseeStacks:
              artifactMarechausseeStacks,

            goldenTroupeOffField:
              artifactGoldenTroupeOffField,

            millelithBuffActive:
              artifactMillelithBuffActive,

            noblesseBuffActive:
              artifactNoblesseBuffActive,
          },
        }),
      [
        artifactId,
        artifactFourPieceEnabled,
        artifactTargetAffected,
        artifactNightsoulBlessing,
        artifactObsidianCritActive,
        artifactMarechausseeStacks,
        artifactGoldenTroupeOffField,
        artifactMillelithBuffActive,
        artifactNoblesseBuffActive,
      ]
    );

  /* =========================
   * キャラ選択
   * ========================= */

  function selectCharacter(
    item: CharacterListEntry
  ) {
    setCharacterId(
      item.id
    );

    const currentWeapon =
      weaponList.find(
        (weaponItem) =>
          weaponItem.id ===
          weaponId
      );

    const compatible =
      !currentWeapon ||
      !currentWeapon.weaponType ||
      currentWeapon.weaponType ===
        item.weapon;

    if (!compatible) {
      const first =
        weaponList.find(
          (weaponItem) =>
            !weaponItem.weaponType ||
            weaponItem.weaponType ===
              item.weapon
        );

      if (first) {
        setWeaponId(
          first.id
        );
      }
    }

    setEnhancedSkillEnabled(
      false
    );

    setSelectedReaction(
      "none"
    );

    setCharacterPickerOpen(
      false
    );

    setCharacterSearch(
      ""
    );
  }

  /* =========================
   * ステータス
   * ========================= */

  const stats =
    useMemo(() => {
      if (
        !character ||
        !weapon
      ) {
        return null;
      }

      const ascensionIndex =
        getCharacterAscensionIndex(
          charLevel
        );

      const ascension =
        character
          .stats_modifier
          .ascension[
            ascensionIndex
          ] ?? {};

      const characterBaseAtk =
        getCharacterBaseAtk(
          character,
          charLevel
        );

      const characterBaseHp =
        getCharacterBaseHp(
          character,
          charLevel
        );

      const characterBaseDef =
        getCharacterBaseDef(
          character,
          charLevel
        );

      const weaponBaseAtk =
        getWeaponBaseAtk(
          weapon,
          weaponLevel
        );

      const totalBaseAtk =
        characterBaseAtk +
        weaponBaseAtk;

      const weaponAtkPercent =
        getWeaponStat(
          weapon,
          "fight_prop_attack_percent",
          weaponLevel
        ) * 100;

      const weaponHpPercent =
        getWeaponStat(
          weapon,
          "fight_prop_hp_percent",
          weaponLevel
        ) * 100;

      const weaponDefPercent =
        getWeaponStat(
          weapon,
          "fight_prop_defense_percent",
          weaponLevel
        ) * 100;

      const weaponCritRate =
        getWeaponStat(
          weapon,
          "fight_prop_critical",
          weaponLevel
        ) * 100;

      const weaponCritDamage =
        getWeaponStat(
          weapon,
          "fight_prop_critical_hurt",
          weaponLevel
        ) * 100;

      const weaponEm =
        getWeaponStat(
          weapon,
          "fight_prop_element_mastery",
          weaponLevel
        );

      const weaponEr =
        getWeaponStat(
          weapon,
          "fight_prop_charge_efficiency",
          weaponLevel
        ) * 100;

      const ascAtkPercent =
        (
          ascension
            .fight_prop_attack_percent ??
          0
        ) * 100;

      const ascHpPercent =
        (
          ascension
            .fight_prop_hp_percent ??
          0
        ) * 100;

      const ascDefPercent =
        (
          ascension
            .fight_prop_defense_percent ??
          0
        ) * 100;

      const ascCritRate =
        (
          ascension
            .fight_prop_critical ??
          0
        ) * 100;

      const ascCritDamage =
        (
          ascension
            .fight_prop_critical_hurt ??
          0
        ) * 100;

      const ascEm =
        ascension
          .fight_prop_element_mastery ??
        0;

      const ascEr =
        (
          ascension
            .fight_prop_charge_efficiency ??
          0
        ) * 100;

      const elementDamageKey =
        getElementDamageKey(
          character.element
        );

      const ascElementDamage =
        elementDamageKey
          ? (
              ascension[
                elementDamageKey
              ] ?? 0
            ) * 100
          : 0;

      const weaponElementDamage =
        elementDamageKey
          ? getWeaponStat(
              weapon,
              elementDamageKey,
              weaponLevel
            ) * 100
          : 0;

      const artifactElementNoBuff =
        getArtifactElementDamageBonus(
          character.element,
          artifactBaseEffects
        );

      const artifactElementBuffed =
        getArtifactElementDamageBonus(
          character.element,
          artifactEffects
        );

      const effects =
        getSpecialEffects({
          characterId,
          weaponId,
          character,
          weapon,
          refinement,
          specialStacks,

          calculationLoad:
            enhancedSkillEnabled
              ? 50
              : 0,

          skillIndex: 0,
        });

      /*
       * バフなし
       *
       * キャラ・武器の基礎ステータスと、
       * 条件なしで常時有効な聖遺物効果。
       */
      const noBuffAtkPercent =
        weaponAtkPercent +
        ascAtkPercent +
        artifactBaseEffects
          .attackPercent +
        (
          artifactBaseBuffResult
            ?.attackPercent ??
          0
        ) *
          100;

      const noBuffHpPercent =
        weaponHpPercent +
        ascHpPercent +
        artifactBaseEffects
          .hpPercent +
        (
          artifactBaseBuffResult
            ?.hpPercent ??
          0
        ) *
          100;

      const noBuffDefPercent =
        weaponDefPercent +
        ascDefPercent +
        artifactBaseEffects
          .defensePercent +
        (
          artifactBaseBuffResult
            ?.defensePercent ??
          0
        ) *
          100;

      const hpNoBuff =
        characterBaseHp *
        (
          1 +
          noBuffHpPercent /
            100
        );

      const atkNoBuff =
        getFinalAttack(
          totalBaseAtk,
          noBuffAtkPercent,
          0
        );

      const defNoBuff =
        characterBaseDef *
        (
          1 +
          noBuffDefPercent /
            100
        );

      const emNoBuff =
        character.elemental_mastery +
        ascEm +
        weaponEm +
        artifactBaseEffects
          .elementalMastery +
        (
          artifactBaseBuffResult
            ?.elementalMastery ??
          0
        );

      const erNoBuff =
        100 +
        ascEr +
        weaponEr +
        artifactBaseEffects
          .energyRecharge +
        (
          artifactBaseBuffResult
            ?.energyRecharge ??
          0
        ) *
          100;

      const critRateNoBuff =
        character.crit_rate *
          100 +
        ascCritRate +
        weaponCritRate +
        artifactBaseEffects
          .critRate +
        (
          artifactBaseBuffResult
            ?.critRate ??
          0
        ) *
          100;

      const critDamageNoBuff =
        character.crit_dmg *
          100 +
        ascCritDamage +
        weaponCritDamage +
        artifactBaseEffects
          .critDamage +
        (
          artifactBaseBuffResult
            ?.critDamage ??
          0
        ) *
          100;

      const elementDamageNoBuff =
        ascElementDamage +
        weaponElementDamage +
        artifactElementNoBuff +
        getEngineElementBonus(
          artifactBaseBuffResult
        ) *
          100;

      const genericDamageNoBuff =
        artifactBaseEffects
          .genericDamageBonus +
        (
          artifactBaseBuffResult
            ?.damageBonus ??
          0
        ) *
          100;

      const normalDamageNoBuff =
        artifactBaseEffects
          .normalAttackDamageBonus +
        (
          artifactBaseBuffResult
            ?.normalDamageBonus ??
          0
        ) *
          100;

      const chargedDamageNoBuff =
        artifactBaseEffects
          .chargedAttackDamageBonus +
        (
          artifactBaseBuffResult
            ?.chargedDamageBonus ??
          0
        ) *
          100;

      const skillDamageNoBuff =
        artifactBaseEffects
          .skillDamageBonus +
        (
          artifactBaseBuffResult
            ?.skillDamageBonus ??
          0
        ) *
          100;

      const burstDamageNoBuff =
        artifactBaseEffects
          .burstDamageBonus +
        (
          artifactBaseBuffResult
            ?.burstDamageBonus ??
          0
        ) *
          100;

      const reactionDamageNoBuff =
        artifactBaseEffects
          .starReactionBonus +
        artifactBaseEffects
          .starConductionReactionBonus +
        (
          artifactBaseBuffResult
            ?.starConductionBonus ??
          0
        ) *
          100;

      /*
       * バフあり
       *
       * 条件付き聖遺物効果・キャラ・武器効果を含む。
       */
      const buffedAtkPercent =
        weaponAtkPercent +
        ascAtkPercent +
        artifactEffects
          .attackPercent +
        (
          artifactBuffResult
            ?.attackPercent ??
          0
        ) *
          100 +
        effects
          .attackPercentBonus;

      const buffedHpPercent =
        weaponHpPercent +
        ascHpPercent +
        artifactEffects
          .hpPercent +
        (
          artifactBuffResult
            ?.hpPercent ??
          0
        ) *
          100;

      const buffedDefPercent =
        weaponDefPercent +
        ascDefPercent +
        artifactEffects
          .defensePercent +
        (
          artifactBuffResult
            ?.defensePercent ??
          0
        ) *
          100;

      const hpBuffed =
        characterBaseHp *
        (
          1 +
          buffedHpPercent /
            100
        );

      const atkBuffed =
        getFinalAttack(
          totalBaseAtk,
          buffedAtkPercent,
          0
        );

      const defBuffed =
        characterBaseDef *
        (
          1 +
          buffedDefPercent /
            100
        );

      const emBuffed =
        character.elemental_mastery +
        ascEm +
        weaponEm +
        artifactEffects
          .elementalMastery +
        (
          artifactBuffResult
            ?.elementalMastery ??
          0
        );

      const erBuffed =
        100 +
        ascEr +
        weaponEr +
        artifactEffects
          .energyRecharge +
        (
          artifactBuffResult
            ?.energyRecharge ??
          0
        ) *
          100;

      const critRateBuffed =
        character.crit_rate *
          100 +
        ascCritRate +
        weaponCritRate +
        artifactEffects
          .critRate +
        (
          artifactBuffResult
            ?.critRate ??
          0
        ) *
          100;

      const critDamageBuffed =
        character.crit_dmg *
          100 +
        ascCritDamage +
        weaponCritDamage +
        artifactEffects
          .critDamage +
        (
          artifactBuffResult
            ?.critDamage ??
          0
        ) *
          100;

      const elementDamageBuffed =
        ascElementDamage +
        weaponElementDamage +
        artifactElementBuffed +
        getEngineElementBonus(
          artifactBuffResult
        ) *
          100;

      const genericDamageBuffed =
        artifactEffects
          .genericDamageBonus +
        (
          artifactBuffResult
            ?.damageBonus ??
          0
        ) *
          100 +
        effects.damageBonus;

      const normalDamageBuffed =
        artifactEffects
          .normalAttackDamageBonus +
        (
          artifactBuffResult
            ?.normalDamageBonus ??
          0
        ) *
          100;

      const chargedDamageBuffed =
        artifactEffects
          .chargedAttackDamageBonus +
        (
          artifactBuffResult
            ?.chargedDamageBonus ??
          0
        ) *
          100;

      const skillDamageBuffed =
        artifactEffects
          .skillDamageBonus +
        (
          artifactBuffResult
            ?.skillDamageBonus ??
          0
        ) *
          100;

      const burstDamageBuffed =
        artifactEffects
          .burstDamageBonus +
        (
          artifactBuffResult
            ?.burstDamageBonus ??
          0
        ) *
          100;

      const reactionDamageBuffed =
        artifactEffects
          .starReactionBonus +
        artifactEffects
          .starConductionReactionBonus +
        (
          artifactBuffResult
            ?.starConductionBonus ??
          0
        ) *
          100 +
        effects.reactionBonus *
          100;

      /*
       * 追加バフ込みの最終値
       *
       * 「バフあり」列と右側のダメージ計算は
       * この値を使う。
       */
      const hpFinal =
        hpBuffed +
        characterBaseHp *
          (
            addHpPercent /
            100
          );

      const atkFinal =
        atkBuffed +
        totalBaseAtk *
          (
            addAtkPercent /
            100
          );

      const defFinal =
        defBuffed +
        characterBaseDef *
          (
            addDefPercent /
            100
          );

      const emFinal =
        emBuffed +
        addEm;

      const erFinal =
        erBuffed +
        addEr;

      const critRateFinal =
        critRateBuffed +
        addCritRate;

      const critDamageFinal =
        critDamageBuffed +
        addCritDamage;

      const elementDamageFinal =
        elementDamageBuffed +
        addElementDamage;

      const genericDamageFinal =
        genericDamageBuffed +
        addGenericDamage;

      const normalDamageFinal =
        normalDamageBuffed +
        addNormalDamage;

      const chargedDamageFinal =
        chargedDamageBuffed +
        addChargedDamage;

      const skillDamageFinal =
        skillDamageBuffed +
        addSkillDamage;

      const burstDamageFinal =
        burstDamageBuffed +
        addBurstDamage;

      const reactionDamageFinal =
        reactionDamageBuffed +
        addReactionDamage;

      return {
        characterBaseAtk,
        characterBaseHp,
        characterBaseDef,
        weaponBaseAtk,
        totalBaseAtk,

        hpNoBuff,
        atkNoBuff,
        defNoBuff,
        emNoBuff,
        erNoBuff,
        critRateNoBuff,
        critDamageNoBuff,
        elementDamageNoBuff,
        genericDamageNoBuff,
        normalDamageNoBuff,
        chargedDamageNoBuff,
        skillDamageNoBuff,
        burstDamageNoBuff,
        reactionDamageNoBuff,

        hpBuffed,
        atkBuffed,
        defBuffed,
        emBuffed,
        erBuffed,
        critRateBuffed,
        critDamageBuffed,
        elementDamageBuffed,
        genericDamageBuffed,
        normalDamageBuffed,
        chargedDamageBuffed,
        skillDamageBuffed,
        burstDamageBuffed,
        reactionDamageBuffed,

        hpFinal,
        atkFinal,
        defFinal,
        emFinal,
        erFinal,
        critRateFinal,
        critDamageFinal,
        elementDamageFinal,
        genericDamageFinal,
        normalDamageFinal,
        chargedDamageFinal,
        skillDamageFinal,
        burstDamageFinal,
        reactionDamageFinal,

        effects,
      };
    }, [
      character,
      weapon,

      characterId,
      weaponId,

      charLevel,
      weaponLevel,

      refinement,
      specialStacks,

      enhancedSkillEnabled,

      artifactBaseEffects,
      artifactEffects,

      artifactBaseBuffResult,
      artifactBuffResult,

      addHpPercent,
      addAtkPercent,
      addDefPercent,

      addEm,
      addEr,

      addCritRate,
      addCritDamage,

      addElementDamage,
      addGenericDamage,

      addNormalDamage,
      addChargedDamage,
      addSkillDamage,
      addBurstDamage,

      addReactionDamage,
    ]);

  /* =========================
   * 元素反応バー
   * ========================= */

  const reactionButtons =
    useMemo<ReactionButtonData[]>(() => {
      if (
        !character ||
        !stats
      ) {
        return [
          {
            id: "none",
            label: "反応なし",
            kind: "none",
          },
        ];
      }

      const result: ReactionButtonData[] = [
        {
          id: "none",
          label: "反応なし",
          kind: "none",
        },
      ];

      const addAmplifying = (
        id: "vaporize" | "melt",
        label: string,
        reaction:
          | "vaporize_pyro"
          | "vaporize_hydro"
          | "melt_pyro"
          | "melt_cryo",
        bonusPercent: number
      ) => {
        const multiplier =
          getAmplifyingMultiplierByReaction({
            reaction,
            elementalMastery:
              stats.emFinal,
            reactionBonusPercent:
              bonusPercent,
          });

        result.push({
          id,
          label,
          kind: "amplifying",
          displayValue:
            `×${multiplier.toFixed(2)}`,
        });
      };

      const addTransformative = (
        id:
          | "overloaded"
          | "electro_charged"
          | "superconduct"
          | "burning"
          | "bloom"
          | "hyperbloom"
          | "burgeon"
          | "swirl",
        label: string,
        reaction:
          | "overloaded"
          | "electro_charged"
          | "superconduct"
          | "burning"
          | "bloom"
          | "hyperbloom"
          | "burgeon"
          | "swirl",
        bonusPercent: number
      ) => {
        const resistanceMultiplier =
          getResistanceMultiplier(
            enemyResistance,
            resistanceShred
          );

        const damage =
          calculateTransformativeReactionDamage({
            reaction,
            characterLevel: 90,
            elementalMastery:
              stats.emFinal,
            reactionBonusPercent:
              bonusPercent,
            resistanceMultiplier,
          });

        result.push({
          id,
          label,
          kind: "transformative",
          displayValue:
            Math.round(
              damage
            ).toLocaleString(),
        });
      };

      switch (
        character.element
      ) {
        case "Pyro":
          addAmplifying(
            "vaporize",
            "蒸発",
            "vaporize_pyro",
            artifactEffects
              .vaporizeReactionBonus
          );

          addAmplifying(
            "melt",
            "溶解",
            "melt_pyro",
            artifactEffects
              .meltReactionBonus
          );

          addTransformative(
            "overloaded",
            "過負荷",
            "overloaded",
            artifactEffects
              .overloadReactionBonus
          );

          addTransformative(
            "burning",
            "燃焼",
            "burning",
            artifactEffects
              .burningReactionBonus
          );

          addTransformative(
            "burgeon",
            "烈開花",
            "burgeon",
            artifactEffects
              .burgeonReactionBonus
          );
          break;

        case "Hydro":
          addAmplifying(
            "vaporize",
            "蒸発",
            "vaporize_hydro",
            artifactEffects
              .vaporizeReactionBonus
          );

          addTransformative(
            "electro_charged",
            "感電",
            "electro_charged",
            artifactEffects
              .electroChargedReactionBonus
          );

          addTransformative(
            "bloom",
            "開花",
            "bloom",
            artifactEffects
              .bloomReactionBonus
          );
          break;

        case "Cryo":
          addAmplifying(
            "melt",
            "溶解",
            "melt_cryo",
            artifactEffects
              .meltReactionBonus
          );

          addTransformative(
            "superconduct",
            "超電導",
            "superconduct",
            artifactEffects
              .superconductReactionBonus +
              (
                artifactBuffResult
                  ?.superconductBonus ??
                0
              ) *
                100
          );
          break;

        case "Electro":
          addTransformative(
            "overloaded",
            "過負荷",
            "overloaded",
            artifactEffects
              .overloadReactionBonus
          );

          addTransformative(
            "electro_charged",
            "感電",
            "electro_charged",
            artifactEffects
              .electroChargedReactionBonus
          );

          addTransformative(
            "superconduct",
            "超電導",
            "superconduct",
            artifactEffects
              .superconductReactionBonus +
              (
                artifactBuffResult
                  ?.superconductBonus ??
                0
              ) *
                100
          );

          addTransformative(
            "hyperbloom",
            "超開花",
            "hyperbloom",
            artifactEffects
              .hyperbloomReactionBonus
          );
          break;

        case "Anemo":
          addTransformative(
            "swirl",
            "拡散",
            "swirl",
            artifactEffects
              .swirlReactionBonus
          );
          break;

        case "Dendro":
          addTransformative(
            "burning",
            "燃焼",
            "burning",
            artifactEffects
              .burningReactionBonus
          );

          addTransformative(
            "bloom",
            "開花",
            "bloom",
            artifactEffects
              .bloomReactionBonus
          );
          break;

        default:
          break;
      }

      return result;
    }, [
      character,
      stats,
      artifactEffects,
      artifactBuffResult,
      enemyResistance,
      resistanceShred,
    ]);

  const selectedReactionButton =
    useMemo(
      () =>
        reactionButtons.find(
          (item) =>
            item.id ===
            selectedReaction
        ) ??
        reactionButtons[0],
      [
        reactionButtons,
        selectedReaction,
      ]
    );

  const selectedAmplifyingMultiplier =
    useMemo(() => {
      if (
        !character ||
        !stats
      ) {
        return 1;
      }

      if (
        selectedReaction ===
        "vaporize"
      ) {
        if (
          character.element ===
          "Pyro"
        ) {
          return getAmplifyingMultiplierByReaction({
            reaction:
              "vaporize_pyro",
            elementalMastery:
              stats.emFinal,
            reactionBonusPercent:
              artifactEffects
                .vaporizeReactionBonus,
          });
        }

        if (
          character.element ===
          "Hydro"
        ) {
          return getAmplifyingMultiplierByReaction({
            reaction:
              "vaporize_hydro",
            elementalMastery:
              stats.emFinal,
            reactionBonusPercent:
              artifactEffects
                .vaporizeReactionBonus,
          });
        }
      }

      if (
        selectedReaction ===
        "melt"
      ) {
        if (
          character.element ===
          "Pyro"
        ) {
          return getAmplifyingMultiplierByReaction({
            reaction:
              "melt_pyro",
            elementalMastery:
              stats.emFinal,
            reactionBonusPercent:
              artifactEffects
                .meltReactionBonus,
          });
        }

        if (
          character.element ===
          "Cryo"
        ) {
          return getAmplifyingMultiplierByReaction({
            reaction:
              "melt_cryo",
            elementalMastery:
              stats.emFinal,
            reactionBonusPercent:
              artifactEffects
                .meltReactionBonus,
          });
        }
      }

      return 1;
    }, [
      character,
      stats,
      selectedReaction,
      artifactEffects,
    ]);

  /* =========================
   * 防御・耐性
   * ========================= */

  const enemyModifiers =
    useMemo(() => {
      const defenseMultiplier =
        getDefenseMultiplier(
          charLevel,
          enemyLevel,
          defenseShred,
          defenseIgnore
        );

      const resistanceMultiplier =
        getResistanceMultiplier(
          enemyResistance,
          resistanceShred
        );

      return {
        defenseMultiplier,
        resistanceMultiplier,
      };
    }, [
      charLevel,
      enemyLevel,
      enemyResistance,
      resistanceShred,
      defenseShred,
      defenseIgnore,
    ]);

  /* =========================
   * 天賦Lv取得
   * ========================= */

  function getSkillTalentLevel(
    skillIndex: number
  ) {
    if (skillIndex === 0) {
      return normalTalentLevel;
    }

    if (skillIndex === 1) {
      return skillTalentLevel;
    }

    if (skillIndex === 2) {
      return burstTalentLevel;
    }

    return 10;
  }

  /* =========================
   * 攻撃種類ごとの追加バフ
   * ========================= */

  function getAttackTypeBonus(
    skillIndex: number,
    label: string
  ) {
    if (!stats) {
      return 0;
    }

    if (skillIndex === 0) {
      if (
        label.includes(
          "重撃"
        )
      ) {
        return stats
          .chargedDamageFinal;
      }

      return stats
        .normalDamageFinal;
    }

    if (skillIndex === 1) {
      return stats
        .skillDamageFinal;
    }

    if (skillIndex === 2) {
      return stats
        .burstDamageFinal;
    }

    return 0;
  }

  /* =========================
   * 全ダメージ
   * ========================= */

  const damageGroups =
    useMemo<
      DamageGroup[]
    >(() => {
      if (
        !character ||
        !weapon ||
        !stats
      ) {
        return [];
      }

      const critProbability =
        Math.max(
          0,
          Math.min(
            1,
            stats
              .critRateFinal /
              100
          )
        );

      return character.skills
        .map(
          (
            skill,
            skillIndex
          ) => {
            const talentLevel =
              getSkillTalentLevel(
                skillIndex
              );

            const entries =
              getTalentEntries(
                character,
                skillIndex,
                talentLevel
              );

            const effects =
              getSpecialEffects({
                characterId,
                weaponId,
                character,
                weapon,
                refinement,
                specialStacks,

                calculationLoad:
                  enhancedSkillEnabled
                    ? 50
                    : 0,

                skillIndex,
              });

            const rows: DamageRowData[] =
              [];

            entries.forEach(
              (
                entry,
                entryIndex
              ) => {
                if (
                  entry.value ===
                    null ||
                  !entry.isPercent
                ) {
                  return;
                }

                const multiplier =
                  entry.value *
                  effects
                    .talentMultiplierScale;

                const attackTypeBonus =
                  getAttackTypeBonus(
                    skillIndex,
                    entry.label
                  );

                const totalDamageBonus =
                  stats
                    .elementDamageFinal +
                  stats
                    .genericDamageFinal +
                  attackTypeBonus;

                const nonCritPerHit =
                  calculateDirectDamage({
                    attack:
                      stats.atkFinal,

                    multiplier,

                    damageBonus:
                      totalDamageBonus,

                    critDamage: 0,

                    defenseMultiplier:
                      enemyModifiers
                        .defenseMultiplier,

                    resistanceMultiplier:
                      enemyModifiers
                        .resistanceMultiplier,
                  });

                const critPerHit =
                  calculateDirectDamage({
                    attack:
                      stats.atkFinal,

                    multiplier,

                    damageBonus:
                      totalDamageBonus,

                    critDamage:
                      stats
                        .critDamageFinal,

                    defenseMultiplier:
                      enemyModifiers
                        .defenseMultiplier,

                    resistanceMultiplier:
                      enemyModifiers
                        .resistanceMultiplier,
                  });

                const hitCount =
                  entry.hitCount ??
                  1;

                const nonCrit =
                  nonCritPerHit *
                  hitCount *
                  selectedAmplifyingMultiplier;

                const crit =
                  critPerHit *
                  hitCount *
                  selectedAmplifyingMultiplier;

                const expected =
                  nonCrit *
                    (
                      1 -
                      critProbability
                    ) +
                  crit *
                    critProbability;

                rows.push({
                  id:
                    `${skillIndex}-${entryIndex}-normal`,

                  label:
                    entry.label,

                  expected,
                  crit,
                  nonCrit,
                });

                /*
                 * 星反応
                 */

                if (
                  useStarReaction
                ) {
                  const reactionBonus =
                    (
                      stats
                        .reactionDamageFinal
                    ) /
                    100;

                  const starNonCrit =
                    calculateStarReactionDamage({
                      attack:
                        stats.atkFinal,

                      multiplier,

                      reactionCoefficient:
                        starReactionCoefficient,

                      baseMultiplier:
                        starBaseMultiplier,

                      reactionBonus,

                      elementalMastery:
                        stats.emFinal,

                      critDamage: 0,

                      defenseMultiplier:
                        enemyModifiers
                          .defenseMultiplier,

                      resistanceMultiplier:
                        enemyModifiers
                          .resistanceMultiplier,
                    }) *
                    hitCount;

                  const starCrit =
                    calculateStarReactionDamage({
                      attack:
                        stats.atkFinal,

                      multiplier,

                      reactionCoefficient:
                        starReactionCoefficient,

                      baseMultiplier:
                        starBaseMultiplier,

                      reactionBonus,

                      elementalMastery:
                        stats.emFinal,

                      critDamage:
                        stats
                          .critDamageFinal,

                      defenseMultiplier:
                        enemyModifiers
                          .defenseMultiplier,

                      resistanceMultiplier:
                        enemyModifiers
                          .resistanceMultiplier,
                    }) *
                    hitCount;

                  const starExpected =
                    starNonCrit *
                      (
                        1 -
                        critProbability
                      ) +
                    starCrit *
                      critProbability;

                  rows.push({
                    id:
                      `${skillIndex}-${entryIndex}-star`,

                    label:
                      `${entry.label}・星反応`,

                    expected:
                      starExpected,

                    crit:
                      starCrit,

                    nonCrit:
                      starNonCrit,

                    reaction: true,
                  });
                }
              }
            );

            return {
              id:
                String(
                  skill.id
                ),

              name:
                skill.name,

              rows,
            };
          }
        )
        .filter(
          (group) =>
            group.rows.length >
            0
        );
    }, [
      character,
      weapon,
      stats,

      characterId,
      weaponId,

      refinement,
      specialStacks,

      enhancedSkillEnabled,

      normalTalentLevel,
      skillTalentLevel,
      burstTalentLevel,

      addNormalDamage,
      addChargedDamage,
      addSkillDamage,
      addBurstDamage,

      selectedAmplifyingMultiplier,

      useStarReaction,
      starReactionCoefficient,
      starBaseMultiplier,

      enemyModifiers,
    ]);

  /* =========================
   * 比較基準
   * ========================= */

  const damageGroupsWithComparison =
    useMemo<DamageGroup[]>(() => {
      if (!baselineDamageGroups) {
        return damageGroups;
      }

      const baselineMap =
        new Map<string, DamageRowData>();

      baselineDamageGroups.forEach(
        (group) => {
          group.rows.forEach(
            (row) => {
              baselineMap.set(
                `${group.id}::${row.id}`,
                row
              );
            }
          );
        }
      );

      return damageGroups.map(
        (group) => ({
          ...group,
          rows: group.rows.map(
            (row) => {
              const baseline =
                baselineMap.get(
                  `${group.id}::${row.id}`
                );

              return {
                ...row,
                baselineExpected:
                  baseline?.expected,
                baselineCrit:
                  baseline?.crit,
                baselineNonCrit:
                  baseline?.nonCrit,
              };
            }
          ),
        })
      );
    }, [
      damageGroups,
      baselineDamageGroups,
    ]);

  function saveCurrentAsBaseline() {
    setBaselineDamageGroups(
      damageGroups.map(
        (group) => ({
          ...group,
          rows: group.rows.map(
            (row) => ({
              ...row,
            })
          ),
        })
      )
    );
  }

  function clearBaseline() {
    setBaselineDamageGroups(
      null
    );
  }

  /* =========================
   * 条件付きダメージ補正行
   * ========================= */

  const showElementRow =
    Boolean(
      character
    );

  const showGenericRow =
    showGenericDamage ||
    (
      stats?.genericDamageBuffed ??
      0
    ) !== 0 ||
    addGenericDamage !== 0;

  const showNormalRow =
    showNormalDamage ||
    (
      stats?.normalDamageBuffed ??
      0
    ) !== 0 ||
    addNormalDamage !== 0;

  const showChargedRow =
    showChargedDamage ||
    (
      stats?.chargedDamageBuffed ??
      0
    ) !== 0 ||
    addChargedDamage !== 0;

  const showSkillRow =
    showSkillDamage ||
    (
      stats?.skillDamageBuffed ??
      0
    ) !== 0 ||
    addSkillDamage !== 0;

  const showBurstRow =
    showBurstDamage ||
    (
      stats?.burstDamageBuffed ??
      0
    ) !== 0 ||
    addBurstDamage !== 0;

  const showReactionRow =
    useStarReaction ||
    (
      stats?.reactionDamageBuffed ??
      0
    ) !== 0 ||
    addReactionDamage !== 0;

  /* =========================
   * UI
   * ========================= */

  return (
    <main className="min-h-screen bg-[#0b0d12] text-gray-100">
      <div className="mx-auto max-w-[1700px] px-3 py-4">
        <h1 className="mb-3 text-xl font-bold">
          原神ダメージ計算
        </h1>

        {error && (
          <div className="mb-3 border border-red-800 bg-red-950/40 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {loading && (
          <div className="border border-gray-700 bg-[#171a21] p-5">
            データ読み込み中...
          </div>
        )}

        {!loading &&
          character &&
          weapon &&
          stats && (
            <>
              {/*
               * 左50 / 右50
               */}
              <div className="grid items-start gap-3 xl:grid-cols-2">

                {/* =====================
                 * LEFT
                 * ===================== */}
                <div className="space-y-3">

                  {/* 装備 */}
                  <CalcSection
                    title="キャラクター・武器・聖遺物"
                    open
                  >
                    <div className="grid gap-2 md:grid-cols-3">

                      {/* キャラ */}
                      <SelectionCard
                        onClick={() =>
                          setCharacterPickerOpen(
                            true
                          )
                        }
                      >
                        {selectedCharacter?.icon && (
                          <img
                            src={getAssetUrl(
                              selectedCharacter.icon
                            )}
                            alt=""
                            className="h-16 w-16 object-contain"
                          />
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="truncate font-bold">
                            {
                              selectedCharacter?.name
                            }
                          </div>

                          <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                            <img
                              src={getAssetUrl(
                                selectedCharacter?.element
                              )}
                              alt=""
                              className="h-4 w-4"
                            />

                            {
                              selectedCharacter?.element
                            }
                          </div>

                          <StarDisplay
                            rank={
                              selectedCharacter?.rank
                            }
                          />
                        </div>

                        <span className="text-xs text-gray-500">
                          変更
                        </span>
                      </SelectionCard>

                      {/* 武器 */}
                      <SelectionCard
                        onClick={() =>
                          setWeaponPickerOpen(
                            true
                          )
                        }
                      >
                        {selectedWeapon?.icon && (
                          <img
                            src={getAssetUrl(
                              selectedWeapon.icon
                            )}
                            alt=""
                            className="h-16 w-16 object-contain"
                          />
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="truncate font-bold">
                            {
                              selectedWeapon?.name
                            }
                          </div>

                          <StarDisplay
                            rank={
                              selectedWeapon?.rank
                            }
                          />
                        </div>

                        <span className="text-xs text-gray-500">
                          変更
                        </span>
                      </SelectionCard>

                      {/* 聖遺物 */}
                      <SelectionCard
                        onClick={() =>
                          setArtifactPickerOpen(
                            true
                          )
                        }
                      >
                        {selectedArtifact?.icon ? (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-[#181c24]">
                            <img
                              src={getAssetUrl(
                                selectedArtifact.icon
                              )}
                              alt={selectedArtifact.name}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#181c24] text-2xl text-yellow-500">
                            聖
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="truncate font-bold">
                            {selectedArtifact
                              ? selectedArtifact.name
                              : "聖遺物"}
                          </div>

                          <div className="mt-1 text-xs text-gray-500">
                            {selectedArtifact
                              ? artifactFourPieceEnabled
                                ? "4セット"
                                : "2セット"
                              : "未設定"}
                          </div>
                        </div>

                        <span className="text-xs text-gray-500">
                          変更
                        </span>
                      </SelectionCard>
                    </div>

                    {selectedArtifact && (
                      <div className="border border-gray-700 bg-[#11141a] p-3 text-xs">
                        <div className="font-bold text-gray-200">
                          {selectedArtifact.name}
                        </div>

                        <div className="mt-2 text-gray-400">
                          <span className="font-bold text-gray-300">
                            2セット：
                          </span>
                          {selectedArtifact.twoPiece}
                        </div>

                        <div className="mt-1 text-gray-400">
                          <span className="font-bold text-gray-300">
                            4セット：
                          </span>
                          {selectedArtifact.fourPiece}
                        </div>
                      </div>
                    )}

                    {/* Lv */}
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <CompactInput
                        label="キャラLv"
                        value={
                          charLevel
                        }
                        setValue={
                          setCharLevel
                        }
                      />

                      <CompactInput
                        label="武器Lv"
                        value={
                          weaponLevel
                        }
                        setValue={
                          setWeaponLevel
                        }
                      />

                      <CompactInput
                        label="精錬"
                        value={
                          refinement
                        }
                        setValue={
                          setRefinement
                        }
                      />
                    </div>

                    {/* 天賦 */}
                    <div>
                      <div className="mb-2 text-xs font-bold text-gray-300">
                        天賦レベル
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <CompactInput
                          label="通常攻撃"
                          value={
                            normalTalentLevel
                          }
                          setValue={
                            setNormalTalentLevel
                          }
                        />

                        <CompactInput
                          label="元素スキル"
                          value={
                            skillTalentLevel
                          }
                          setValue={
                            setSkillTalentLevel
                          }
                        />

                        <CompactInput
                          label="元素爆発"
                          value={
                            burstTalentLevel
                          }
                          setValue={
                            setBurstTalentLevel
                          }
                        />
                      </div>
                    </div>
                  </CalcSection>

                  {/* ステータス */}
                  <CalcSection
                    title="ステータス"
                    open
                  >
                    <StatTableHeader />

                    {/* 基本ステータス */}

                    <StatRow
                      label="HP"
                      noBuff={Math.round(
                        stats.hpNoBuff
                      ).toLocaleString()}
                      buffed={Math.round(
                        stats.hpFinal
                      ).toLocaleString()}
                      additional={
                        addHpPercent
                      }
                      setAdditional={
                        setAddHpPercent
                      }
                      unit="%"
                    />

                    <StatRow
                      label="攻撃力"
                      noBuff={Math.round(
                        stats.atkNoBuff
                      ).toLocaleString()}
                      buffed={Math.round(
                        stats.atkFinal
                      ).toLocaleString()}
                      additional={
                        addAtkPercent
                      }
                      setAdditional={
                        setAddAtkPercent
                      }
                      unit="%"
                    />

                    <StatRow
                      label="防御力"
                      noBuff={Math.round(
                        stats.defNoBuff
                      ).toLocaleString()}
                      buffed={Math.round(
                        stats.defFinal
                      ).toLocaleString()}
                      additional={
                        addDefPercent
                      }
                      setAdditional={
                        setAddDefPercent
                      }
                      unit="%"
                    />

                    <StatRow
                      label="元素熟知"
                      noBuff={Math.round(
                        stats.emNoBuff
                      ).toLocaleString()}
                      buffed={Math.round(
                        stats.emFinal
                      ).toLocaleString()}
                      additional={
                        addEm
                      }
                      setAdditional={
                        setAddEm
                      }
                    />

                    <StatRow
                      label="元素チャージ効率"
                      noBuff={`${stats.erNoBuff.toFixed(
                        1
                      )}%`}
                      buffed={`${stats.erFinal.toFixed(
                        1
                      )}%`}
                      additional={
                        addEr
                      }
                      setAdditional={
                        setAddEr
                      }
                      unit="%"
                    />

                    <StatRow
                      label="会心率"
                      noBuff={`${stats.critRateNoBuff.toFixed(
                        1
                      )}%`}
                      buffed={`${stats.critRateFinal.toFixed(
                        1
                      )}%`}
                      additional={
                        addCritRate
                      }
                      setAdditional={
                        setAddCritRate
                      }
                      unit="%"
                    />

                    <StatRow
                      label="会心ダメージ"
                      noBuff={`${stats.critDamageNoBuff.toFixed(
                        1
                      )}%`}
                      buffed={`${stats.critDamageFinal.toFixed(
                        1
                      )}%`}
                      additional={
                        addCritDamage
                      }
                      setAdditional={
                        setAddCritDamage
                      }
                      unit="%"
                    />

                    {/* 関連するダメージ補正のみ */}

                    <div className="my-2 border-t border-gray-700" />

                    <div className="mb-1 text-xs font-bold text-gray-400">
                      ダメージ補正
                    </div>

                    {showElementRow && (
                      <StatRow
                        label={`${getElementName(
                          character.element
                        )}元素ダメージ`}
                        noBuff={`${stats.elementDamageNoBuff.toFixed(
                          1
                        )}%`}
                        buffed={`${stats.elementDamageFinal.toFixed(
                          1
                        )}%`}
                        additional={
                          addElementDamage
                        }
                        setAdditional={
                          setAddElementDamage
                        }
                        unit="%"
                      />
                    )}

                    {showGenericRow && (
                      <StatRow
                        label="与えるダメージ"
                        noBuff={`${stats.genericDamageNoBuff.toFixed(
                          1
                        )}%`}
                        buffed={`${stats.genericDamageFinal.toFixed(
                          1
                        )}%`}
                        additional={
                          addGenericDamage
                        }
                        setAdditional={
                          setAddGenericDamage
                        }
                        unit="%"
                      />
                    )}

                    {showNormalRow && (
                      <StatRow
                        label="通常攻撃ダメージ"
                        noBuff={`${stats.normalDamageNoBuff.toFixed(
                          1
                        )}%`}
                        buffed={`${stats.normalDamageFinal.toFixed(
                          1
                        )}%`}
                        additional={
                          addNormalDamage
                        }
                        setAdditional={
                          setAddNormalDamage
                        }
                        unit="%"
                      />
                    )}

                    {showChargedRow && (
                      <StatRow
                        label="重撃ダメージ"
                        noBuff={`${stats.chargedDamageNoBuff.toFixed(
                          1
                        )}%`}
                        buffed={`${stats.chargedDamageFinal.toFixed(
                          1
                        )}%`}
                        additional={
                          addChargedDamage
                        }
                        setAdditional={
                          setAddChargedDamage
                        }
                        unit="%"
                      />
                    )}

                    {showSkillRow && (
                      <StatRow
                        label="元素スキルダメージ"
                        noBuff={`${stats.skillDamageNoBuff.toFixed(
                          1
                        )}%`}
                        buffed={`${stats.skillDamageFinal.toFixed(
                          1
                        )}%`}
                        additional={
                          addSkillDamage
                        }
                        setAdditional={
                          setAddSkillDamage
                        }
                        unit="%"
                      />
                    )}

                    {showBurstRow && (
                      <StatRow
                        label="元素爆発ダメージ"
                        noBuff={`${stats.burstDamageNoBuff.toFixed(
                          1
                        )}%`}
                        buffed={`${stats.burstDamageFinal.toFixed(
                          1
                        )}%`}
                        additional={
                          addBurstDamage
                        }
                        setAdditional={
                          setAddBurstDamage
                        }
                        unit="%"
                      />
                    )}

                    {showReactionRow && (
                      <StatRow
                        label="星反応ダメージ"
                        noBuff={`${stats.reactionDamageNoBuff.toFixed(
                          1
                        )}%`}
                        buffed={`${stats.reactionDamageFinal.toFixed(
                          1
                        )}%`}
                        additional={
                          addReactionDamage
                        }
                        setAdditional={
                          setAddReactionDamage
                        }
                        unit="%"
                      />
                    )}

                    {/* 必要な行を追加 */}
                    <details className="mt-2 border border-gray-800">
                      <summary className="cursor-pointer px-3 py-2 text-xs text-gray-400">
                        ＋ ダメージ補正の項目を追加
                      </summary>

                      <div className="grid grid-cols-2 gap-2 border-t border-gray-800 p-3 text-xs">
                        <ToggleRow
                          label="与えるダメージ"
                          checked={
                            showGenericDamage
                          }
                          onChange={
                            setShowGenericDamage
                          }
                        />

                        <ToggleRow
                          label="通常攻撃"
                          checked={
                            showNormalDamage
                          }
                          onChange={
                            setShowNormalDamage
                          }
                        />

                        <ToggleRow
                          label="重撃"
                          checked={
                            showChargedDamage
                          }
                          onChange={
                            setShowChargedDamage
                          }
                        />

                        <ToggleRow
                          label="元素スキル"
                          checked={
                            showSkillDamage
                          }
                          onChange={
                            setShowSkillDamage
                          }
                        />

                        <ToggleRow
                          label="元素爆発"
                          checked={
                            showBurstDamage
                          }
                          onChange={
                            setShowBurstDamage
                          }
                        />
                      </div>
                    </details>
                  </CalcSection>

                  {/* オプション */}
                  <CalcSection
                    title="オプション・バフ"
                    open
                  >
                    <div className="grid gap-2 md:grid-cols-2">

                      <OptionBox title="聖遺物">
                        {!selectedArtifact ? (
                          <MutedText>
                            聖遺物が未設定です
                          </MutedText>
                        ) : (
                          <div className="space-y-3">
                            <CheckOption
                              checked={
                                artifactFourPieceEnabled
                              }
                              onChange={
                                setArtifactFourPieceEnabled
                              }
                              title="4セット効果を使用"
                            />

                            {isBuffEngineArtifact(
                              artifactId
                            ) && (
                              <div className="border border-emerald-900/70 bg-emerald-950/20 px-2 py-1.5 text-xs text-emerald-300">
                                buffEngineで計算中
                              </div>
                            )}

                            {artifactId === 15046 && (
                              <>
                                <CheckOption
                                  checked={
                                    artifactTargetAffected
                                  }
                                  onChange={
                                    setArtifactTargetAffected
                                  }
                                  title="敵が超電導/星電導の影響を受けている"
                                  description="会心率+16%を適用"
                                />
                              </>
                            )}

                            {artifactId === 15038 && (
                              <>
                                <CheckOption
                                  checked={
                                    artifactNightsoulBlessing
                                  }
                                  onChange={
                                    setArtifactNightsoulBlessing
                                  }
                                  title="夜魂の加護状態"
                                  description="2セット効果を適用"
                                />

                                <CheckOption
                                  checked={
                                    artifactObsidianCritActive
                                  }
                                  onChange={
                                    setArtifactObsidianCritActive
                                  }
                                  title="夜魂値を消費済み"
                                  description="会心率+40%を適用"
                                />
                              </>
                            )}

                            {artifactId === 15031 && (
                              <div>
                                <div className="mb-2 text-xs text-gray-400">
                                  ファントム4セット層数
                                </div>

                                <div className="flex gap-1">
                                  {[0, 1, 2, 3].map(
                                    (stack) => (
                                      <button
                                        key={stack}
                                        type="button"
                                        onClick={() =>
                                          setArtifactMarechausseeStacks(
                                            stack
                                          )
                                        }
                                        className={`min-w-10 border px-3 py-1.5 text-sm ${
                                          artifactMarechausseeStacks ===
                                          stack
                                            ? "border-blue-400 bg-blue-950 text-blue-200"
                                            : "border-gray-700 bg-[#11141a]"
                                        }`}
                                      >
                                        {stack}
                                      </button>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            {artifactId === 15032 && (
                              <CheckOption
                                checked={
                                  artifactGoldenTroupeOffField
                                }
                                onChange={
                                  setArtifactGoldenTroupeOffField
                                }
                                title="待機中"
                                description="追加のスキルダメージ+25%を適用"
                              />
                            )}

                            {artifactId === 15017 && (
                              <CheckOption
                                checked={
                                  artifactMillelithBuffActive
                                }
                                onChange={
                                  setArtifactMillelithBuffActive
                                }
                                title="元素スキル命中後"
                                description="4セット攻撃力+20%を適用"
                              />
                            )}

                            {artifactId === 15007 && (
                              <CheckOption
                                checked={
                                  artifactNoblesseBuffActive
                                }
                                onChange={
                                  setArtifactNoblesseBuffActive
                                }
                                title="元素爆発発動後"
                                description="4セット攻撃力+20%を適用"
                              />
                            )}

                            {artifactEffects.notes.length > 0 && (
                              <details className="border border-gray-800">
                                <summary className="cursor-pointer px-2 py-1.5 text-xs text-gray-400">
                                  適用中の効果
                                </summary>

                                <div className="space-y-1 border-t border-gray-800 p-2 text-xs text-gray-500">
                                  {artifactEffects.notes.map(
                                    (note, index) => (
                                      <div key={`${note}-${index}`}>
                                        {note}
                                      </div>
                                    )
                                  )}
                                </div>
                              </details>
                            )}
                          </div>
                        )}
                      </OptionBox>

                      <OptionBox title="キャラクター">
                        {characterId ===
                        "10000133" ? (
                          <CheckOption
                            checked={
                              enhancedSkillEnabled
                            }
                            onChange={
                              setEnhancedSkillEnabled
                            }
                            title="演算負荷50以上"
                            description="元素スキルを強化状態として計算"
                          />
                        ) : (
                          <MutedText>
                            登録済みの専用効果なし
                          </MutedText>
                        )}
                      </OptionBox>

                      <OptionBox title="武器">
                        {weaponId ===
                        "12516" ? (
                          <>
                            <div className="text-sm font-medium">
                              超越
                            </div>

                            <div className="mt-2 flex gap-1">
                              {[0, 1, 2, 3].map(
                                (
                                  stack
                                ) => (
                                  <button
                                    key={
                                      stack
                                    }
                                    type="button"
                                    onClick={() =>
                                      setSpecialStacks(
                                        stack
                                      )
                                    }
                                    className={`min-w-10 border px-3 py-1.5 text-sm ${
                                      specialStacks ===
                                      stack
                                        ? "border-blue-400 bg-blue-950 text-blue-200"
                                        : "border-gray-700 bg-[#11141a]"
                                    }`}
                                  >
                                    {
                                      stack
                                    }
                                  </button>
                                )
                              )}
                            </div>
                          </>
                        ) : (
                          <MutedText>
                            登録済みの専用効果なし
                          </MutedText>
                        )}
                      </OptionBox>

                      <OptionBox title="特殊反応">
                        <CheckOption
                          checked={
                            useStarReaction
                          }
                          onChange={
                            setUseStarReaction
                          }
                          title="星反応を表示"
                        />

                        {useStarReaction && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <CompactInput
                              label="反応係数"
                              value={
                                starReactionCoefficient
                              }
                              setValue={
                                setStarReactionCoefficient
                              }
                              step="0.1"
                            />

                            <CompactInput
                              label="基礎別枠"
                              value={
                                starBaseMultiplier
                              }
                              setValue={
                                setStarBaseMultiplier
                              }
                              step="0.01"
                            />
                          </div>
                        )}
                      </OptionBox>

                      <OptionBox title="チーム・その他">
                        <MutedText>
                          味方バフは今後ここへチェック式で追加
                        </MutedText>
                      </OptionBox>
                    </div>
                  </CalcSection>

                  {/* 敵 */}
                  <CalcSection
                    title="敵"
                  >
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                      <CompactInput
                        label="敵Lv"
                        value={
                          enemyLevel
                        }
                        setValue={
                          setEnemyLevel
                        }
                      />

                      <CompactInput
                        label="耐性%"
                        value={
                          enemyResistance
                        }
                        setValue={
                          setEnemyResistance
                        }
                      />

                      <CompactInput
                        label="耐性ダウン%"
                        value={
                          resistanceShred
                        }
                        setValue={
                          setResistanceShred
                        }
                      />

                      <CompactInput
                        label="防御ダウン%"
                        value={
                          defenseShred
                        }
                        setValue={
                          setDefenseShred
                        }
                      />

                      <CompactInput
                        label="防御無視%"
                        value={
                          defenseIgnore
                        }
                        setValue={
                          setDefenseIgnore
                        }
                      />
                    </div>
                  </CalcSection>
                </div>

                {/* =====================
                 * RIGHT
                 * ===================== */}

                <aside className="xl:sticky xl:top-3">
                  <div className="border border-gray-700 bg-[#15181f]">
                    <div className="border-b border-gray-700 bg-[#252a34] px-3 py-2">
                      <h2 className="font-bold">
                        ダメージ
                      </h2>

                      <p className="text-xs text-gray-500">
                        期待値 / 会心 / 非会心
                      </p>
                    </div>

                    <div className="border-b border-gray-700 bg-[#101319] p-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={
                            saveCurrentAsBaseline
                          }
                          className="border border-blue-500 bg-blue-950/50 px-3 py-1.5 text-sm font-bold text-blue-200 hover:bg-blue-900/50"
                        >
                          現在を基準に設定
                        </button>

                        {baselineDamageGroups && (
                          <button
                            type="button"
                            onClick={
                              clearBaseline
                            }
                            className="border border-gray-600 bg-[#191d24] px-3 py-1.5 text-sm text-gray-300 hover:bg-[#232833]"
                          >
                            基準を解除
                          </button>
                        )}

                        <span className="text-xs text-gray-500">
                          {baselineDamageGroups
                            ? "基準：保存済み"
                            : "基準：未設定"}
                        </span>
                      </div>
                    </div>

                    <div className="border-b border-gray-700 bg-[#101319] p-2">
                      <div className="mb-1 text-xs font-bold text-gray-400">
                        元素反応
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {reactionButtons.map(
                          (
                            reaction
                          ) => {
                            const active =
                              selectedReaction ===
                              reaction.id;

                            return (
                              <button
                                key={
                                  reaction.id
                                }
                                type="button"
                                onClick={() =>
                                  setSelectedReaction(
                                    reaction.id
                                  )
                                }
                                className={`min-w-[94px] border px-3 py-1.5 text-sm font-medium ${
                                  active
                                    ? "border-yellow-400 bg-yellow-950/60 text-yellow-200"
                                    : "border-gray-600 bg-[#191d24] text-gray-300 hover:bg-[#232833]"
                                }`}
                              >
                                <span>
                                  {
                                    reaction.label
                                  }
                                </span>

                                {reaction.displayValue && (
                                  <span className="ml-1 font-bold">
                                    {
                                      reaction.displayValue
                                    }
                                  </span>
                                )}
                              </button>
                            );
                          }
                        )}
                      </div>

                      {selectedReactionButton?.kind ===
                        "transformative" && (
                        <div className="mt-2 text-xs text-gray-400">
                          選択中の反応ダメージ：
                          <span className="ml-1 font-bold text-gray-100">
                            {
                              selectedReactionButton.displayValue
                            }
                          </span>
                        </div>
                      )}

                      {selectedReactionButton?.kind ===
                        "amplifying" && (
                        <div className="mt-2 text-xs text-gray-400">
                          右側の各攻撃に
                          <span className="mx-1 font-bold text-yellow-200">
                            {
                              selectedReactionButton.displayValue
                            }
                          </span>
                          を適用
                        </div>
                      )}
                    </div>

                    <div className="max-h-[calc(100vh-150px)] overflow-auto">
                      {damageGroupsWithComparison.map(
                        (
                          group
                        ) => (
                          <DamageGroupTable
                            key={
                              group.id
                            }
                            group={
                              group
                            }
                          />
                        )
                      )}
                    </div>
                  </div>
                </aside>
              </div>

              {/* 詳細 */}
              <details className="mt-3 border border-gray-700 bg-[#15181f]">
                <summary className="cursor-pointer bg-[#252a34] px-3 py-2 font-bold">
                  計算詳細
                </summary>

                <div className="grid gap-3 p-4 md:grid-cols-2">
                  <DetailBox
                    title="最終計算ステータス"
                  >
                    攻撃力：
                    {" "}
                    {Math.round(
                      stats.atkFinal
                    ).toLocaleString()}
                    <br />

                    会心率：
                    {" "}
                    {stats.critRateFinal.toFixed(
                      1
                    )}
                    %
                    <br />

                    会心ダメ：
                    {" "}
                    {stats.critDamageFinal.toFixed(
                      1
                    )}
                    %
                    <br />

                    元素熟知：
                    {" "}
                    {Math.round(
                      stats.emFinal
                    )}
                  </DetailBox>

                  <DetailBox
                    title="敵補正"
                  >
                    防御補正：
                    {" "}
                    ×
                    {enemyModifiers.defenseMultiplier.toFixed(
                      4
                    )}
                    <br />

                    耐性補正：
                    {" "}
                    ×
                    {enemyModifiers.resistanceMultiplier.toFixed(
                      4
                    )}
                  </DetailBox>
                </div>
              </details>
            </>
          )}
      </div>

      {/* キャラ選択 */}

      {characterPickerOpen && (
        <PickerModal
          title="キャラクターを選択"
          onClose={() => {
            setCharacterPickerOpen(
              false
            );

            setCharacterSearch(
              ""
            );
          }}
        >
          <input
            type="search"
            placeholder="キャラ名で検索"
            value={
              characterSearch
            }
            onChange={(e) =>
              setCharacterSearch(
                e.target.value
              )
            }
            className="mb-3 w-full border border-gray-700 bg-[#11141a] p-2.5"
          />

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7">
            {filteredCharacters.map(
              (
                item
              ) => (
                <button
                  key={
                    item.id
                  }
                  type="button"
                  onClick={() =>
                    selectCharacter(
                      item
                    )
                  }
                  className="border border-gray-700 bg-[#11141a] p-1 text-left"
                >
                  <div className="aspect-square">
                    {item.icon && (
                      <img
                        src={getAssetUrl(
                          item.icon
                        )}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>

                  <div className="truncate p-1 text-xs">
                    {
                      item.name
                    }
                  </div>
                </button>
              )
            )}
          </div>
        </PickerModal>
      )}

      {/* 武器選択 */}

      {weaponPickerOpen && (
        <PickerModal
          title="武器を選択"
          onClose={() => {
            setWeaponPickerOpen(
              false
            );

            setWeaponSearch(
              ""
            );
          }}
        >
          <input
            type="search"
            placeholder="武器名で検索"
            value={
              weaponSearch
            }
            onChange={(e) =>
              setWeaponSearch(
                e.target.value
              )
            }
            className="mb-3 w-full border border-gray-700 bg-[#11141a] p-2.5"
          />

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7">
            {filteredWeapons.map(
              (
                item
              ) => (
                <button
                  key={
                    item.id
                  }
                  type="button"
                  onClick={() => {
                    setWeaponId(
                      item.id
                    );

                    setWeaponPickerOpen(
                      false
                    );
                  }}
                  className="border border-gray-700 bg-[#11141a] p-1 text-left"
                >
                  <div className="aspect-square">
                    {item.icon && (
                      <img
                        src={getAssetUrl(
                          item.icon
                        )}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>

                  <div className="truncate p-1 text-xs">
                    {
                      item.name
                    }
                  </div>
                </button>
              )
            )}
          </div>
        </PickerModal>
      )}

      {/* 聖遺物選択 */}

      {artifactPickerOpen && (
        <PickerModal
          title="聖遺物を選択"
          onClose={() => {
            setArtifactPickerOpen(
              false
            );

            setArtifactSearch(
              ""
            );
          }}
        >
          <div className="mb-3 flex gap-2">
            <input
              type="search"
              placeholder="聖遺物名で検索"
              value={
                artifactSearch
              }
              onChange={(e) =>
                setArtifactSearch(
                  e.target.value
                )
              }
              className="min-w-0 flex-1 border border-gray-700 bg-[#11141a] p-2.5"
            />

            <button
              type="button"
              onClick={() => {
                setArtifactId(
                  null
                );

                setArtifactPickerOpen(
                  false
                );

                setArtifactSearch(
                  ""
                );
              }}
              className="border border-gray-700 bg-[#11141a] px-3 text-sm text-gray-300"
            >
              解除
            </button>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            {filteredArtifacts.map(
              (
                item
              ) => (
                <button
                  key={
                    item.id
                  }
                  type="button"
                  onClick={() => {
                    setArtifactId(
                      item.id
                    );

                    setArtifactFourPieceEnabled(
                      true
                    );

                    setArtifactTargetAffected(
                      false
                    );

                    setArtifactNightsoulBlessing(
                      false
                    );

                    setArtifactObsidianCritActive(
                      false
                    );

                    setArtifactMarechausseeStacks(
                      0
                    );

                    setArtifactGoldenTroupeOffField(
                      false
                    );

                    setArtifactMillelithBuffActive(
                      false
                    );

                    setArtifactNoblesseBuffActive(
                      false
                    );

                    setArtifactPickerOpen(
                      false
                    );

                    setArtifactSearch(
                      ""
                    );
                  }}
                  className={`border p-3 text-left ${
                    artifactId ===
                    item.id
                      ? "border-blue-400 bg-blue-950/40"
                      : "border-gray-700 bg-[#11141a] hover:bg-[#191d25]"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-[#181c24]">
                      {item.icon ? (
                        <img
                          src={getAssetUrl(
                            item.icon
                          )}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-xl text-yellow-500">
                          聖
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="truncate font-bold">
                        {item.name}
                      </div>

                      <div className="mt-2 text-xs text-gray-400">
                        <span className="font-bold text-gray-300">
                          2セット：
                        </span>
                        {item.twoPiece}
                      </div>

                      <div className="mt-1 text-xs text-gray-500">
                        <span className="font-bold text-gray-400">
                          4セット：
                        </span>
                        {item.fourPiece}
                      </div>
                    </div>
                  </div>
                </button>
              )
            )}
          </div>
        </PickerModal>
      )}

    </main>
  );
}

/* =========================
 * ステータス表
 * ========================= */

function StatTableHeader() {
  return (
    <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1.25fr] border border-gray-700 bg-[#252a34] text-xs font-bold">
      <div className="px-4 py-2">
        ステータス
      </div>

      <div className="px-3 py-2 text-right">
        バフなし
      </div>

      <div className="px-3 py-2 text-right">
        バフあり
      </div>

      <div className="px-3 py-2 text-center">
        追加バフ
      </div>
    </div>
  );
}

function StatRow({
  label,
  noBuff,
  buffed,
  additional,
  setAdditional,
  unit = "",
}: {
  label: string;
  noBuff: string;
  buffed: string;
  additional: number;
  setAdditional: (
    value: number
  ) => void;
  unit?: string;
}) {
  return (
    <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1.25fr] items-center border-x border-b border-gray-700 bg-[#11141a] text-sm">
      <div className="px-4 py-3 font-medium text-gray-200">
        {label}
      </div>

      <div className="px-3 py-3 text-right tabular-nums text-gray-400">
        {noBuff}
      </div>

      <div className="px-3 py-3 text-right font-bold tabular-nums text-white">
        {buffed}
      </div>

      <div className="grid grid-cols-[18px_minmax(0,1fr)_20px] items-center gap-1 px-3 py-1.5">
        <span className="text-center text-gray-500">
          +
        </span>

        <input
          type="number"
          value={
            additional
          }
          onChange={(e) =>
            setAdditional(
              Number(
                e.target.value
              )
            )
          }
          className="w-full min-w-0 border border-gray-700 bg-[#0b0d12] px-2 py-1.5 text-right tabular-nums outline-none focus:border-blue-500"
        />

        <span className="text-left text-xs text-gray-500">
          {unit}
        </span>
      </div>
    </div>
  );
}

/* =========================
 * ダメージ
 * ========================= */

function DamageGroupTable({
  group,
}: {
  group: DamageGroup;
}) {
  return (
    <div className="border-b border-gray-700">
      <div className="bg-[#292e39] px-3 py-2 text-sm font-bold">
        {group.name}
      </div>

      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-gray-700 bg-[#1a1e26] text-xs text-gray-400">
            <th className="w-[34%] px-2 py-2 text-left">
              攻撃
            </th>

            <th className="w-[17%] px-2 py-2 text-right">
              期待値
            </th>

            <th className="w-[17%] px-2 py-2 text-right">
              会心
            </th>

            <th className="w-[17%] px-2 py-2 text-right">
              非会心
            </th>

            <th className="w-[15%] px-2 py-2 text-right">
              基準比
            </th>
          </tr>
        </thead>

        <tbody>
          {group.rows.map(
            (
              row
            ) => (
              <tr
                key={
                  row.id
                }
                className={`border-b border-gray-800 ${
                  row.reaction
                    ? "bg-blue-950/20"
                    : "bg-[#11141a]"
                }`}
              >
                <td className="truncate px-2 py-2 text-sm text-gray-300">
                  {
                    row.label
                  }
                </td>

                <DamageNumber
                  value={
                    row.expected
                  }
                  strong
                />

                <DamageNumber
                  value={
                    row.crit
                  }
                />

                <DamageNumber
                  value={
                    row.nonCrit
                  }
                />

                <ComparisonCell
                  current={
                    row.expected
                  }
                  baseline={
                    row.baselineExpected
                  }
                />
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

function DamageNumber({
  value,
  strong = false,
}: {
  value: number;
  strong?: boolean;
}) {
  return (
    <td
      className={`whitespace-nowrap px-2 py-2 text-right tabular-nums ${
        strong
          ? "text-lg font-bold text-white"
          : "text-base font-semibold text-gray-300"
      }`}
    >
      {Math.round(
        value
      ).toLocaleString()}
    </td>
  );
}

function ComparisonCell({
  current,
  baseline,
}: {
  current: number;
  baseline?: number;
}) {
  if (
    baseline === undefined ||
    baseline === 0
  ) {
    return (
      <td className="whitespace-nowrap px-2 py-2 text-right text-sm text-gray-600">
        —
      </td>
    );
  }

  const change =
    (
      current /
      baseline -
      1
    ) *
    100;

  const display =
    `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;

  const className =
    Math.abs(change) < 0.005
      ? "text-gray-400"
      : change > 0
      ? "text-emerald-400"
      : "text-red-400";

  return (
    <td
      className={`whitespace-nowrap px-2 py-2 text-right text-sm font-bold tabular-nums ${className}`}
      title={`基準: ${Math.round(
        baseline
      ).toLocaleString()}`}
    >
      {display}
    </td>
  );
}

/* =========================
 * 共通UI
 * ========================= */

function CalcSection({
  title,
  children,
  open = false,
}: {
  title: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details
      open={
        open
      }
      className="border border-gray-700 bg-[#171a21]"
    >
      <summary className="cursor-pointer bg-[#252a34] px-3 py-2 font-bold">
        {title}
      </summary>

      <div className="space-y-3 p-3">
        {children}
      </div>
    </details>
  );
}

function SelectionCard({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className="flex min-h-[82px] w-full items-center gap-3 border border-gray-700 bg-[#11141a] p-2 text-left hover:bg-[#191d25]"
    >
      {children}
    </button>
  );
}

function CompactInput({
  label,
  value,
  setValue,
  step = "1",
}: {
  label: string;
  value: number;
  setValue: (
    value: number
  ) => void;
  step?: string;
}) {
  return (
    <label>
      <div className="mb-1 text-xs text-gray-400">
        {label}
      </div>

      <input
        type="number"
        value={
          value
        }
        step={
          step
        }
        onChange={(e) =>
          setValue(
            Number(
              e.target.value
            )
          )
        }
        className="w-full border border-gray-700 bg-[#0b0d12] px-2 py-2 outline-none"
      />
    </label>
  );
}

function OptionBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-gray-700 bg-[#11141a] p-3">
      <div className="mb-2 border-b border-gray-800 pb-2 text-sm font-bold">
        {title}
      </div>

      {children}
    </div>
  );
}

function CheckOption({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (
    checked: boolean
  ) => void;
  title: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer gap-2">
      <input
        type="checkbox"
        checked={
          checked
        }
        onChange={(e) =>
          onChange(
            e.target.checked
          )
        }
      />

      <div>
        <div className="text-sm">
          {title}
        </div>

        {description && (
          <div className="text-xs text-gray-500">
            {
              description
            }
          </div>
        )}
      </div>
    </label>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (
    checked: boolean
  ) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={
          checked
        }
        onChange={(e) =>
          onChange(
            e.target.checked
          )
        }
      />

      {label}
    </label>
  );
}

function MutedText({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="text-xs text-gray-500">
      {children}
    </div>
  );
}

function DetailBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-gray-700 bg-[#11141a] p-3 text-sm">
      <div className="mb-2 font-bold">
        {title}
      </div>

      <div className="leading-7 text-gray-300">
        {children}
      </div>
    </div>
  );
}

function PickerModal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onMouseDown={
        onClose
      }
    >
      <div
        className="flex max-h-[92vh] w-full max-w-6xl flex-col border border-gray-700 bg-[#171a21]"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <div className="flex items-center justify-between border-b border-gray-700 bg-[#252a34] px-4 py-3">
          <h2 className="font-bold">
            {title}
          </h2>

          <button
            type="button"
            onClick={
              onClose
            }
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}