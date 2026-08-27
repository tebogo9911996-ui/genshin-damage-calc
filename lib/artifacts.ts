/*
 * =========================================================
 * 聖遺物データ
 * =========================================================
 *
 * Nanokaの聖遺物データを元に、
 * 一覧・アイコン・2セット/4セット説明・
 * ダメージ計算用の効果を管理する。
 */

export type ArtifactSet = {
  id: number;
  name: string;
  enName?: string;
  icon?: string;
  rank?: number[];
  twoPiece: string;
  fourPiece: string;
};

export type ArtifactEffectResult = {
  hpPercent: number;
  attackPercent: number;
  defensePercent: number;
  elementalMastery: number;
  energyRecharge: number;
  critRate: number;
  critDamage: number;

  genericDamageBonus: number;

  pyroDamageBonus: number;
  hydroDamageBonus: number;
  electroDamageBonus: number;
  cryoDamageBonus: number;
  anemoDamageBonus: number;
  geoDamageBonus: number;
  dendroDamageBonus: number;
  physicalDamageBonus: number;

  normalAttackDamageBonus: number;
  chargedAttackDamageBonus: number;
  plungeAttackDamageBonus: number;
  skillDamageBonus: number;
  burstDamageBonus: number;

  vaporizeReactionBonus: number;
  meltReactionBonus: number;
  overloadReactionBonus: number;
  electroChargedReactionBonus: number;
  superconductReactionBonus: number;
  bloomReactionBonus: number;
  hyperbloomReactionBonus: number;
  burgeonReactionBonus: number;
  burningReactionBonus: number;
  swirlReactionBonus: number;
  aggravateReactionBonus: number;
  spreadReactionBonus: number;

  lunarReactionBonus: number;
  starConductionReactionBonus: number;
  starSwirlReactionBonus: number;
  starReactionBonus: number;

  resistanceShred: {
    pyro: number;
    hydro: number;
    electro: number;
    cryo: number;
    anemo: number;
    geo: number;
    dendro: number;
    physical: number;
  };

  notes: string[];
};

export function createEmptyArtifactEffect(): ArtifactEffectResult {
  return {
    hpPercent: 0,
    attackPercent: 0,
    defensePercent: 0,
    elementalMastery: 0,
    energyRecharge: 0,
    critRate: 0,
    critDamage: 0,

    genericDamageBonus: 0,

    pyroDamageBonus: 0,
    hydroDamageBonus: 0,
    electroDamageBonus: 0,
    cryoDamageBonus: 0,
    anemoDamageBonus: 0,
    geoDamageBonus: 0,
    dendroDamageBonus: 0,
    physicalDamageBonus: 0,

    normalAttackDamageBonus: 0,
    chargedAttackDamageBonus: 0,
    plungeAttackDamageBonus: 0,
    skillDamageBonus: 0,
    burstDamageBonus: 0,

    vaporizeReactionBonus: 0,
    meltReactionBonus: 0,
    overloadReactionBonus: 0,
    electroChargedReactionBonus: 0,
    superconductReactionBonus: 0,
    bloomReactionBonus: 0,
    hyperbloomReactionBonus: 0,
    burgeonReactionBonus: 0,
    burningReactionBonus: 0,
    swirlReactionBonus: 0,
    aggravateReactionBonus: 0,
    spreadReactionBonus: 0,

    lunarReactionBonus: 0,
    starConductionReactionBonus: 0,
    starSwirlReactionBonus: 0,
    starReactionBonus: 0,

    resistanceShred: {
      pyro: 0,
      hydro: 0,
      electro: 0,
      cryo: 0,
      anemo: 0,
      geo: 0,
      dendro: 0,
      physical: 0,
    },

    notes: [],
  };
}

/*
 * =========================================================
 * 全聖遺物セット
 * =========================================================
 */

export const ARTIFACT_SETS: ArtifactSet[] = [
  {
    id: 10001,
    name: "旅人の心",
    enName: "Resolution of Sojourner",
    icon: "UI_RelicIcon_10001_4",
    rank: [1, 2, 3, 4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "重撃の会心率+30%。",
  },
  {
    id: 10002,
    name: "勇士の心",
    enName: "Brave Heart",
    icon: "UI_RelicIcon_10002_4",
    rank: [1, 2, 3, 4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "HPが50%以上の敵に対するダメージ+30%。",
  },
  {
    id: 10003,
    name: "守護の心",
    enName: "Defender's Will",
    icon: "UI_RelicIcon_10003_4",
    rank: [1, 2, 3, 4, 5],
    twoPiece: "防御力+30%。",
    fourPiece: "チーム内の自身のキャラクターの元素タイプ1種類につき、自身にその元素の耐性+30%。",
  },
  {
    id: 10004,
    name: "奇跡",
    enName: "Tiny Miracle",
    icon: "UI_RelicIcon_10004_4",
    rank: [1, 2, 3, 4, 5],
    twoPiece: "全ての元素耐性+20%。",
    fourPiece: "元素ダメージを受けると、その元素の耐性+30%、継続時間10秒。10秒毎に1回のみ発動可能。",
  },
  {
    id: 10005,
    name: "狂戦士",
    enName: "Berserker",
    icon: "UI_RelicIcon_10005_4",
    rank: [1, 2, 3, 4, 5],
    twoPiece: "会心率+12%。",
    fourPiece: "HPが70%以下になると、会心率+24%。",
  },
  {
    id: 10006,
    name: "武人",
    enName: "Martial Artist",
    icon: "UI_RelicIcon_10006_4",
    rank: [1, 2, 3, 4, 5],
    twoPiece: "通常攻撃と重擊ダメージ+15%。",
    fourPiece: "元素スキル発動後、通常攻撃と重撃ダメージ+25%、継続時間8秒。",
  },
  {
    id: 10007,
    name: "教官",
    enName: "Instructor",
    icon: "UI_RelicIcon_10007_4",
    rank: [1, 2, 3, 4, 5],
    twoPiece: "元素熟知+80。",
    fourPiece: "元素反応を引き起こした後、チーム全員の元素熟知+120、継続時間8秒。",
  },
  {
    id: 10008,
    name: "博徒",
    enName: "Gambler",
    icon: "UI_RelicIcon_10008_4",
    rank: [2, 3, 4, 5],
    twoPiece: "元素スキルのダメージ+20%。",
    fourPiece: "敵を倒した時、100%の確率で元素スキルのクールタイムをリセットする。15秒に1回のみ発動可能。",
  },
  {
    id: 10009,
    name: "亡命者",
    enName: "The Exile",
    icon: "UI_RelicIcon_10009_4",
    rank: [1, 2, 3, 4, 5],
    twoPiece: "元素チャージ効率+20%。",
    fourPiece: "元素爆発を発動すると、2秒毎にチーム全員（自分を除く）の元素エネルギーを2回復する、継続時間6秒。重ね掛け不可。",
  },
  {
    id: 10010,
    name: "冒険者",
    enName: "Adventurer",
    icon: "UI_RelicIcon_10010_4",
    rank: [1, 2, 3, 4],
    twoPiece: "HP上限+1000。",
    fourPiece: "宝箱を開けた後5秒間、HPの30%を徐々に回復する。",
  },
  {
    id: 10011,
    name: "幸運",
    enName: "Lucky Dog",
    icon: "UI_RelicIcon_10011_4",
    rank: [1, 2, 3, 4],
    twoPiece: "防御力+100。",
    fourPiece: "モラを拾得すると、HPを300回復する。",
  },
  {
    id: 10012,
    name: "学者",
    enName: "Scholar",
    icon: "UI_RelicIcon_10012_4",
    rank: [1, 2, 3, 4, 5],
    twoPiece: "元素チャージ効率+20%。",
    fourPiece: "元素オーブまたは元素粒子を獲得した時、チーム内全ての弓と法器キャラの元素エネルギーが3回復する。3秒毎に1回のみ発動可能。",
  },
  {
    id: 10013,
    name: "医者",
    enName: "Traveling Doctor",
    icon: "UI_RelicIcon_10013_4",
    rank: [1, 2, 3, 4],
    twoPiece: "受ける治療効果+20%。",
    fourPiece: "元素爆発を発動すると、HPを20%回復する。",
  },
  {
    id: 14001,
    name: "氷風を彷徨う勇士",
    enName: "Blizzard Strayer",
    icon: "UI_RelicIcon_14001_4",
    rank: [3, 4, 5],
    twoPiece: "氷元素ダメージ+15%。",
    fourPiece: "氷元素の影響を受けている敵を攻撃した場合、会心率+20%。敵が凍結状態の場合、会心率は更に+20%。",
  },
  {
    id: 14002,
    name: "雷を鎮める尊者",
    enName: "Thundersoother",
    icon: "UI_RelicIcon_14002_4",
    rank: [3, 4, 5],
    twoPiece: "雷元素耐性+40%。",
    fourPiece: "雷元素の影響を受けた敵に対するダメージ+35%。",
  },
  {
    id: 14003,
    name: "烈火を渡る賢者",
    enName: "Lavawalker",
    icon: "UI_RelicIcon_14003_4",
    rank: [3, 4, 5],
    twoPiece: "炎元素耐性+40%。",
    fourPiece: "炎元素の影響を受けた敵に対するダメージ+35%。",
  },
  {
    id: 14004,
    name: "愛される少女",
    enName: "Maiden Beloved",
    icon: "UI_RelicIcon_14004_4",
    rank: [3, 4, 5],
    twoPiece: "与える治療効果+15%。",
    fourPiece: "元素スキルまたは元素爆発を発動した後10秒間、チーム全員の受ける治療効果+20%。",
  },
  {
    id: 15001,
    name: "剣闘士のフィナーレ",
    enName: "Gladiator's Finale",
    icon: "UI_RelicIcon_15001_4",
    rank: [3, 4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "該当聖遺物セットを装備したキャラが片手剣、両手剣、長柄武器キャラの場合、通常攻撃ダメージ+35%。",
  },
  {
    id: 15002,
    name: "翠緑の影",
    enName: "Viridescent Venerer",
    icon: "UI_RelicIcon_15002_4",
    rank: [3, 4, 5],
    twoPiece: "風元素ダメージ+15%。",
    fourPiece: "拡散反応によるダメージ+60%、星拡散反応によるダメージ+20%。拡散された元素タイプに応じて、影響を受けた敵の当該元素耐性-40%。継続時間10秒。敵に対して星拡散反応を起こした時も、その氷元素耐性-40%。同じ元素タイプの耐性ダウン効果は重ね掛けできない。",
  },
  {
    id: 15003,
    name: "大地を流浪する楽団",
    enName: "Wanderer's Troupe",
    icon: "UI_RelicIcon_15003_4",
    rank: [3, 4, 5],
    twoPiece: "元素熟知+80。",
    fourPiece: "該当聖遺物セットを装備したキャラが法器、弓キャラの場合、キャラの重撃ダメージ+35%。",
  },
  {
    id: 15004,
    name: "氷の川と雪の砂",
    enName: "Glacier and Snowfield",
    icon: "UI_RelicIcon_15004_4",
    rank: [3, 4, 5],
    twoPiece: "氷元素ダメージ+15%。",
    fourPiece: "超電導反応ダメージ+100%、溶解反応の加算効果+15%。元素爆発を発動した10秒間、氷元素ダメージ+30%。",
  },
  {
    id: 15005,
    name: "雷のような怒り",
    enName: "Thundering Fury",
    icon: "UI_RelicIcon_15005_4",
    rank: [3, 4, 5],
    twoPiece: "雷元素ダメージ+15%。",
    fourPiece: "過負荷、感電、超電導、超開花反応によるダメージ+40%、超激化反応によるダメージアップ効果+20%、月感電、星電導反応によるダメージ+20%。上記元素反応または原激化反応を起こすと、元素スキルのクールタイム-1秒。0.8秒毎に最大1回のみ発動可能。",
  },
  {
    id: 15006,
    name: "燃え盛る炎の魔女",
    enName: "Crimson Witch of Flames",
    icon: "UI_RelicIcon_15006_4",
    rank: [3, 4, 5],
    twoPiece: "炎元素ダメージ+15%。",
    fourPiece: "過負荷、燃焼、烈開花反応によるダメージ+40%。蒸発、溶解反応による加算効果+15%。元素スキルを発動した10秒間、2セットの効果が50%アップし、最大3重まで。",
  },
  {
    id: 15007,
    name: "旧貴族のしつけ",
    enName: "Noblesse Oblige",
    icon: "UI_RelicIcon_15007_4",
    rank: [3, 4, 5],
    twoPiece: "元素爆発のダメージ+20%。",
    fourPiece: "元素爆発を発動すると、チーム全員の攻撃力+20%、継続時間12秒、重ねがけ不可。",
  },
  {
    id: 15008,
    name: "血染めの騎士道",
    enName: "Bloodstained Chivalry",
    icon: "UI_RelicIcon_15008_4",
    rank: [3, 4, 5],
    twoPiece: "物理ダメージ+25%。",
    fourPiece: "敵を倒した後の10秒間、重撃の際にスタミナを消費しない。また、重撃のダメージ+50%。",
  },
  {
    id: 15009,
    name: "火祭りの人",
    enName: "Prayers for Illumination",
    icon: "UI_RelicIcon_15009_3",
    rank: [3, 4, 5],
    twoPiece: "受けた炎元素付着の効果継続時間-40%。",
    fourPiece: "",
  },
  {
    id: 15010,
    name: "水祭りの人",
    enName: "Prayers for Destiny",
    icon: "UI_RelicIcon_15010_3",
    rank: [3, 4, 5],
    twoPiece: "受けた水元素付着の効果継続時間-40%。",
    fourPiece: "",
  },
  {
    id: 15011,
    name: "雷祭りの人",
    enName: "Prayers for Wisdom",
    icon: "UI_RelicIcon_15011_3",
    rank: [3, 4, 5],
    twoPiece: "受けた雷元素付着の効果継続時間-40%。",
    fourPiece: "",
  },
  {
    id: 15012,
    name: "風祭りの人",
    enName: "Prayers to the Firmament",
    icon: "UI_RelicIcon_15012_3",
    rank: [3, 4, 5],
    twoPiece: "受けた風元素付着の効果継続時間-40%。",
    fourPiece: "",
  },
  {
    id: 15013,
    name: "氷祭りの人",
    enName: "Prayers to Springtime",
    icon: "UI_RelicIcon_15013_3",
    rank: [3, 4, 5],
    twoPiece: "受けた氷元素付着の効果継続時間-40%。",
    fourPiece: "",
  },
  {
    id: 15014,
    name: "悠久の磐岩",
    enName: "Archaic Petra",
    icon: "UI_RelicIcon_15014_4",
    rank: [3, 4, 5],
    twoPiece: "岩元素ダメージ+15%。",
    fourPiece: "結晶反応で形成された欠片を獲得、または月結晶反応を起こすと、チーム全員の該当元素ダメージ+35%、継続時間10秒。元素ダメージアップは1種類のみ獲得可能。",
  },
  {
    id: 15015,
    name: "逆飛びの流星",
    enName: "Retracing Bolide",
    icon: "UI_RelicIcon_15015_4",
    rank: [3, 4, 5],
    twoPiece: "シールド強化+35%",
    fourPiece: "シールド状態の時、通常攻撃と重撃ダメージ+40%。",
  },
  {
    id: 15016,
    name: "沈淪の心",
    enName: "Heart of Depth",
    icon: "UI_RelicIcon_15016_4",
    rank: [3, 4, 5],
    twoPiece: "水元素ダメージ+15%。",
    fourPiece: "元素スキルを発動した後の15秒間、通常攻撃と重撃のダメージ+30%。",
  },
  {
    id: 15017,
    name: "千岩牢固",
    enName: "Tenacity of the Millelith",
    icon: "UI_RelicIcon_15017_4",
    rank: [3, 4, 5],
    twoPiece: "HP+20%。",
    fourPiece: "元素スキルが敵に命中すると、周囲のチーム全員の攻撃力+20%、シールド強化+30%、持続時間3秒。この効果は0.5秒毎に1回のみ発動可能。この聖遺物セットを装備したキャラクターが待機している場合にも効果を発動できる。",
  },
  {
    id: 15018,
    name: "蒼白の炎",
    enName: "Pale Flame",
    icon: "UI_RelicIcon_15018_4",
    rank: [3, 4, 5],
    twoPiece: "物理ダメージ+25%。",
    fourPiece: "元素スキルが敵に命中すると、攻撃力+9%。持続時間7秒、最大2重まで、0.3秒毎に1回のみ発動可能。2重まで重ねると、2セットの効果が2倍になる。",
  },
  {
    id: 15019,
    name: "追憶のしめ縄",
    enName: "Shimenawa's Reminiscence",
    icon: "UI_RelicIcon_15019_4",
    rank: [4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "元素スキルを発動した時、キャラクターの元素エネルギーが15以上の場合、元素エネルギーを15消費し、次の10秒間通常攻撃、重撃、落下攻撃ダメージ+50%。継続時間中この効果は再発動できない。",
  },
  {
    id: 15020,
    name: "絶縁の旗印",
    enName: "Emblem of Severed Fate",
    icon: "UI_RelicIcon_15020_4",
    rank: [4, 5],
    twoPiece: "元素チャージ効率+20%。",
    fourPiece: "元素チャージ効率の25%を基準に、元素爆発ダメージがアップする。この方法でアップできるダメージは最大75%まで。",
  },
  {
    id: 15021,
    name: "華館夢醒形骸記",
    enName: "Husk of Opulent Dreams",
    icon: "UI_RelicIcon_15021_4",
    rank: [4, 5],
    twoPiece: "防御力+30%。",
    fourPiece: "この聖遺物セットを装備したキャラクターは、以下の状況において「問答」効果を獲得する。「問答」効果：フィールド上で岩元素攻撃を敵に命中した後に1層獲得、0.3秒毎に1層のみ獲得できる。待機中の時は、3秒毎に自動で1層獲得する。重ね掛けできる「問答」は最大4層までとなり、1層につき防御力+6%、岩元素ダメージ+6%。6秒毎に「問答」効果を獲得していない場合は、1層失う。",
  },
  {
    id: 15022,
    name: "海染硨磲",
    enName: "Ocean-Hued Clam",
    icon: "UI_RelicIcon_15022_4",
    rank: [4, 5],
    twoPiece: "与える治療効果+15%。",
    fourPiece: "この聖遺物セットを装備したキャラクターがチーム内のキャラクターに治療を行うと、治療によるHP回復量（HP上限を超えた回復量も含む）を記録する海染の泡を生成する。海染の泡は3秒継続する。継続時間終了時、海染の泡は破裂し、周囲の敵に記録した回復量の90%分のダメージを与える（このダメージは感電や超電導などの元素反応と同じように計算されるが、元素熟知、キャラクターLv、または元素反応のダメージアップ効果の影響は受けない）。海染の泡は3.5秒毎に1回のみ生成可能。海染の泡が記録できる回復量は最大30000までとなり、HP上限超過分の回復量を含む。自身のチーム内に、海染の泡は1つのみ存在可能。この聖遺物セットを装備したキャラクターは待機中でも、この効果を発動できる。",
  },
  {
    id: 15023,
    name: "辰砂往生録",
    enName: "Vermillion Hereafter",
    icon: "UI_RelicIcon_15023_4",
    rank: [4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "元素爆発を発動すると、継続時間16秒の「潜光」効果が発動する。「潜光」：攻撃力+8%、キャラクターがHPを失うたびに攻撃力がさらに10%アップする。HPの損失による攻撃力アップ効果は0.8秒毎に1回のみ発動でき、最大4回重ね掛けできる。「潜光」効果はキャラクターが戦闘不能、または退場する時に解除される。「潜光」効果の継続時間中に再び元素爆発を発動すると、既存の「潜光」効果が先にクリアされる。",
  },
  {
    id: 15024,
    name: "来歆の余響",
    enName: "Echoes of an Offering",
    icon: "UI_RelicIcon_15024_4",
    rank: [4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "通常攻撃が敵に命中すると、36%の確率で「幽谷祭祀」が発動する。「幽谷祭祀」：通常攻撃ダメージが攻撃力70%分アップする。この効果は通常攻撃でダメージを与えた0.05秒後にクリアされる。通常攻撃後に「幽谷祭祀」が発動しなかった場合、次回の発動確率+20%。発動判定は0.2秒毎に1回のみ行われる。",
  },
  {
    id: 15025,
    name: "深林の記憶",
    enName: "Deepwood Memories",
    icon: "UI_RelicIcon_15025_4",
    rank: [4, 5],
    twoPiece: "草元素ダメージ+15%。",
    fourPiece: "元素スキルまたは元素爆発が敵に命中すると、その敵の草元素耐性-30%、継続時間8秒。装備したキャラクターが待機している場合にも効果を発動できる。",
  },
  {
    id: 15026,
    name: "金メッキの夢",
    enName: "Gilded Dreams",
    icon: "UI_RelicIcon_15026_4",
    rank: [4, 5],
    twoPiece: "元素熟知+80。",
    fourPiece: "元素反応を起こした後の8秒間、装備キャラクターは、チーム内自身以外のキャラクターの元素タイプに応じて強化効果を獲得する。チームに装備キャラクターと同じ元素タイプのキャラクターが1名存在する毎に攻撃力+14%、異なる元素タイプのキャラクターが1名存在する毎に元素熟知+50。上記効果は、それぞれ最大でキャラクター3名までカウントされる。この効果は8秒毎に1回のみ発動可能。装備したキャラクターが待機している場合にも効果を発動できる。",
  },
  {
    id: 15027,
    name: "砂上の楼閣の史話",
    enName: "Desert Pavilion Chronicle",
    icon: "UI_RelicIcon_15027_4",
    rank: [4, 5],
    twoPiece: "風元素ダメージ+15%。",
    fourPiece: "重撃が敵に命中すると、該当キャラクターの通常攻撃の攻撃速度+10%、通常攻撃、重撃および落下攻撃ダメージ+40%、継続時間15秒。",
  },
  {
    id: 15028,
    name: "楽園の絶花",
    enName: "Flower of Paradise Lost",
    icon: "UI_RelicIcon_15028_4",
    rank: [4, 5],
    twoPiece: "元素熟知+80。",
    fourPiece: "開花、超開花、烈開花反応によるダメージ+40%、月開花反応によるダメージ+10%。また、装備者自身が開花、超開花、烈開花、または月開花を起こした後、上記強化効果が25%アップする。継続時間10秒、最大4層まで重ねられ、1秒毎に最大1回のみ発動可能。装備したキャラクターが待機している場合にも効果を発動できる。",
  },
  {
    id: 15029,
    name: "水仙の夢",
    enName: "Nymph's Dream",
    icon: "UI_RelicIcon_15029_4",
    rank: [4, 5],
    twoPiece: "水元素ダメージ+15%。",
    fourPiece: "通常攻撃、重撃、落下攻撃、元素スキル、または元素爆発が敵に命中すると、8秒間継続する「鏡中の水仙」効果を1層獲得する。1/2/3層以上の「鏡中の水仙」効果を持つ時、それぞれ攻撃力+7%/16%/25%、水元素ダメージ+4%/9%/15%。通常攻撃、重撃、落下攻撃、元素スキル、元素爆発による「鏡中の水仙」効果はそれぞれ独立してカウントされる。",
  },
  {
    id: 15030,
    name: "花海甘露の光",
    enName: "Vourukasha's Glow",
    icon: "UI_RelicIcon_15030_4",
    rank: [4, 5],
    twoPiece: "HP+20%。",
    fourPiece: "元素スキルと元素爆発のダメージ+10%。装備者がダメージを受けた後の5秒間、上記強化効果が80%アップする。最大5層まで重ね掛け可能。継続時間は層ごとに独立してカウントされる。装備したキャラクターが待機している場合にも効果を発動できる。",
  },
  {
    id: 15031,
    name: "ファントムハンター",
    enName: "Marechaussee Hunter",
    icon: "UI_RelicIcon_15031_4",
    rank: [4, 5],
    twoPiece: "通常攻撃と重擊ダメージ+15%。",
    fourPiece: "現在HPが増減する時、会心率+12%、継続時間5秒、最大3層まで重ね掛け可能。",
  },
  {
    id: 15032,
    name: "黄金の劇団",
    enName: "Golden Troupe",
    icon: "UI_RelicIcon_15032_4",
    rank: [4, 5],
    twoPiece: "元素スキルのダメージ+20%。",
    fourPiece: "元素スキルのダメージ+25%。また、装備者が待機中の時、元素スキルのダメージがさらに+25%。この効果は装備キャラクターが登場してから2秒後に解除される。",
  },
  {
    id: 15033,
    name: "在りし日の歌",
    enName: "Song of Days Past",
    icon: "UI_RelicIcon_15033_4",
    rank: [4, 5],
    twoPiece: "与える治療効果+15%。",
    fourPiece: "装備者がチームにいるキャラクターのHPを回復した時、継続時間6秒の「渇望」効果が発動し、HP回復量（HP上限を超えた回復量も含む）を記録する。継続時間終了時、「渇望」効果は「かの時の潮」効果に変化する。「かの時の潮」効果発動中、フィールド上にいるチーム内の自身キャラクターの通常攻撃、重撃、落下攻撃、元素スキル、元素爆発が敵に命中すると、「渇望」効果で記録した回復量の8%分を基に与えるダメージをアップする。「かの時の潮」効果は、5回発動、または10秒後にクリアされる。1回の「渇望」効果が記録する回復量は最大15000ポイントまで。なお、「渇望」は1つのみ存在でき、複数の装備者の与える回復量を記録可能。装備したキャラクターが待機している場合にも効果を発動できる。",
  },
  {
    id: 15034,
    name: "残響の森で囁かれる夜話",
    enName: "Nighttime Whispers in the Echoing Woods",
    icon: "UI_RelicIcon_15034_4",
    rank: [4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "元素スキルを発動した後の10秒間、岩元素ダメージ+20%。結晶反応によるシールド状態にある時、または周囲に月結晶反応で生成された月籠が存在する時、上記強化効果が150%アップする。追加された効果量は、条件を満たさなくなった1秒後に解除される。",
  },
  {
    id: 15035,
    name: "諧律奇想の断章",
    enName: "Fragment of Harmonic Whimsy",
    icon: "UI_RelicIcon_15035_4",
    rank: [4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "命の契約の数値が増減する時、キャラクターの与えるダメージ+18%、継続時間6秒、最大3層まで重ね掛け可能。",
  },
  {
    id: 15036,
    name: "遂げられなかった想い",
    enName: "Unfinished Reverie",
    icon: "UI_RelicIcon_15036_4",
    rank: [4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "戦闘状態が解除されてから3秒経過すると、与えるダメージ+50%。戦闘状態にある時、近くに燃焼状態の敵が存在しないまま6秒以上経過すると、上記強化効果の効果量は0%になるまで1秒毎に10%減少する。一方、燃焼状態の敵が存在する場合、50%になるまで1秒毎に10%増加する。この聖遺物セットを装備したキャラクターが待機している場合にも、効果を発動できる。",
  },
  {
    id: 15037,
    name: "灰燼の都に立つ英雄の絵巻",
    enName: "Scroll of the Hero of Cinder City",
    icon: "UI_RelicIcon_15037_4",
    rank: [4, 5],
    twoPiece: "付近にいるチーム内キャラクターが「夜魂バースト」を起こすと、装備者は元素エネルギーを6ポイント回復する。",
    fourPiece: "装備者が自身の元素タイプの関連元素反応を起こした後、周囲のチーム全員の、該当元素反応の関連元素タイプのダメージ+12%、継続時間15秒。この効果を発動した時に、装備者が「夜魂の加護」状態にあった場合、周囲チーム全員の前述の元素タイプのダメージがさらに+28%、継続時間20秒。装備者が待機中でも、上記効果を発動できる。同名の聖遺物セットによるダメージアップ効果は重ね掛け不可。",
  },
  {
    id: 15038,
    name: "黒曜の秘典",
    enName: "Obsidian Codex",
    icon: "UI_RelicIcon_15038_4",
    rank: [4, 5],
    twoPiece: "装備者が夜魂の加護状態にあり、かつフィールド上にいる時、与えるダメージ+15%。",
    fourPiece: "装備者がフィールド上で夜魂値を1消費すると、会心率+40%、継続時間6秒。この効果は1秒毎に1回のみ発動可能。",
  },
  {
    id: 15039,
    name: "長き夜の誓い",
    enName: "Long Night's Oath",
    icon: "UI_RelicIcon_15039_4",
    rank: [4, 5],
    twoPiece: "落下攻撃の与えるダメージ+25%。",
    fourPiece: "装備者の落下攻撃/重撃/元素スキルが敵に命中した後、「永遠に輝く流光」効果を1/2/2層獲得する。落下攻撃、重撃、または元素スキルによるこの効果はそれぞれ1秒毎に1回のみ発動可能。「永遠に輝く流光」：落下攻撃ダメージ+15%、継続時間6秒、最大5層まで重ね掛け可能。継続時間は層ごとに独立してカウントされる。",
  },
  {
    id: 15040,
    name: "深廊の終曲",
    enName: "Finale of the Deep Galleries",
    icon: "UI_RelicIcon_15040_4",
    rank: [4, 5],
    twoPiece: "氷元素ダメージ+15%。",
    fourPiece: "装備者の元素エネルギーが0の時、通常攻撃ダメージ+60%、元素爆発ダメージ+60%。装備者の通常攻撃がダメージを与えた後、上記元素爆発ダメージアップ効果は6秒間無効になる。装備者の元素爆発がダメージを与えた後、上記通常攻撃ダメージアップ効果は6秒間無効になる。キャラクターが待機中でも発動できる。",
  },
  {
    id: 15041,
    name: "天穹の顕現せし夜",
    enName: "Night of the Sky's Unveiling",
    icon: "UI_RelicIcon_15041_4",
    rank: [4, 5],
    twoPiece: "元素熟知+80。",
    fourPiece: "付近にいるチーム内キャラクターが月反応を起こした時に装備者がフィールドにいる場合、4秒間継続する「月輝明光・蓄念」効果を獲得する。「月輝明光・蓄念」：チームの月兆が初照/満照の時、会心率+15%/30%。チーム内キャラクターの「月輝明光」効果が1種類存在するごとに、チーム内キャラクターが起こす月反応のダメージ+10%。「月輝明光」によって生じた効果は重ね掛け不可。",
  },
  {
    id: 15042,
    name: "月を紡ぐ夜の歌",
    enName: "Silken Moon's Serenade",
    icon: "UI_RelicIcon_15042_4",
    rank: [4, 5],
    twoPiece: "元素チャージ効率+20%。",
    fourPiece: "元素ダメージを与えた時、8秒間継続する「月輝明光・崇拝」効果を獲得する。「月輝明光・崇拝」：チームの月兆が初照/満照の時、チーム全員の元素熟知+60/120。装備者が待機中でも、上記効果を発動できる。チーム内キャラクターの「月輝明光」効果が1種類存在するごとに、チーム内キャラクターが起こす月反応のダメージ+10%。「月輝明光」によって生じた効果は重ね掛け不可。",
  },
  {
    id: 15043,
    name: "暁の星と月の歌",
    enName: "Aubade of Morningstar and Moon",
    icon: "UI_RelicIcon_15043_4",
    rank: [4, 5],
    twoPiece: "元素熟知+80。",
    fourPiece: "装備者が待機中の時、与える月反応のダメージ+20%。チーム全体の月兆レベルが満照以上の時、与える月反応のダメージがさらに+40%。上記効果は装備者がフィールド上に3秒間滞在すると解除される。",
  },
  {
    id: 15044,
    name: "風立ちの日",
    enName: "A Day Carved From Rising Winds",
    icon: "UI_RelicIcon_15044_4",
    rank: [4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "通常攻撃、重撃、元素スキル、または元素爆発が敵に命中すると、継続時間6秒の「風と牧歌の寵愛」を獲得する。「風と牧歌の寵愛」：攻撃力+25%。装備者が「魔女の課題」をクリアしている場合、「風と牧歌の寵愛」は「風と牧歌の決意」に強化され、「魔女の課題」をクリアした装備者の会心率+20%。装備したキャラクターが待機している場合にも効果を発動できる。",
  },
  {
    id: 15045,
    name: "天からの贈り物",
    enName: "Celestial Gift",
    icon: "UI_RelicIcon_15045_4",
    rank: [4, 5],
    twoPiece: "元素チャージ効率+20%。",
    fourPiece: "装備者が「魔女の課題」をクリアしている場合、元素スキルを発動すると、「天光の導き」効果を獲得する。この効果は装備者の元素タイプに基づき、付近にいるチーム全員に当該元素ダメージ+20%のバフを付与する。継続時間20秒。装備者が待機中でも発動可能。同じ聖遺物セットによるダメージアップ効果は重ね掛けできない。\\n・チームが「魔導秘儀」効果を持っている時、「天光の導き」効果は「浮世の頌歌」に強化される。装備者の元素タイプに加え、フィールド上にいる自身のキャラクターの元素タイプに基づき、周囲のチーム全員に当該元素のダメージアップ効果を付与する。さらに、上記2種類の元素ダメージアップ効果は40%までアップする。同じ元素タイプの元素ダメージアップ効果は重ね掛けできない。",
  },
  {
    id: 15046,
    name: "影に沈む幻",
    enName: "Disenchantment in Deep Shadow",
    icon: "UI_RelicIcon_15046_4",
    rank: [4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "超電導反応によるダメージ+80%、星電導反応によるダメージ+40%。装備者が超電導または星電導反応の影響を受けた敵を攻撃する時、その攻撃の会心率+16%。",
  },
  {
    id: 15047,
    name: "紅血の証",
    enName: "Scarlet Proof",
    icon: "UI_RelicIcon_15047_4",
    rank: [4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "装備者が星拡散反応を起こした後の10秒間、会心率+16%、星拡散反応ダメージ+40%。",
  },
  {
    id: 15048,
    name: "炉炎溶錬の心",
    enName: "Heart of the Furnace",
    icon: "UI_RelicIcon_15048_4",
    rank: [4, 5],
    twoPiece: "攻撃力+18%。",
    fourPiece: "装備者が星反応を起こす、または星反応ダメージを与えた後の12秒間、攻撃力+12%、近くにいるチーム内のすべてのキャラクターが与える星反応ダメージ+50%。装備したキャラクターが待機している場合にも効果を発動できる。同じ名前の聖遺物セットによるダメージアップ効果は重ね掛けできない。",
  },
];

export function getArtifactSetById(id: number) {
  return ARTIFACT_SETS.find((set) => set.id === id) ?? null;
}

export function searchArtifactSets(keyword: string) {
  const query = keyword.trim().toLowerCase();

  if (!query) {
    return ARTIFACT_SETS;
  }

  return ARTIFACT_SETS.filter(
    (set) =>
      set.name.toLowerCase().includes(query) ||
      (set.enName?.toLowerCase().includes(query) ?? false)
  );
}

export type ArtifactConditions = {
  fourPieceEnabled?: boolean;

  targetAffectedBySuperconductOrStarConduction?: boolean;

  nightsoulBlessing?: boolean;
  obsidianCritActive?: boolean;

  marechausseeStacks?: number;
  goldenTroupeOffField?: boolean;

  millelithBuffActive?: boolean;
  noblesseBuffActive?: boolean;

  blizzardCryoAffected?: boolean;
  blizzardFrozen?: boolean;

  paleFlameStacks?: number;

  emblemEnergyRecharge?: number;

  gildedSameElementCount?: number;
  gildedDifferentElementCount?: number;

  paradiseStacks?: number;

  huskStacks?: number;

  nymphStacks?: number;

  whimsyStacks?: number;

  longNightStacks?: number;

  witchTaskCompleted?: boolean;
  magiaSecretRite?: boolean;

  stellarReactionActive?: boolean;
};

export function getArtifactEffects({
  artifactId,
  conditions = {},
}: {
  artifactId: number | null;
  conditions?: ArtifactConditions;
}): ArtifactEffectResult {
  const result = createEmptyArtifactEffect();

  if (!artifactId) {
    return result;
  }

  switch (artifactId) {
    case 14001: {
      result.cryoDamageBonus += 15;

      if (conditions.fourPieceEnabled) {
        if (conditions.blizzardCryoAffected) result.critRate += 20;
        if (conditions.blizzardFrozen) result.critRate += 20;
      }
      break;
    }

    case 15001: {
      result.attackPercent += 18;
      if (conditions.fourPieceEnabled) result.normalAttackDamageBonus += 35;
      break;
    }

    case 15002: {
      result.anemoDamageBonus += 15;

      if (conditions.fourPieceEnabled) {
        result.swirlReactionBonus += 60;
        result.starSwirlReactionBonus += 20;
      }
      break;
    }

    case 15003: {
      result.elementalMastery += 80;
      if (conditions.fourPieceEnabled) result.chargedAttackDamageBonus += 35;
      break;
    }

    case 15004: {
      result.cryoDamageBonus += 15;

      if (conditions.fourPieceEnabled) {
        result.superconductReactionBonus += 100;
        result.meltReactionBonus += 15;
      }
      break;
    }

    case 15005: {
      result.electroDamageBonus += 15;

      if (conditions.fourPieceEnabled) {
        result.overloadReactionBonus += 40;
        result.electroChargedReactionBonus += 40;
        result.superconductReactionBonus += 40;
        result.hyperbloomReactionBonus += 40;
        result.aggravateReactionBonus += 20;
        result.starConductionReactionBonus += 20;
      }
      break;
    }

    case 15006: {
      result.pyroDamageBonus += 15;

      if (conditions.fourPieceEnabled) {
        result.overloadReactionBonus += 40;
        result.burningReactionBonus += 40;
        result.burgeonReactionBonus += 40;
        result.vaporizeReactionBonus += 15;
        result.meltReactionBonus += 15;
      }
      break;
    }

    case 15007: {
      result.burstDamageBonus += 20;

      if (conditions.fourPieceEnabled && conditions.noblesseBuffActive) {
        result.attackPercent += 20;
      }
      break;
    }

    case 15008: {
      result.physicalDamageBonus += 25;
      if (conditions.fourPieceEnabled) result.chargedAttackDamageBonus += 50;
      break;
    }

    case 15014: {
      result.geoDamageBonus += 15;
      break;
    }

    case 15016: {
      result.hydroDamageBonus += 15;

      if (conditions.fourPieceEnabled) {
        result.normalAttackDamageBonus += 30;
        result.chargedAttackDamageBonus += 30;
      }
      break;
    }

    case 15017: {
      result.hpPercent += 20;

      if (conditions.fourPieceEnabled && conditions.millelithBuffActive) {
        result.attackPercent += 20;
      }
      break;
    }

    case 15018: {
      result.physicalDamageBonus += 25;

      if (conditions.fourPieceEnabled) {
        const stacks = Math.max(0, Math.min(2, conditions.paleFlameStacks ?? 0));
        result.attackPercent += 9 * stacks;
        if (stacks >= 2) result.physicalDamageBonus += 25;
      }
      break;
    }

    case 15019: {
      result.attackPercent += 18;

      if (conditions.fourPieceEnabled) {
        result.normalAttackDamageBonus += 50;
        result.chargedAttackDamageBonus += 50;
        result.plungeAttackDamageBonus += 50;
      }
      break;
    }

    case 15020: {
      result.energyRecharge += 20;

      if (conditions.fourPieceEnabled) {
        const er = Math.max(0, conditions.emblemEnergyRecharge ?? 100);
        result.burstDamageBonus += Math.min(75, er * 0.25);
      }
      break;
    }

    case 15021: {
      result.defensePercent += 30;

      if (conditions.fourPieceEnabled) {
        const stacks = Math.max(0, Math.min(4, conditions.huskStacks ?? 0));
        result.defensePercent += 6 * stacks;
        result.geoDamageBonus += 6 * stacks;
      }
      break;
    }

    case 15025: {
      result.dendroDamageBonus += 15;
      break;
    }

    case 15026: {
      result.elementalMastery += 80;

      if (conditions.fourPieceEnabled) {
        const same = Math.max(0, Math.min(3, conditions.gildedSameElementCount ?? 0));
        const diff = Math.max(0, Math.min(3, conditions.gildedDifferentElementCount ?? 0));

        result.attackPercent += same * 14;
        result.elementalMastery += diff * 50;
      }
      break;
    }

    case 15027: {
      result.anemoDamageBonus += 15;

      if (conditions.fourPieceEnabled) {
        result.normalAttackDamageBonus += 40;
        result.chargedAttackDamageBonus += 40;
        result.plungeAttackDamageBonus += 40;
      }
      break;
    }

    case 15028: {
      result.elementalMastery += 80;

      if (conditions.fourPieceEnabled) {
        const stacks = Math.max(0, Math.min(4, conditions.paradiseStacks ?? 0));
        const scale = 1 + 0.25 * stacks;

        result.bloomReactionBonus += 40 * scale;
        result.hyperbloomReactionBonus += 40 * scale;
        result.burgeonReactionBonus += 40 * scale;
      }
      break;
    }

    case 15029: {
      result.hydroDamageBonus += 15;

      if (conditions.fourPieceEnabled) {
        const stacks = Math.max(0, Math.min(3, conditions.nymphStacks ?? 0));

        if (stacks === 1) {
          result.attackPercent += 7;
          result.hydroDamageBonus += 4;
        } else if (stacks === 2) {
          result.attackPercent += 16;
          result.hydroDamageBonus += 9;
        } else if (stacks >= 3) {
          result.attackPercent += 25;
          result.hydroDamageBonus += 15;
        }
      }
      break;
    }

    case 15030: {
      result.hpPercent += 20;

      if (conditions.fourPieceEnabled) {
        result.skillDamageBonus += 10;
        result.burstDamageBonus += 10;
      }
      break;
    }

    case 15031: {
      result.normalAttackDamageBonus += 15;
      result.chargedAttackDamageBonus += 15;

      if (conditions.fourPieceEnabled) {
        const stacks = Math.max(0, Math.min(3, conditions.marechausseeStacks ?? 0));
        result.critRate += 12 * stacks;
      }
      break;
    }

    case 15032: {
      result.skillDamageBonus += 20;

      if (conditions.fourPieceEnabled) {
        result.skillDamageBonus += 25;
        if (conditions.goldenTroupeOffField) result.skillDamageBonus += 25;
      }
      break;
    }

    case 15034: {
      result.attackPercent += 18;
      break;
    }

    case 15035: {
      result.attackPercent += 18;

      if (conditions.fourPieceEnabled) {
        const stacks = Math.max(0, Math.min(3, conditions.whimsyStacks ?? 0));
        result.genericDamageBonus += 18 * stacks;
      }
      break;
    }

    case 15036: {
      result.attackPercent += 18;
      break;
    }

    case 15038: {
      if (conditions.nightsoulBlessing) result.genericDamageBonus += 15;

      if (conditions.fourPieceEnabled && conditions.obsidianCritActive) {
        result.critRate += 40;
      }
      break;
    }

    case 15039: {
      result.plungeAttackDamageBonus += 25;

      if (conditions.fourPieceEnabled) {
        const stacks = Math.max(0, Math.min(5, conditions.longNightStacks ?? 0));
        result.plungeAttackDamageBonus += 15 * stacks;
      }
      break;
    }

    case 15040: {
      result.cryoDamageBonus += 15;
      break;
    }

    case 15041: {
      result.elementalMastery += 80;
      break;
    }

    case 15042: {
      result.energyRecharge += 20;
      break;
    }

    case 15043: {
      result.elementalMastery += 80;
      break;
    }

    case 15044: {
      result.attackPercent += 18;

      if (conditions.fourPieceEnabled) {
        result.attackPercent += 25;
        if (conditions.witchTaskCompleted) result.critRate += 20;
      }
      break;
    }

    case 15045: {
      result.energyRecharge += 20;
      break;
    }

    case 15046: {
      result.attackPercent += 18;

      if (conditions.fourPieceEnabled) {
        result.superconductReactionBonus += 80;
        result.starConductionReactionBonus += 40;

        if (conditions.targetAffectedBySuperconductOrStarConduction) {
          result.critRate += 16;
        }
      }
      break;
    }

    case 15047: {
      result.attackPercent += 18;

      if (conditions.fourPieceEnabled && conditions.stellarReactionActive) {
        result.critRate += 16;
        result.starSwirlReactionBonus += 40;
      }
      break;
    }

    case 15048: {
      result.attackPercent += 18;

      if (conditions.fourPieceEnabled && conditions.stellarReactionActive) {
        result.attackPercent += 12;
        result.starReactionBonus += 50;
      }
      break;
    }

    default:
      break;
  }

  const set = getArtifactSetById(artifactId);

  if (set) {
    result.notes.push(`${set.name}を使用`);
  }

  return result;
}

/*
 * =========================================================
 * 表示順
 * =========================================================
 *
 * IDが大きいセットほど新しいため、
 * 聖遺物選択画面では新しいセットを上に表示する。
 */
ARTIFACT_SETS.sort(
  (a, b) => b.id - a.id
);
