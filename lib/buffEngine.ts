import type {
  BuffContext,
  BuffDefinition,
  BuffSourceEntry,
  BuffTarget,
} from "./buffTypes";

import {
  BUFF_DATA,
} from "./buffData";

export type BuffResult = {
  hpPercent: number;
  hpFlat: number;

  attackPercent: number;
  attackFlat: number;

  defensePercent: number;
  defenseFlat: number;

  elementalMastery: number;
  energyRecharge: number;

  critRate: number;
  critDamage: number;

  damageBonus: number;

  normalDamageBonus: number;
  chargedDamageBonus: number;
  plungeDamageBonus: number;
  skillDamageBonus: number;
  burstDamageBonus: number;

  pyroDamageBonus: number;
  hydroDamageBonus: number;
  electroDamageBonus: number;
  cryoDamageBonus: number;
  anemoDamageBonus: number;
  geoDamageBonus: number;
  dendroDamageBonus: number;
  physicalDamageBonus: number;

  vaporizeBonus: number;
  meltBonus: number;
  electroChargedBonus: number;
  superconductBonus: number;
  bloomBonus: number;
  hyperbloomBonus: number;
  burgeonBonus: number;

  lunarElectroChargedBonus: number;
  lunarBloomBonus: number;
  lunarCrystallizeBonus: number;

  starConductionBonus: number;
  starSwirlBonus: number;

  pyroResistanceShred: number;
  hydroResistanceShred: number;
  electroResistanceShred: number;
  cryoResistanceShred: number;
  anemoResistanceShred: number;
  geoResistanceShred: number;
  dendroResistanceShred: number;
  physicalResistanceShred: number;

  starConductionBaseBonus: number;
  starSwirlBaseBonus: number;

  notes: string[];
};

export type BuffCategory =
  | "characters"
  | "weapons"
  | "artifacts";

export function createEmptyBuffResult(): BuffResult {
  return {
    hpPercent: 0,
    hpFlat: 0,

    attackPercent: 0,
    attackFlat: 0,

    defensePercent: 0,
    defenseFlat: 0,

    elementalMastery: 0,
    energyRecharge: 0,

    critRate: 0,
    critDamage: 0,

    damageBonus: 0,

    normalDamageBonus: 0,
    chargedDamageBonus: 0,
    plungeDamageBonus: 0,
    skillDamageBonus: 0,
    burstDamageBonus: 0,

    pyroDamageBonus: 0,
    hydroDamageBonus: 0,
    electroDamageBonus: 0,
    cryoDamageBonus: 0,
    anemoDamageBonus: 0,
    geoDamageBonus: 0,
    dendroDamageBonus: 0,
    physicalDamageBonus: 0,

    vaporizeBonus: 0,
    meltBonus: 0,
    electroChargedBonus: 0,
    superconductBonus: 0,
    bloomBonus: 0,
    hyperbloomBonus: 0,
    burgeonBonus: 0,

    lunarElectroChargedBonus: 0,
    lunarBloomBonus: 0,
    lunarCrystallizeBonus: 0,

    starConductionBonus: 0,
    starSwirlBonus: 0,

    pyroResistanceShred: 0,
    hydroResistanceShred: 0,
    electroResistanceShred: 0,
    cryoResistanceShred: 0,
    anemoResistanceShred: 0,
    geoResistanceShred: 0,
    dendroResistanceShred: 0,
    physicalResistanceShred: 0,

    starConductionBaseBonus: 0,
    starSwirlBaseBonus: 0,

    notes: [],
  };
}

function getSimpleAmount(
  buff: BuffDefinition,
  refinement: number
) {
  if (
    typeof buff.amount ===
    "number"
  ) {
    return buff.amount;
  }

  if (
    Array.isArray(
      buff.amount
    )
  ) {
    if (
      buff.amount.length ===
      0
    ) {
      return null;
    }

    const index =
      Math.max(
        0,
        Math.min(
          buff.amount.length - 1,
          refinement - 1
        )
      );

    const value =
      buff.amount[index];

    return typeof value ===
      "number"
      ? value
      : null;
  }

  if (
    typeof buff.amount ===
    "string"
  ) {
    const parsed =
      Number(
        buff.amount
      );

    return Number.isFinite(
      parsed
    )
      ? parsed
      : null;
  }

  return null;
}

function matchesTrigger(
  triggerType: string | undefined,
  context: BuffContext
) {
  if (!triggerType) {
    return true;
  }

  return (
    context.activeTriggers?.includes(
      triggerType
    ) ?? false
  );
}

function matchesConditions(
  conditions:
    | string[]
    | undefined,
  context: BuffContext
) {
  if (
    !conditions ||
    conditions.length ===
      0
  ) {
    return true;
  }

  const active =
    context.activeConditions ??
    [];

  return conditions.every(
    (condition) =>
      active.includes(
        condition
      )
  );
}

function matchesTarget(
  target:
    | BuffTarget
    | undefined,
  context: BuffContext
) {
  if (!target) {
    return true;
  }

  if (
    !context.allowedTargets ||
    context.allowedTargets.length ===
      0
  ) {
    return true;
  }

  return context.allowedTargets.includes(
    target
  );
}

/*
 * =========================
 * 既知データ補正
 * =========================
 *
 * buffData.ts は非常に便利だが、現時点では
 * 一部聖遺物で「2セット/4セット」の区別や、
 * テキスト上の条件が十分に構造化されていない。
 *
 * ここではその不足分だけを小さく補う。
 * 将来 buffData 側に piece_count 等を追加できたら、
 * この関数は順次削除できる。
 */
function matchesKnownSourceRule(
  category: BuffCategory,
  sourceName: string,
  buff: BuffDefinition,
  context: BuffContext
) {
  if (
    category !==
    "artifacts"
  ) {
    return true;
  }

  /*
   * 影に沈む幻
   *
   * ATK+18% = 2セット
   * その他 = 4セット
   * CR+16% = 対象が超電導/星電導の影響中のみ
   */
  if (
    sourceName ===
    "影に沈む幻"
  ) {
    if (
      buff.stat ===
      "攻撃力%"
    ) {
      return true;
    }

    if (
      context.fourPieceEnabled ===
      false
    ) {
      return false;
    }

    if (
      buff.stat ===
      "会心率"
    ) {
      return Boolean(
        context
          .targetAffectedBySuperconductOrStarConduction
      );
    }

    return true;
  }

  /*
   * まだ2/4セット情報を完全に持っていない聖遺物については、
   * fourPieceEnabled=false の時に無理に4セット判定を推測しない。
   *
   * ここでは buffData の元データをそのまま使う。
   */
  return true;
}

function isBuffActive(
  category: BuffCategory,
  sourceName: string,
  buff: BuffDefinition,
  context: BuffContext
) {
  if (
    !matchesKnownSourceRule(
      category,
      sourceName,
      buff,
      context
    )
  ) {
    return false;
  }

  if (
    !matchesTarget(
      buff.target,
      context
    )
  ) {
    return false;
  }

  if (
    buff.trigger &&
    !matchesTrigger(
      buff.trigger.type,
      context
    )
  ) {
    return false;
  }

  if (
    buff.triggers_any &&
    buff.triggers_any.length >
      0
  ) {
    const anyActive =
      buff.triggers_any.some(
        (trigger) =>
          matchesTrigger(
            trigger.type,
            context
          )
      );

    if (!anyActive) {
      return false;
    }
  }

  if (
    buff.triggers_all &&
    buff.triggers_all.length >
      0
  ) {
    const allActive =
      buff.triggers_all.every(
        (trigger) =>
          matchesTrigger(
            trigger.type,
            context
          )
      );

    if (!allActive) {
      return false;
    }
  }

  if (
    !matchesConditions(
      buff.conditions,
      context
    )
  ) {
    return false;
  }

  if (
    !matchesConditions(
      buff.target_conditions,
      context
    )
  ) {
    return false;
  }

  return true;
}

function getStackMultiplier(
  buff: BuffDefinition,
  context: BuffContext
) {
  if (
    !buff.max_stacks ||
    buff.max_stacks <= 1
  ) {
    return 1;
  }

  const requested =
    context.stackCount ??
    0;

  return Math.max(
    0,
    Math.min(
      buff.max_stacks,
      requested
    )
  );
}

function applySimpleBuff(
  result: BuffResult,
  buff: BuffDefinition,
  refinement: number,
  context: BuffContext
) {
  const amount =
    getSimpleAmount(
      buff,
      refinement
    );

  if (
    amount === null
  ) {
    if (
      buff.amount_formula
    ) {
      result.notes.push(
        `未処理の計算式: ${buff.stat} = ${buff.amount_formula}`
      );
    }

    return;
  }

  const finalAmount =
    amount *
    getStackMultiplier(
      buff,
      context
    );

  switch (
    buff.stat
  ) {
    case "HP%":
    case "HP％":
      result.hpPercent +=
        finalAmount;
      break;

    case "HP":
      result.hpFlat +=
        finalAmount;
      break;

    case "攻撃力%":
    case "攻撃力％":
      result.attackPercent +=
        finalAmount;
      break;

    case "攻撃力":
      result.attackFlat +=
        finalAmount;
      break;

    case "防御力%":
    case "防御力％":
      result.defensePercent +=
        finalAmount;
      break;

    case "防御力":
      result.defenseFlat +=
        finalAmount;
      break;

    case "元素熟知":
    case "熟知":
      result.elementalMastery +=
        finalAmount;
      break;

    case "元素チャージ効率":
    case "元素チャージ効率%":
    case "元素チャージ効率％":
    case "チャージ効率":
      result.energyRecharge +=
        finalAmount;
      break;

    case "会心率":
    case "会心率%":
    case "会心率％":
      result.critRate +=
        finalAmount;
      break;

    case "会心ダメージ":
    case "会心ダメージ%":
    case "会心ダメージ％":
    case "会心ダメ":
      result.critDamage +=
        finalAmount;
      break;

    case "与えるダメージ":
    case "ダメージバフ":
    case "ダメバフ":
      result.damageBonus +=
        finalAmount;
      break;

    case "通常攻撃ダメージ":
    case "通常バフ":
      result.normalDamageBonus +=
        finalAmount;
      break;

    case "重撃ダメージ":
    case "重撃バフ":
      result.chargedDamageBonus +=
        finalAmount;
      break;

    case "落下攻撃ダメージ":
    case "落下バフ":
      result.plungeDamageBonus +=
        finalAmount;
      break;

    case "元素スキルダメージ":
    case "スキルバフ":
      result.skillDamageBonus +=
        finalAmount;
      break;

    case "元素爆発ダメージ":
    case "爆発バフ":
      result.burstDamageBonus +=
        finalAmount;
      break;

    case "炎元素ダメージ":
      result.pyroDamageBonus +=
        finalAmount;
      break;

    case "水元素ダメージ":
      result.hydroDamageBonus +=
        finalAmount;
      break;

    case "雷元素ダメージ":
      result.electroDamageBonus +=
        finalAmount;
      break;

    case "氷元素ダメージ":
      result.cryoDamageBonus +=
        finalAmount;
      break;

    case "風元素ダメージ":
      result.anemoDamageBonus +=
        finalAmount;
      break;

    case "岩元素ダメージ":
      result.geoDamageBonus +=
        finalAmount;
      break;

    case "草元素ダメージ":
      result.dendroDamageBonus +=
        finalAmount;
      break;

    case "物理ダメージ":
      result.physicalDamageBonus +=
        finalAmount;
      break;

    case "蒸発反応ダメージ":
      result.vaporizeBonus +=
        finalAmount;
      break;

    case "溶解反応ダメージ":
      result.meltBonus +=
        finalAmount;
      break;

    case "感電反応ダメージ":
      result.electroChargedBonus +=
        finalAmount;
      break;

    case "超電導反応ダメージ":
    case "超電導バフ":
      result.superconductBonus +=
        finalAmount;
      break;

    case "開花反応ダメージ":
      result.bloomBonus +=
        finalAmount;
      break;

    case "超開花反応ダメージ":
      result.hyperbloomBonus +=
        finalAmount;
      break;

    case "烈開花反応ダメージ":
      result.burgeonBonus +=
        finalAmount;
      break;

    case "月感電反応ダメージ":
      result.lunarElectroChargedBonus +=
        finalAmount;
      break;

    case "月開花反応ダメージ":
      result.lunarBloomBonus +=
        finalAmount;
      break;

    case "月結晶反応ダメージ":
      result.lunarCrystallizeBonus +=
        finalAmount;
      break;

    case "星電導反応ダメージ":
    case "星電導バフ":
      result.starConductionBonus +=
        finalAmount;
      break;

    case "星拡散反応ダメージ":
    case "星拡散バフ":
      result.starSwirlBonus +=
        finalAmount;
      break;

    case "炎元素耐性ダウン":
      result.pyroResistanceShred +=
        finalAmount;
      break;

    case "水元素耐性ダウン":
      result.hydroResistanceShred +=
        finalAmount;
      break;

    case "雷元素耐性ダウン":
      result.electroResistanceShred +=
        finalAmount;
      break;

    case "氷元素耐性ダウン":
      result.cryoResistanceShred +=
        finalAmount;
      break;

    case "風元素耐性ダウン":
      result.anemoResistanceShred +=
        finalAmount;
      break;

    case "岩元素耐性ダウン":
      result.geoResistanceShred +=
        finalAmount;
      break;

    case "草元素耐性ダウン":
      result.dendroResistanceShred +=
        finalAmount;
      break;

    case "物理耐性ダウン":
      result.physicalResistanceShred +=
        finalAmount;
      break;

    case "星電導基礎ダメージ":
      result.starConductionBaseBonus +=
        finalAmount;
      break;

    case "星拡散基礎ダメージ":
      result.starSwirlBaseBonus +=
        finalAmount;
      break;

    default:
      result.notes.push(
        `未対応stat: ${buff.stat}`
      );
      break;
  }
}

export function evaluateBuffSource(
  source: BuffSourceEntry,
  refinement = 1,
  context: BuffContext = {},
  category: BuffCategory =
    "characters"
) {
  const result =
    createEmptyBuffResult();

  source.buffs.forEach(
    (buff) => {
      if (
        !isBuffActive(
          category,
          source.name,
          buff,
          context
        )
      ) {
        return;
      }

      applySimpleBuff(
        result,
        buff,
        refinement,
        context
      );
    }
  );

  return result;
}

export function findBuffSource(
  category: BuffCategory,
  name: string
) {
  return (
    BUFF_DATA[
      category
    ].find(
      (item) =>
        item.name ===
        name
    ) ?? null
  );
}


/*
 * =========================
 * 構造化不足を補う聖遺物ルール
 * =========================
 *
 * 現在のbuffDataでは、一部聖遺物について
 * 2セット/4セットの区別や条件が完全には分離されていない。
 *
 * そのため、正確に扱えるまでの間は
 * 「データ本体はbuffData、足りない構造だけここで補う」
 * という方針にする。
 *
 * UIやpage.tsx側へ聖遺物固有の数値を散らさないため、
 * 例外はここへ集約する。
 */
function evaluateKnownArtifactSet(
  name: string,
  context: BuffContext
): BuffResult | null {
  const result =
    createEmptyBuffResult();

  switch (name) {
    case "影に沈む幻": {
      // 2セット
      result.attackPercent +=
        0.18;

      if (
        !context.fourPieceEnabled
      ) {
        return result;
      }

      // 4セット
      result.superconductBonus +=
        0.8;

      result.starConductionBonus +=
        0.4;

      if (
        context
          .targetAffectedBySuperconductOrStarConduction
      ) {
        result.critRate +=
          0.16;
      }

      return result;
    }

    case "ファントムハンター": {
      // 2セット
      result.normalDamageBonus +=
        0.15;

      result.chargedDamageBonus +=
        0.15;

      if (
        !context.fourPieceEnabled
      ) {
        return result;
      }

      const stacks =
        Math.max(
          0,
          Math.min(
            3,
            context.stackCount ??
              0
          )
        );

      result.critRate +=
        0.12 * stacks;

      return result;
    }

    case "黄金の劇団": {
      // 2セット
      result.skillDamageBonus +=
        0.20;

      if (
        !context.fourPieceEnabled
      ) {
        return result;
      }

      // 4セット基本
      result.skillDamageBonus +=
        0.25;

      // 待機中の追加分
      if (
        context.goldenTroupeOffField ||
        context.sourceOffField
      ) {
        result.skillDamageBonus +=
          0.25;
      }

      return result;
    }

    case "黒曜の秘典": {
      // 2セット
      if (
        context.nightsoulBlessing &&
        context.sourceOnField !==
          false
      ) {
        result.damageBonus +=
          0.15;
      }

      if (
        !context.fourPieceEnabled
      ) {
        return result;
      }

      // 4セット
      if (
        context.obsidianCritActive
      ) {
        result.critRate +=
          0.40;
      }

      return result;
    }

    case "千岩牢固": {
      // 2セット
      result.hpPercent +=
        0.20;

      if (
        !context.fourPieceEnabled
      ) {
        return result;
      }

      // 現在の計算UIではシールド強化はダメージ計算対象外。
      if (
        context.millelithBuffActive
      ) {
        result.attackPercent +=
          0.20;
      }

      return result;
    }

    case "旧貴族のしつけ": {
      // 2セット
      result.burstDamageBonus +=
        0.20;

      if (
        !context.fourPieceEnabled
      ) {
        return result;
      }

      if (
        context.noblesseBuffActive
      ) {
        result.attackPercent +=
          0.20;
      }

      return result;
    }

    default:
      return null;
  }
}

export function evaluateBuffByName(
  category: BuffCategory,
  name: string,
  refinement = 1,
  context: BuffContext = {}
) {
  if (
    category ===
    "artifacts"
  ) {
    const knownArtifact =
      evaluateKnownArtifactSet(
        name,
        context
      );

    if (knownArtifact) {
      return knownArtifact;
    }
  }

  const source =
    findBuffSource(
      category,
      name
    );

  if (!source) {
    const result =
      createEmptyBuffResult();

    result.notes.push(
      `buffDataに未登録: ${category}/${name}`
    );

    return result;
  }

  return evaluateBuffSource(
    source,
    refinement,
    context,
    category
  );
}
