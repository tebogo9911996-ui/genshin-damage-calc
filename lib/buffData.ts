import type { BuffDataFile } from "./buffTypes";

export const BUFF_DATA: BuffDataFile = {
  "characters": [
    {
      "name": "ベネット",
      "buffs": [
        {
          "stat": "攻撃力実数",
          "amount_formula": "base_atk * (talent_amount + if(constellation >= 1, 0.2, 0))",
          "formula_amount_by_talent_level": {
            "1": 0.56,
            "2": 0.602,
            "3": 0.644,
            "4": 0.7,
            "5": 0.742,
            "6": 0.784,
            "7": 0.84,
            "8": 0.896,
            "9": 0.952,
            "10": 1.008,
            "11": 1.064,
            "12": 1.12,
            "13": 1.19,
            "14": 1.26,
            "15": 1.33
          },
          "talent": "burst",
          "talent_title": "素晴らしい旅",
          "talent_level_bonus_constellation": 5,
          "target": "field",
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 1 || field_current_hp_percent > 0.7"
          ]
        },
        {
          "stat": "チャージ効率",
          "amount": 0.3,
          "target": "self",
          "conditions": [
            "constellation >= 2",
            "source_current_hp_percent <= 0.7"
          ]
        },
        {
          "stat": "炎バフ",
          "amount": 0.15,
          "target": "field",
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 6",
            "field_weapon_melee"
          ]
        }
      ]
    },
    {
      "name": "氷蛍",
      "buffs": [
        {
          "stat": "星電導基礎ダメ加算",
          "amount_formula": "min(source_atk * 0.000035, 0.07)",
          "target": "all"
        },
        {
          "stat": "星拡散基礎ダメ加算",
          "amount_formula": "min(source_atk * 0.000035, 0.07)",
          "target": "all"
        },
        {
          "stat": "熟知",
          "amount_formula": "min(source_atk * 0.08, 160)",
          "target": "self"
        },
        {
          "stat": "星電導バフ",
          "amount": 0.4,
          "target": "other",
          "duration_seconds": 15,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 6"
          ]
        },
        {
          "stat": "星拡散バフ",
          "amount": 0.4,
          "target": "other",
          "duration_seconds": 15,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 6"
          ]
        }
      ]
    },
    {
      "name": "アリョーシャ",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount_formula": "if(constellation >= 3, 0.237, 0.201)",
          "target": "field",
          "duration_seconds": 15,
          "trigger": {
            "type": "arosha_mark_activation",
            "source": "self"
          }
        },
        {
          "stat": "星電導バフ",
          "amount": 0.2,
          "target": "field",
          "duration_seconds": 15,
          "trigger": {
            "type": "arosha_mark_activation",
            "source": "self"
          },
          "conditions": [
            "has_star_superconduct"
          ]
        },
        {
          "stat": "熟知",
          "amount": 100,
          "target": "field",
          "duration_seconds": 15,
          "trigger": {
            "type": "arosha_mark_activation",
            "source": "self"
          },
          "conditions": [
            "constellation >= 6"
          ]
        }
      ]
    },
    {
      "name": "ファルカ",
      "buffs": [
        {
          "stat": "風バフ",
          "amount_formula": "min(floor(source_atk / 1000) * 0.10, 0.25)",
          "target": "self",
          "conditions": [
            "pyro_count + hydro_count + electro_count + cryo_count >= 1"
          ]
        },
        {
          "stat": "炎バフ",
          "amount_formula": "min(floor(source_atk / 1000) * 0.10, 0.25)",
          "target": "self",
          "conditions": [
            "pyro_count >= 1"
          ]
        },
        {
          "stat": "水バフ",
          "amount_formula": "min(floor(source_atk / 1000) * 0.10, 0.25)",
          "target": "self",
          "conditions": [
            "pyro_count < 1",
            "hydro_count >= 1"
          ]
        },
        {
          "stat": "雷バフ",
          "amount_formula": "min(floor(source_atk / 1000) * 0.10, 0.25)",
          "target": "self",
          "conditions": [
            "pyro_count < 1",
            "hydro_count < 1",
            "electro_count >= 1"
          ]
        },
        {
          "stat": "氷バフ",
          "amount_formula": "min(floor(source_atk / 1000) * 0.10, 0.25)",
          "target": "self",
          "conditions": [
            "pyro_count < 1",
            "hydro_count < 1",
            "electro_count < 1",
            "cryo_count >= 1"
          ]
        },
        {
          "stat": "通常バフ",
          "amount": 0.075,
          "target": "self",
          "duration_seconds": 8,
          "max_stacks": 4,
          "trigger": {
            "type": "falca_azure_fang_oath",
            "source": "team"
          }
        },
        {
          "stat": "重撃バフ",
          "amount": 0.075,
          "target": "self",
          "duration_seconds": 8,
          "max_stacks": 4,
          "trigger": {
            "type": "falca_azure_fang_oath",
            "source": "team"
          }
        },
        {
          "stat": "スキルバフ",
          "amount": 0.075,
          "target": "self",
          "duration_seconds": 8,
          "max_stacks": 4,
          "trigger": {
            "type": "falca_azure_fang_oath",
            "source": "team"
          }
        }
      ]
    },
    {
      "name": "コロンビーナ",
      "buffs": [
        {
          "stat": "月バフ",
          "amount": 0.37,
          "target": "field",
          "duration_seconds": 20,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "会心率",
          "amount": 0.15,
          "target": "self"
        }
      ]
    },
    {
      "name": "ヴァレサ",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": 0.35,
          "target": "self",
          "duration_seconds": 12,
          "max_stacks": 2,
          "trigger": {
            "type": "night_soul_burst",
            "source": "team"
          }
        }
      ]
    },
    {
      "name": "シグウィン",
      "buffs": [
        {
          "stat": "水バフ",
          "amount": 0.08,
          "target": "self",
          "duration_seconds": 18,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "スカーク",
      "buffs": [
        {
          "stat": "元素スキル天賦レベル",
          "amount": 1,
          "target": "all",
          "conditions": [
            "hydro_count >= 1",
            "cryo_count >= 1",
            "hydro_count + cryo_count >= 4"
          ]
        }
      ]
    },
    {
      "name": "ローエン",
      "buffs": [
        {
          "stat": "元素スキル天賦レベル",
          "amount": 1,
          "target": "self",
          "duration_seconds": 15,
          "trigger": {
            "type": "normal_skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "セノ",
      "buffs": [
        {
          "stat": "熟知",
          "amount": 100,
          "target": "self",
          "duration_seconds": 18,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount": 200,
          "target": "field",
          "duration_seconds": 18,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "has_star_superconduct"
          ]
        }
      ]
    },
    {
      "name": "フリンズ",
      "buffs": [
        {
          "stat": "月感電バフ",
          "amount": 0.2,
          "target": "self",
          "conditions": [
            "moon_sign_count >= 2"
          ]
        },
        {
          "stat": "月感電基礎ダメ加算",
          "amount_formula": "min(source_atk * 0.0007, 0.14)",
          "target": "all"
        },
        {
          "stat": "熟知",
          "amount_formula": "min(source_atk * 0.08, 160)",
          "target": "self"
        }
      ]
    },
    {
      "name": "スクロース",
      "buffs": [
        {
          "stat": "ダメバフ",
          "amount": 0.0571428,
          "target": "all",
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "hexenzirkel_count >= 2"
          ]
        },
        {
          "stat": "ダメバフ",
          "amount": 0.0714285,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "hexenzirkel_count >= 2"
          ]
        }
      ]
    },
    {
      "name": "八重神子",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount_formula": "source_em * 0.0015",
          "target": "self",
          "duration_seconds": 20,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "星電導バフ",
          "amount": 0.5,
          "target": "all",
          "conditions": [
            "constellation >= 1"
          ]
        },
        {
          "stat": "雷バフ",
          "amount": 0.5,
          "target": "all",
          "conditions": [
            "constellation >= 1"
          ]
        },
        {
          "stat": "熟知",
          "amount": 200,
          "target": "field",
          "conditions": [
            "constellation >= 2"
          ]
        },
        {
          "stat": "雷バフ",
          "amount": 0.2,
          "target": "all",
          "conditions": [
            "constellation >= 4"
          ]
        },
        {
          "stat": "爆発バフ",
          "amount": 1,
          "target": "self",
          "conditions": [
            "constellation >= 4"
          ]
        },
        {
          "stat": "星電導会心ダメ",
          "amount": 2.0,
          "target": "self",
          "conditions": [
            "constellation >= 6"
          ]
        }
      ]
    },
    {
      "name": "七七",
      "buffs": [
        {
          "stat": "星電導バフ",
          "amount": 0.5,
          "target": "all",
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": []
        },
        {
          "stat": "星拡散バフ",
          "amount": 0.5,
          "target": "all",
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": []
        },
        {
          "stat": "攻撃力%",
          "amount": 0.5,
          "target": "self",
          "conditions": [
            "constellation >= 2"
          ]
        }
      ]
    },
    {
      "name": "ディオナ",
      "buffs": [
        {
          "stat": "熟知",
          "amount": 200,
          "target": "field",
          "conditions": [
            "constellation >= 6"
          ],
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "超電導バフ",
          "amount": 0.4,
          "target": "field",
          "conditions": [
            "constellation >= 6"
          ],
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "星電導バフ",
          "amount": 0.4,
          "target": "field",
          "conditions": [
            "constellation >= 6"
          ],
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "星拡散バフ",
          "amount": 0.4,
          "target": "field",
          "conditions": [
            "constellation >= 6"
          ],
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "北斗",
      "buffs": [
        {
          "stat": "雷耐性ダウン",
          "amount": 0.15,
          "target": "all",
          "duration_seconds": 15,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 6"
          ]
        },
        {
          "stat": "氷耐性ダウン",
          "amount": 0.15,
          "target": "all",
          "duration_seconds": 15,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 6",
            "field_is_radiant_star_superconduct"
          ]
        },
        {
          "stat": "熟知",
          "amount": 200,
          "target": "field",
          "duration_seconds": 15,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 6",
            "field_is_radiant_star_superconduct"
          ]
        }
      ]
    },
    {
      "name": "シロネン",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": 0.45,
          "target": "pyro",
          "conditions": [
            "constellation >= 2",
            "pech_count >= 2"
          ],
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "HP%",
          "amount": 0.45,
          "target": "hydro",
          "conditions": [
            "constellation >= 2",
            "pech_count >= 2"
          ],
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "会心ダメ",
          "amount": 0.6,
          "target": "cryo",
          "conditions": [
            "constellation >= 2",
            "pech_count >= 2"
          ],
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "ダメバフ",
          "amount": 0.5,
          "target": "geo",
          "conditions": [
            "constellation >= 2",
            "pech_count >= 2"
          ],
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "爆発CT短縮",
          "amount": 6,
          "target": "electro",
          "conditions": [
            "constellation >= 2",
            "pech_count >= 2"
          ],
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "炎耐性ダウン",
          "amount": 0.33,
          "target": "all",
          "conditions": [
            "pech_count >= 2",
            "pyro_count >= 1"
          ],
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "水耐性ダウン",
          "amount": 0.33,
          "target": "all",
          "conditions": [
            "pech_count >= 2",
            "hydro_count >= 1"
          ],
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "氷耐性ダウン",
          "amount": 0.33,
          "target": "all",
          "conditions": [
            "pech_count >= 2",
            "cryo_count >= 1"
          ],
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "雷耐性ダウン",
          "amount": 0.33,
          "target": "all",
          "conditions": [
            "pech_count >= 2",
            "electro_count >= 1"
          ],
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "岩耐性ダウン",
          "amount": 0.33,
          "target": "all",
          "conditions": [
            "constellation < 2",
            "pech_count >= 2"
          ],
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "岩耐性ダウン",
          "amount": 0.33,
          "target": "all",
          "conditions": [
            "constellation >= 2"
          ]
        }
      ]
    },
    {
      "name": "ニコ",
      "buffs": [
        {
          "stat": "攻撃力実数",
          "amount_formula": "min(source_atk * 0.1425, 570)",
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力実数",
          "amount": "300",
          "target": "field",
          "duration_seconds": 20,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力実数",
          "amount": "300",
          "target": "self",
          "duration_seconds": 20,
          "exclude_from_reference_stats": true,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "エスコフィエ",
      "buffs": [
        {
          "stat": "水耐性ダウン",
          "amount_formula": "if(hydro_count + cryo_count >= 4, 0.55, if(hydro_count + cryo_count >= 3, 0.15, if(hydro_count + cryo_count >= 2, 0.10, if(hydro_count + cryo_count >= 1, 0.05, 0))))",
          "target": "all"
        },
        {
          "stat": "氷耐性ダウン",
          "amount_formula": "if(hydro_count + cryo_count >= 4, 0.55, if(hydro_count + cryo_count >= 3, 0.15, if(hydro_count + cryo_count >= 2, 0.10, if(hydro_count + cryo_count >= 1, 0.05, 0))))",
          "target": "all"
        }
      ],
      "duration_seconds": 32,
      "trigger": {
        "type": "skill_used",
        "source": "self"
      }
    },
    {
      "name": "サンドローネ",
      "buffs": [
        {
          "stat": "星電導基礎ダメ加算",
          "amount_formula": "min(source_atk * 0.0007, 0.14)",
          "target": "all"
        },
        {
          "stat": "星拡散基礎ダメ加算",
          "amount_formula": "min(source_atk * 0.0007, 0.14)",
          "target": "all"
        },
        {
          "stat": "熟知",
          "amount_formula": "min(source_atk * 0.08, 160)",
          "target": "self"
        },
        {
          "stat": "向上",
          "amount": 0.2,
          "target": "self",
          "conditions": [
            "constellation >= 6"
          ]
        }
      ]
    },
    {
      "name": "ヴェスナ",
      "buffs": [
        {
          "stat": "星拡散基礎ダメ加算",
          "amount_formula": "min(source_atk * 0.0007, 0.14)",
          "target": "all"
        },
        {
          "stat": "星拡散バフ",
          "amount": 0.2,
          "target": "self",
          "conditions": [
            "constellation >= 1"
          ]
        },
        {
          "stat": "向上",
          "amount": 0.2,
          "target": "self",
          "conditions": [
            "constellation >= 6"
          ]
        }
      ]
    },
    {
      "name": "オデット",
      "buffs": [
        {
          "stat": "星電導基礎ダメ加算",
          "amount_formula": "min(source_atk * 0.0007, 0.14)",
          "target": "all"
        },
        {
          "stat": "星拡散基礎ダメ加算",
          "amount_formula": "min(source_atk * 0.0007, 0.14)",
          "target": "all"
        },
        {
          "stat": "向上",
          "amount": 0.2,
          "target": "self",
          "conditions": [
            "constellation >= 6"
          ]
        },
        {
          "stat": "星電導バフ",
          "amount_formula": "if(constellation >= 5, 0.58, 0.46)",
          "duration_seconds": 20,
          "target": "self",
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "星拡散バフ",
          "amount_formula": "if(constellation >= 5, 0.58, 0.46)",
          "duration_seconds": 20,
          "target": "self",
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "星電導バフ",
          "amount_formula": "if(constellation >= 5, 0.29, 0.23)",
          "duration_seconds": 20,
          "target": "other",
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 4"
          ]
        },
        {
          "stat": "星拡散バフ",
          "amount_formula": "if(constellation >= 5, 0.29, 0.23)",
          "duration_seconds": 20,
          "target": "other",
          "trigger": {
            "type": "burst_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 4"
          ]
        }
      ]
    },
    {
      "name": "イネファ",
      "buffs": [
        {
          "stat": "月感電基礎ダメ加算",
          "amount_formula": "min(source_atk * 0.0007, 0.14)",
          "target": "all"
        },
        {
          "stat": "熟知",
          "amount_formula": "source_atk * 0.06",
          "target": "self",
          "duration_seconds": 20,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount_formula": "source_atk * 0.06",
          "target": "field",
          "duration_seconds": 20,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "コロンビーナ",
      "buffs": [
        {
          "stat": "月感電基礎ダメ加算",
          "amount_formula": "min(source_hp * 0.000002, 0.07)",
          "target": "all"
        },
        {
          "stat": "月開花基礎ダメ加算",
          "amount_formula": "min(source_hp * 0.000002, 0.07)",
          "target": "all"
        },
        {
          "stat": "月結晶基礎ダメ加算",
          "amount_formula": "min(source_hp * 0.000002, 0.07)",
          "target": "all"
        }
      ]
    },
    {
      "name": "ヴォジャニーツァ",
      "buffs": [
        {
          "stat": "攻撃力実数",
          "amount_formula": "source_hp * 0.007",
          "target": "all",
          "duration_seconds": 3,
          "trigger": {
            "type": "healing_done",
            "source": "self"
          },
          "conditions": [
            "constellation >= 1"
          ]
        },
        {
          "stat": "水耐性ダウン",
          "talent": "skill",
          "talent_title": "水の精の序曲JP0D",
          "talent_level_bonus_constellation": 3,
          "amount_by_talent_level": {
            "1": 0.143,
            "2": 0.156,
            "3": 0.169,
            "4": 0.182,
            "5": 0.195,
            "6": 0.208,
            "7": 0.221,
            "8": 0.234,
            "9": 0.247,
            "10": 0.3,
            "11": 0.2756,
            "12": 0.2912,
            "13": 0.3068,
            "14": 0.3224,
            "15": 0.338
          },
          "target": "all",
          "duration_seconds": 21,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "氷耐性ダウン",
          "talent": "skill",
          "talent_title": "水の精の序曲JP0D",
          "talent_level_bonus_constellation": 3,
          "amount_by_talent_level": {
            "1": 0.143,
            "2": 0.156,
            "3": 0.169,
            "4": 0.182,
            "5": 0.195,
            "6": 0.208,
            "7": 0.221,
            "8": 0.234,
            "9": 0.285,
            "10": 0.3,
            "11": 0.2756,
            "12": 0.2912,
            "13": 0.3068,
            "14": 0.3224,
            "15": 0.338
          },
          "target": "all",
          "duration_seconds": 21,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "向上",
          "amount": 0.25,
          "target": "all",
          "duration_seconds": 25,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 6"
          ]
        },
        {
          "stat": "水バフ",
          "amount": 0.5,
          "target": "all",
          "duration_seconds": 25,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 6"
          ]
        },
        {
          "stat": "氷バフ",
          "amount": 0.5,
          "target": "all",
          "duration_seconds": 25,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "constellation >= 6"
          ]
        }
      ]
    },
    {
      "name": "リオセスリ",
      "buffs": [
        {
          "stat": "星電導バフ",
          "amount": 0.3,
          "target": "self"
        },
        {
          "stat": "通常独立乗算",
          "amount_formula": "talent_amount - 1",
          "formula_amount_by_talent_level": {
            "1": 1.4317,
            "2": 1.4575,
            "3": 1.4834,
            "4": 1.517,
            "5": 1.5428,
            "6": 1.5687,
            "7": 1.6023,
            "8": 1.6359,
            "9": 1.6695,
            "10": 1.7031,
            "11": 1.7367,
            "12": 1.7703,
            "13": 1.8039,
            "14": 1.8375,
            "15": 1.8711
          },
          "talent": "skill",
          "talent_title": "アイスファング·ラッシュ",
          "talent_level_bonus_constellation": null,
          "target": "self",
          "duration_seconds": 14,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力%",
          "amount": 0.06,
          "target": "self",
          "max_stacks": 5,
          "trigger": {
            "type": "wriothesley_gracious_rebuke_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "申鶴",
      "buffs": [
        {
          "stat": "氷耐性ダウン",
          "talent": "burst",
          "talent_title": "神女遣霊真訣",
          "talent_level_bonus_constellation": 5,
          "amount_by_talent_level": {
            "1": 0.06,
            "2": 0.07,
            "3": 0.08,
            "4": 0.09,
            "5": 0.1,
            "6": 0.11,
            "7": 0.12,
            "8": 0.13,
            "9": 0.14,
            "10": 0.15,
            "11": 0.15,
            "12": 0.15,
            "13": 0.15,
            "14": 0.15,
            "15": 0.15
          },
          "target": "all",
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "物理耐性ダウン",
          "talent": "burst",
          "talent_title": "神女遣霊真訣",
          "talent_level_bonus_constellation": 5,
          "amount_by_talent_level": {
            "1": 0.06,
            "2": 0.07,
            "3": 0.08,
            "4": 0.09,
            "5": 0.1,
            "6": 0.11,
            "7": 0.12,
            "8": 0.13,
            "9": 0.14,
            "10": 0.15,
            "11": 0.15,
            "12": 0.15,
            "13": 0.15,
            "14": 0.15,
            "15": 0.15
          },
          "amount": 0.3,
          "target": "all",
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "氷バフ",
          "amount": 0.15,
          "target": "field",
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "通常バフ",
          "amount": 0.15,
          "target": "all",
          "duration_seconds": 15,
          "trigger": {
            "type": "hold_skill_used",
            "source": "self"
          }
        },
        {
          "stat": "重撃バフ",
          "amount": 0.15,
          "target": "all",
          "duration_seconds": 15,
          "trigger": {
            "type": "hold_skill_used",
            "source": "self"
          }
        },
        {
          "stat": "爆発バフ",
          "amount": 0.15,
          "target": "all",
          "duration_seconds": 15,
          "trigger": {
            "type": "hold_skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "ラウマ",
      "buffs": [
        {
          "stat": "水耐性ダウン",
          "amount": 0.225,
          "target": "all",
          "duration_seconds": 25,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "草耐性ダウン",
          "amount": 0.225,
          "target": "all",
          "duration_seconds": 25,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "月開花会心率",
          "amount": 0.1,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "moon_sign_count >= 2"
          ]
        },
        {
          "stat": "月開花会心ダメ",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "moon_sign_count >= 2"
          ]
        },
        {
          "stat": "月開花基礎ダメ加算",
          "amount_formula": "min(source_em * 0.000175, 0.14)",
          "target": "all"
        },
        {
          "stat": "スキルバフ",
          "amount_formula": "min(source_em * 0.0004, 0.32)",
          "target": "all"
        }
      ]
    },
    {
      "name": "ネフェル",
      "buffs": [
        {
          "stat": "熟知",
          "amount": 100,
          "target": "self"
        },
        {
          "stat": "月開花基礎ダメ加算",
          "amount_formula": "min(source_em * 0.000175, 0.14)",
          "target": "all"
        }
      ]
    },
    {
      "name": "シトラリ",
      "buffs": [
        {
          "stat": "炎耐性ダウン",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 12,
          "trigger": {
            "type": "citlali_itzpapa_freeze_or_melt",
            "source": "self"
          }
        },
        {
          "stat": "水耐性ダウン",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 12,
          "trigger": {
            "type": "citlali_itzpapa_freeze_or_melt",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "鍾離",
      "buffs": [
        {
          "stat": "炎耐性ダウン",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "shield_created",
            "source": "self"
          }
        },
        {
          "stat": "水耐性ダウン",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "shield_created",
            "source": "self"
          }
        },
        {
          "stat": "雷耐性ダウン",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "shield_created",
            "source": "self"
          }
        },
        {
          "stat": "氷耐性ダウン",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "shield_created",
            "source": "self"
          }
        },
        {
          "stat": "風耐性ダウン",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "shield_created",
            "source": "self"
          }
        },
        {
          "stat": "岩耐性ダウン",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "shield_created",
            "source": "self"
          }
        },
        {
          "stat": "草耐性ダウン",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "shield_created",
            "source": "self"
          }
        },
        {
          "stat": "物理耐性ダウン",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "shield_created",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "リンネア",
      "buffs": [
        {
          "stat": "月結晶基礎ダメ加算",
          "amount_formula": "min(source_def / 100 * 0.007, 0.14)",
          "target": "all"
        },
        {
          "stat": "岩耐性ダウン",
          "amount": 0.15,
          "target": "all",
          "duration_seconds": 26,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "岩耐性ダウン",
          "amount": 0.15,
          "target": "all",
          "duration_seconds": 26,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "moon_sign_count >= 2"
          ]
        },
        {
          "stat": "熟知",
          "amount_formula": "source_def * 0.05",
          "target": "field",
          "duration_seconds": 26,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "field_is_moon_sign"
          ]
        },
        {
          "stat": "熟知",
          "amount_formula": "source_def * 0.05",
          "target": "self",
          "duration_seconds": 26,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "!field_is_moon_sign"
          ]
        }
      ]
    },
    {
      "name": "兹白",
      "buffs": [
        {
          "stat": "月結晶基礎ダメ加算",
          "amount_formula": "min(source_def / 100 * 0.007, 0.14)",
          "target": "all"
        },
        {
          "stat": "防御力%",
          "amount_formula": "max(geo_count - 1, 0) * 0.15",
          "target": "self"
        },
        {
          "stat": "熟知",
          "amount_formula": "hydro_count * 60",
          "target": "self"
        }
      ]
    }
  ],
  "weapons": [
    {
      "name": "砕け散る光輪",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self",
          "duration_seconds": 20,
          "trigger": {
            "type": "skill_or_burst_used",
            "source": "self"
          }
        },
        {
          "stat": "月感電バフ",
          "amount": [
            0.4,
            0.5,
            0.6,
            0.7,
            0.8
          ],
          "target": "all",
          "duration_seconds": 20,
          "triggers_all": [
            {
              "type": "skill_or_burst_used",
              "source": "self"
            },
            {
              "type": "shield_created",
              "source": "self"
            }
          ]
        }
      ]
    },
    {
      "name": "血染めの荒れ地",
      "buffs": [
        {
          "stat": "月感電バフ",
          "amount": [
            0.36,
            0.48,
            0.6,
            0.72,
            0.84
          ],
          "target": "self",
          "duration_seconds": 3.5,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        },
        {
          "stat": "会心ダメ",
          "amount": [
            0.28,
            0.35,
            0.42,
            0.49,
            0.56
          ],
          "target": "self",
          "duration_seconds": 6.0,
          "trigger": {
            "type": "lunar_electro_charged_or_damage",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "帳の夜曲",
      "buffs": [
        {
          "stat": "HP%",
          "amount": [
            0.1,
            0.12,
            0.14,
            0.16,
            0.18
          ],
          "target": "self"
        },
        {
          "stat": "HP%",
          "amount": [
            0.14,
            0.16,
            0.18,
            0.2,
            0.22
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "lunar_reaction_or_damage",
            "source": "self"
          }
        },
        {
          "stat": "月会心ダメ",
          "amount": [
            0.6,
            0.8,
            1.0,
            1.2,
            1.4
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "lunar_reaction_or_damage",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "寝正月の初晴",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            120,
            150,
            180,
            210,
            240
          ],
          "target": "self",
          "duration_seconds": 6,
          "trigger": {
            "type": "swirl_or_star_swirl_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount": [
            96,
            120,
            144,
            168,
            192
          ],
          "target": "self",
          "duration_seconds": 9,
          "trigger": {
            "type": "field_skill_hit",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount": [
            32,
            40,
            48,
            56,
            64
          ],
          "target": "self",
          "duration_seconds": 30,
          "trigger": {
            "type": "field_burst_hit",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "星鷲の紅き羽",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "swirl_or_star_swirl_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "重撃バフ",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "conditions": [
            "different_element_other_count >= 1"
          ]
        },
        {
          "stat": "重撃バフ",
          "amount": [
            0.28,
            0.35,
            0.42,
            0.49,
            0.56
          ],
          "target": "self",
          "conditions": [
            "different_element_other_count >= 2"
          ]
        },
        {
          "stat": "爆発バフ",
          "amount": [
            0.1,
            0.125,
            0.15,
            0.175,
            0.2
          ],
          "target": "self",
          "conditions": [
            "different_element_other_count >= 1"
          ]
        },
        {
          "stat": "爆発バフ",
          "amount": [
            0.14,
            0.175,
            0.21,
            0.245,
            0.28
          ],
          "target": "self",
          "conditions": [
            "different_element_other_count >= 2"
          ]
        }
      ]
    },
    {
      "name": "塵と光の七つの誓約",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        },
        {
          "stat": "全元素バフ",
          "amount_formula": "min(source_atk * 0.0001, 0.26)",
          "target": "field",
          "duration_seconds": 20,
          "trigger": {
            "type": "shield_created",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "祭星者の眺め",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            100,
            125,
            150,
            175,
            200
          ],
          "target": "self"
        },
        {
          "stat": "ダメバフ",
          "amount": [
            0.28,
            0.35,
            0.42,
            0.49,
            0.56
          ],
          "target": "field",
          "duration_seconds": 15,
          "cooldown_seconds": 14,
          "trigger": {
            "type": "field_shield_created",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "ヴィヴィッド・ハート",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.28,
            0.35,
            0.42,
            0.49,
            0.56
          ],
          "target": "self"
        },
        {
          "stat": "落下会心ダメ",
          "amount": [
            0.28,
            0.35,
            0.42,
            0.49,
            0.56
          ],
          "target": "self",
          "duration_seconds": 15,
          "trigger": {
            "type": "vivid_heart_plunge_cast",
            "source": "self"
          }
        },
        {
          "stat": "落下会心ダメ",
          "amount": [
            0.4,
            0.5,
            0.6,
            0.7,
            0.8
          ],
          "target": "self",
          "duration_seconds": 15,
          "trigger": {
            "type": "vivid_heart_skill_or_burst_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "ルミドゥースの挽歌",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.15,
            0.19,
            0.23,
            0.27,
            0.31
          ],
          "target": "self"
        },
        {
          "stat": "ダメバフ",
          "amount": [
            0.18,
            0.23,
            0.28,
            0.33,
            0.38
          ],
          "target": "self",
          "duration_seconds": 8,
          "max_stacks": 2,
          "trigger": {
            "type": "lumidouce_elegy_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "草薙の稲光",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount_formula": "min(max(source_er - 1, 0) * if(refinement >= 5, 0.56, if(refinement >= 4, 0.49, if(refinement >= 3, 0.42, if(refinement >= 2, 0.35, 0.28)))), if(refinement >= 5, 1.20, if(refinement >= 4, 1.10, if(refinement >= 3, 1.00, if(refinement >= 2, 0.90, 0.80)))))",
          "target": "self"
        },
        {
          "stat": "チャージ効率",
          "amount": [
            0.3,
            0.35,
            0.4,
            0.45,
            0.5
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "和璞鳶",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.032,
            0.039,
            0.046,
            0.053,
            0.06
          ],
          "target": "self",
          "duration_seconds": 6,
          "max_stacks": 7,
          "trigger": {
            "type": "field_refresh_attack_stack",
            "source": "self"
          }
        },
        {
          "stat": "ダメバフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "duration_seconds": 6,
          "trigger": {
            "type": "field_refresh_attack_stack",
            "source": "self"
          },
          "conditions": [
            "field_refresh_attack_stacks >= 7"
          ]
        }
      ]
    },
    {
      "name": "護摩の杖",
      "buffs": [
        {
          "stat": "HP%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        },
        {
          "stat": "攻撃力実数",
          "amount_formula": "source_hp * if(refinement >= 5, 0.016, if(refinement >= 4, 0.014, if(refinement >= 3, 0.012, if(refinement >= 2, 0.010, 0.008))))",
          "target": "self"
        },
        {
          "stat": "攻撃力実数",
          "amount_formula": "source_hp * if(refinement >= 5, 0.018, if(refinement >= 4, 0.016, if(refinement >= 3, 0.014, if(refinement >= 2, 0.012, 0.010))))",
          "target": "self",
          "conditions": [
            "source_current_hp_percent < 0.5"
          ]
        }
      ]
    },
    {
      "name": "若水",
      "buffs": [
        {
          "stat": "HP%",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        },
        {
          "stat": "ダメバフ",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "破天の槍",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount_formula": "if(source_has_shield, 2, 1) * if(refinement >= 5, 0.08, if(refinement >= 4, 0.07, if(refinement >= 3, 0.06, if(refinement >= 2, 0.05, 0.04))))",
          "target": "self",
          "duration_seconds": 8,
          "max_stacks": 5,
          "trigger": {
            "type": "field_refresh_attack_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "死闘の槍",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "夜を紡ぐ天鏡",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            60,
            75,
            90,
            105,
            120
          ],
          "target": "self",
          "duration_seconds": 4.5,
          "trigger": {
            "type": "skill_hydro_or_dendro_hit",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount": [
            60,
            75,
            90,
            105,
            120
          ],
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "lunar_bloom_reaction",
            "source": "team"
          }
        }
      ]
    },
    {
      "name": "真言の匣",
      "buffs": [
        {
          "stat": "会心率",
          "amount": [
            0.08,
            0.1,
            0.12,
            0.14,
            0.16
          ],
          "target": "self"
        },
        {
          "stat": "熟知",
          "amount": [
            80,
            100,
            120,
            140,
            160
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "会心ダメ",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self",
          "duration_seconds": 4,
          "trigger": {
            "type": "lunar_bloom_damage",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "天光のリュート",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            100,
            125,
            150,
            175,
            200
          ],
          "target": "self",
          "duration_seconds": 20,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "山の王の長牙",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": [
            0.1,
            0.125,
            0.15,
            0.175,
            0.2
          ],
          "target": "self",
          "duration_seconds": 6,
          "max_stacks": 6,
          "independent_stacks": true,
          "trigger": {
            "type": "fang_of_the_mountain_king_stack",
            "source": "self"
          }
        },
        {
          "stat": "爆発バフ",
          "amount": [
            0.1,
            0.125,
            0.15,
            0.175,
            0.2
          ],
          "target": "self",
          "duration_seconds": 6,
          "max_stacks": 6,
          "independent_stacks": true,
          "trigger": {
            "type": "fang_of_the_mountain_king_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "雨裁",
      "buffs": [
        {
          "stat": "ダメバフ",
          "amount": [
            0.2,
            0.24,
            0.28,
            0.32,
            0.36
          ],
          "target": "self",
          "trigger": {
            "type": "rainslasher_hydro_or_electro_aura",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "赤砂の杖",
      "buffs": [
        {
          "stat": "攻撃力実数",
          "amount_formula": "source_em * if(refinement >= 5, 1.04, if(refinement >= 4, 0.91, if(refinement >= 3, 0.78, if(refinement >= 2, 0.65, 0.52))))",
          "target": "self"
        },
        {
          "stat": "攻撃力実数",
          "amount_formula": "source_em * if(refinement >= 5, 0.56, if(refinement >= 4, 0.49, if(refinement >= 3, 0.42, if(refinement >= 2, 0.35, 0.28))))",
          "target": "self",
          "duration_seconds": 10,
          "max_stacks": 3,
          "independent_stacks": true,
          "trigger": {
            "type": "staff_of_the_scarlet_sands_skill_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "狼の武勲詩",
      "buffs": [
        {
          "stat": "ダメバフ",
          "amount": [
            0.075,
            0.095,
            0.115,
            0.135,
            0.155
          ],
          "target": "self",
          "duration_seconds": 4,
          "max_stacks": 4,
          "trigger": {
            "type": "wolfish_wold_four_winds_poem_stack",
            "source": "self"
          }
        },
        {
          "stat": "会心ダメ",
          "amount": [
            0.075,
            0.095,
            0.115,
            0.135,
            0.155
          ],
          "target": "self",
          "duration_seconds": 4,
          "max_stacks": 4,
          "trigger": {
            "type": "wolfish_wold_four_winds_poem_stack",
            "source": "self"
          },
          "conditions": [
            "hexenzirkel_count >= 2"
          ]
        }
      ]
    },
    {
      "name": "黒蝕",
      "buffs": [
        {
          "stat": "爆発会心ダメ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        },
        {
          "stat": "攻撃力%",
          "amount_formula": "if(hexenzirkel_count >= 2, 1.75, 1) * if(refinement >= 5, 0.40, if(refinement >= 4, 0.35, if(refinement >= 3, 0.30, if(refinement >= 2, 0.25, 0.20))))",
          "target": "self",
          "duration_seconds": 3,
          "trigger": {
            "type": "burst_hit",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力%",
          "amount_formula": "if(hexenzirkel_count >= 2, 1.75, 1) * if(refinement >= 5, 0.32, if(refinement >= 4, 0.28, if(refinement >= 3, 0.24, if(refinement >= 2, 0.20, 0.16))))",
          "target": "field_other",
          "duration_seconds": 3,
          "trigger": {
            "type": "burst_hit",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "狼牙",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        },
        {
          "stat": "スキルバフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        },
        {
          "stat": "スキル会心率",
          "amount": [
            0.02,
            0.025,
            0.03,
            0.035,
            0.04
          ],
          "target": "self",
          "duration_seconds": 10,
          "max_stacks": 4,
          "trigger": {
            "type": "wolf_fang_skill_hit",
            "source": "self"
          }
        },
        {
          "stat": "爆発会心率",
          "amount": [
            0.02,
            0.025,
            0.03,
            0.035,
            0.04
          ],
          "target": "self",
          "duration_seconds": 10,
          "max_stacks": 4,
          "trigger": {
            "type": "wolf_fang_burst_hit",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "白銀の湖を舞う翼",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.08,
            0.1,
            0.12,
            0.14,
            0.16
          ],
          "target": "self",
          "duration_seconds": 8,
          "max_stacks": 3,
          "trigger": {
            "type": "white_lake_winter_plume_skill_stack",
            "source": "self"
          }
        },
        {
          "stat": "星会心ダメ",
          "amount": [
            0.5,
            0.65,
            0.8,
            0.95,
            1.1
          ],
          "target": "self",
          "conditions": [
            "white_lake_winter_plume_stacks >= 3"
          ]
        }
      ]
    },
    {
      "name": "星鋒の剣",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.32,
            0.4
          ],
          "target": "self",
          "duration_seconds": 8,
          "trigger": {
            "type": "star_edge_sword_hit",
            "source": "self"
          }
        },
        {
          "stat": "会心ダメ",
          "amount": 0.42,
          "target": "self",
          "conditions": [
            "refinement >= 2",
            "source_is_traveler"
          ]
        }
      ]
    },
    {
      "name": "千夜に浮かぶ夢",
      "buffs": [
        {
          "stat": "熟知",
          "amount_formula": "same_element_other_count * if(refinement >= 5, 64, if(refinement >= 4, 56, if(refinement >= 3, 48, if(refinement >= 2, 40, 32))))",
          "target": "self"
        },
        {
          "stat": "炎バフ",
          "amount_formula": "different_element_other_count * if(refinement >= 5, 0.26, if(refinement >= 4, 0.22, if(refinement >= 3, 0.18, if(refinement >= 2, 0.14, 0.10))))",
          "target": "self",
          "conditions": [
            "source_is_pyro"
          ]
        },
        {
          "stat": "水バフ",
          "amount_formula": "different_element_other_count * if(refinement >= 5, 0.26, if(refinement >= 4, 0.22, if(refinement >= 3, 0.18, if(refinement >= 2, 0.14, 0.10))))",
          "target": "self",
          "conditions": [
            "source_is_hydro"
          ]
        },
        {
          "stat": "雷バフ",
          "amount_formula": "different_element_other_count * if(refinement >= 5, 0.26, if(refinement >= 4, 0.22, if(refinement >= 3, 0.18, if(refinement >= 2, 0.14, 0.10))))",
          "target": "self",
          "conditions": [
            "source_is_electro"
          ]
        },
        {
          "stat": "氷バフ",
          "amount_formula": "different_element_other_count * if(refinement >= 5, 0.26, if(refinement >= 4, 0.22, if(refinement >= 3, 0.18, if(refinement >= 2, 0.14, 0.10))))",
          "target": "self",
          "conditions": [
            "source_is_cryo"
          ]
        },
        {
          "stat": "風バフ",
          "amount_formula": "different_element_other_count * if(refinement >= 5, 0.26, if(refinement >= 4, 0.22, if(refinement >= 3, 0.18, if(refinement >= 2, 0.14, 0.10))))",
          "target": "self",
          "conditions": [
            "source_is_anemo"
          ]
        },
        {
          "stat": "岩バフ",
          "amount_formula": "different_element_other_count * if(refinement >= 5, 0.26, if(refinement >= 4, 0.22, if(refinement >= 3, 0.18, if(refinement >= 2, 0.14, 0.10))))",
          "target": "self",
          "conditions": [
            "source_is_geo"
          ]
        },
        {
          "stat": "草バフ",
          "amount_formula": "different_element_other_count * if(refinement >= 5, 0.26, if(refinement >= 4, 0.22, if(refinement >= 3, 0.18, if(refinement >= 2, 0.14, 0.10))))",
          "target": "self",
          "conditions": [
            "source_is_dendro"
          ]
        },
        {
          "stat": "熟知",
          "amount": [
            40,
            42,
            44,
            46,
            48
          ],
          "target": "other"
        }
      ]
    },
    {
      "name": "浮世の錠",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount_formula": "if(source_has_shield, 2, 1) * if(refinement >= 5, 0.08, if(refinement >= 4, 0.07, if(refinement >= 3, 0.06, if(refinement >= 2, 0.05, 0.04))))",
          "target": "self",
          "duration_seconds": 8,
          "max_stacks": 5,
          "trigger": {
            "type": "memory_of_dust_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "四風原典",
      "buffs": [
        {
          "stat": "ダメバフ",
          "amount": [
            0.08,
            0.1,
            0.12,
            0.14,
            0.16
          ],
          "target": "self",
          "max_stacks": 4,
          "trigger": {
            "type": "lost_prayer_field_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "諸王の対局",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "duration_seconds": 6,
          "trigger": {
            "type": "kings_game_board_rule",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount": [
            100,
            125,
            150,
            175,
            200
          ],
          "target": "self",
          "duration_seconds": 6,
          "trigger": {
            "type": "kings_game_board_rule",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "霜辰",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            72,
            90,
            108,
            126,
            144
          ],
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "field_charged_hit",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount": [
            48,
            60,
            72,
            84,
            96
          ],
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "field_skill_hit",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "烏髄の孤灯",
      "buffs": [
        {
          "stat": "開花バフ",
          "amount": [
            0.48,
            0.6,
            0.72,
            0.84,
            0.96
          ],
          "target": "self"
        },
        {
          "stat": "月開花バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        },
        {
          "stat": "月開花バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "conditions": [
            "moon_sign_count >= 2"
          ]
        }
      ]
    },
    {
      "name": "彷徨える星",
      "buffs": [
        {
          "stat": "攻撃力実数",
          "amount_formula": "source_em * if(refinement >= 5, 0.48, if(refinement >= 4, 0.42, if(refinement >= 3, 0.36, if(refinement >= 2, 0.30, 0.24))))",
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "wandering_evenstar_cycle",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力実数",
          "amount_formula": "source_em * if(refinement >= 5, 0.48, if(refinement >= 4, 0.42, if(refinement >= 3, 0.36, if(refinement >= 2, 0.30, 0.24)))) * 0.3",
          "target": "other",
          "duration_seconds": 12,
          "trigger": {
            "type": "wandering_evenstar_cycle",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "古祠の瓏",
      "buffs": [
        {
          "stat": "HP%",
          "amount": [
            0.32,
            0.4,
            0.48,
            0.56,
            0.64
          ],
          "target": "self",
          "trigger": {
            "type": "sacrificial_jade_off_field",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount": [
            40,
            50,
            60,
            70,
            80
          ],
          "target": "self",
          "trigger": {
            "type": "sacrificial_jade_off_field",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "ヤシュチェの環",
      "buffs": [
        {
          "stat": "通常バフ",
          "amount_formula": "min(floor(source_hp / 1000) * if(refinement >= 5, 0.010, if(refinement >= 4, 0.009, if(refinement >= 3, 0.008, if(refinement >= 2, 0.007, 0.006)))), if(refinement >= 5, 0.32, if(refinement >= 4, 0.28, if(refinement >= 3, 0.24, if(refinement >= 2, 0.20, 0.16)))))",
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "波乗りの旋回",
      "buffs": [
        {
          "stat": "HP%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "duration_seconds": 10,
          "cooldown_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "HP%",
          "amount_formula": "min(hydro_count * if(refinement >= 5, 0.24, if(refinement >= 4, 0.21, if(refinement >= 3, 0.18, if(refinement >= 2, 0.15, 0.12)))), if(refinement >= 5, 0.48, if(refinement >= 4, 0.42, if(refinement >= 3, 0.36, if(refinement >= 2, 0.30, 0.24)))))",
          "target": "self",
          "duration_seconds": 10,
          "cooldown_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "果てなき紺碧の唄",
      "buffs": [
        {
          "stat": "通常バフ",
          "amount": [
            0.08,
            0.1,
            0.12,
            0.14,
            0.16
          ],
          "target": "self",
          "duration_seconds": 6,
          "max_stacks": 3,
          "trigger": {
            "type": "ballad_of_boundless_blue_stack",
            "source": "self"
          }
        },
        {
          "stat": "重撃バフ",
          "amount": [
            0.06,
            0.075,
            0.09,
            0.105,
            0.12
          ],
          "target": "self",
          "duration_seconds": 6,
          "max_stacks": 3,
          "trigger": {
            "type": "ballad_of_boundless_blue_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "満悦の実",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            24,
            27,
            30,
            33,
            36
          ],
          "target": "self",
          "max_stacks": 5,
          "trigger": {
            "type": "fruit_of_fulfillment_stack",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力%",
          "amount": [
            -0.05,
            -0.05,
            -0.05,
            -0.05,
            -0.05
          ],
          "target": "self",
          "max_stacks": 5,
          "trigger": {
            "type": "fruit_of_fulfillment_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "サーフィンタイム",
      "buffs": [
        {
          "stat": "HP%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        },
        {
          "stat": "通常バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "duration_seconds": 14,
          "max_stacks": 4,
          "trigger": {
            "type": "surfing_time_summer_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "鶴鳴の余韻",
      "buffs": [
        {
          "stat": "落下バフ",
          "amount": [
            0.28,
            0.41,
            0.54,
            0.67,
            0.8
          ],
          "target": "all",
          "duration_seconds": 20,
          "trigger": {
            "type": "plunge_hit",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "久遠流転の大典",
      "buffs": [
        {
          "stat": "HP%",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        },
        {
          "stat": "重撃バフ",
          "amount": [
            0.14,
            0.18,
            0.22,
            0.26,
            0.3
          ],
          "target": "self",
          "duration_seconds": 4,
          "max_stacks": 3,
          "cooldown_seconds": 0.3,
          "trigger": {
            "type": "hp_changed",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "トゥライトゥーラの記憶",
      "buffs": [
        {
          "stat": "通常バフ",
          "amount": [
            0.048,
            0.06,
            0.072,
            0.084,
            0.096
          ],
          "target": "self",
          "duration_seconds": 14,
          "max_stacks": 10,
          "trigger": {
            "type": "tulaytullah_remembrance_normal_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "岩峰を巡る歌",
      "buffs": [
        {
          "stat": "防御力%",
          "amount": [
            0.08,
            0.1,
            0.12,
            0.14,
            0.16
          ],
          "target": "self",
          "duration_seconds": 6,
          "trigger": {
            "type": "normal_or_plunge_hit",
            "source": "self"
          }
        },
        {
          "stat": "全元素バフ",
          "amount": [
            0.1,
            0.125,
            0.15,
            0.175,
            0.2
          ],
          "target": "self",
          "duration_seconds": 6,
          "trigger": {
            "type": "normal_or_plunge_hit",
            "source": "self"
          }
        },
        {
          "stat": "全元素バフ",
          "amount_formula": "min(source_def * 0.00008, 0.256)",
          "target": "all",
          "duration_seconds": 15,
          "trigger": {
            "type": "peak_patrol_two_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "凛流の監視者",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        },
        {
          "stat": "通常バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 4,
          "max_stacks": 3,
          "cooldown_seconds": 0.3,
          "trigger": {
            "type": "hp_changed",
            "source": "self"
          }
        },
        {
          "stat": "重撃バフ",
          "amount": [
            0.14,
            0.175,
            0.21,
            0.245,
            0.28
          ],
          "target": "self",
          "duration_seconds": 4,
          "max_stacks": 3,
          "cooldown_seconds": 0.3,
          "trigger": {
            "type": "hp_changed",
            "source": "self"
          }
        },
        {
          "stat": "星電導バフ",
          "amount": [
            0.14,
            0.175,
            0.21,
            0.245,
            0.28
          ],
          "target": "self",
          "duration_seconds": 4,
          "max_stacks": 3,
          "cooldown_seconds": 0.3,
          "trigger": {
            "type": "hp_changed",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "超越の鍵",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.28,
            0.35,
            0.42,
            0.49,
            0.56
          ],
          "target": "self"
        },
        {
          "stat": "星電導バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 5,
          "max_stacks": 3,
          "cooldown_seconds": 0.2,
          "trigger": {
            "type": "field_charged_hit",
            "source": "self"
          }
        },
        {
          "stat": "星拡散バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 5,
          "max_stacks": 3,
          "cooldown_seconds": 0.2,
          "trigger": {
            "type": "field_charged_hit",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "銜玉の海皇",
      "buffs": [
        {
          "stat": "爆発バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "神楽の真意",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "duration_seconds": 24,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "星電導バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "duration_seconds": 24,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "全元素バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "conditions": [
            "kagura_verity_stacks >= 3"
          ]
        }
      ]
    },
    {
      "name": "絶弦",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self"
        },
        {
          "stat": "爆発バフ",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "香りのシンフォニスト",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "conditions": [
            "source_is_off_field"
          ]
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.32,
            0.4,
            0.48,
            0.56,
            0.64
          ],
          "target": "self",
          "duration_seconds": 3,
          "trigger": {
            "type": "healing_done",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.32,
            0.4,
            0.48,
            0.56,
            0.64
          ],
          "target": "healed_other",
          "duration_seconds": 3,
          "trigger": {
            "type": "healing_done",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "「スーパーアルティメット覇王魔剣」",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "千烈の日輪",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.28,
            0.35,
            0.42,
            0.49,
            0.56
          ],
          "target": "self",
          "duration_seconds": 6,
          "cooldown_seconds": 10,
          "triggers_any": [
            {
              "type": "skill_used",
              "source": "self"
            },
            {
              "type": "burst_or_special_burst_used",
              "source": "self"
            }
          ]
        },
        {
          "stat": "会心ダメ",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "duration_seconds": 6,
          "cooldown_seconds": 10,
          "triggers_any": [
            {
              "type": "skill_used",
              "source": "self"
            },
            {
              "type": "burst_or_special_burst_used",
              "source": "self"
            }
          ]
        }
      ]
    },
    {
      "name": "裁断",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        },
        {
          "stat": "スキルバフ",
          "amount": [
            0.18,
            0.225,
            0.27,
            0.315,
            0.36
          ],
          "target": "self",
          "duration_seconds": 15,
          "max_stacks": 2,
          "trigger": {
            "type": "verdict_pact_stack",
            "source": "team"
          }
        }
      ]
    },
    {
      "name": "葦海の標",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "duration_seconds": 8,
          "trigger": {
            "type": "skill_hit",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        },
        {
          "stat": "HP%",
          "amount": [
            0.32,
            0.4,
            0.48,
            0.56,
            0.64
          ],
          "target": "self",
          "trigger": {
            "type": "shield_inactive",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "赤角石塵滅砕",
      "buffs": [
        {
          "stat": "防御力%",
          "amount": [
            0.28,
            0.35,
            0.42,
            0.49,
            0.56
          ],
          "target": "self"
        },
        {
          "stat": "通常実数ダメージ加算",
          "amount_formula": "source_def * 0.4",
          "target": "self"
        },
        {
          "stat": "重撃実数ダメージ加算",
          "amount_formula": "source_def * 0.4",
          "target": "self"
        }
      ]
    },
    {
      "name": "三日月の含光",
      "buffs": [
        {
          "stat": "防御力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        },
        {
          "stat": "月結晶バフ",
          "amount": [
            0.64,
            0.8,
            0.96,
            1.12,
            1.28
          ],
          "target": "self",
          "duration_seconds": 5,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "霜契の金枝",
      "buffs": [
        {
          "stat": "防御力%",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        },
        {
          "stat": "岩バフ",
          "amount": [
            0.4,
            0.5,
            0.6,
            0.7,
            0.8
          ],
          "target": "self",
          "duration_seconds": 6,
          "triggers_any": [
            {
              "type": "skill_hit",
              "source": "self"
            },
            {
              "type": "lunar_crystallize_damage",
              "source": "self"
            }
          ]
        },
        {
          "stat": "月結晶バフ",
          "amount": [
            0.4,
            0.5,
            0.6,
            0.7,
            0.8
          ],
          "target": "self",
          "duration_seconds": 6,
          "triggers_any": [
            {
              "type": "skill_hit",
              "source": "self"
            },
            {
              "type": "lunar_crystallize_damage",
              "source": "self"
            }
          ]
        },
        {
          "stat": "岩バフ",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "all",
          "target_conditions": [
            "target_slot != source_slot"
          ],
          "conditions": [
            "has_lunar_crystallize_mooncage"
          ],
          "duration_seconds": 6,
          "triggers_any": [
            {
              "type": "skill_hit",
              "source": "self"
            },
            {
              "type": "lunar_crystallize_damage",
              "source": "self"
            }
          ]
        },
        {
          "stat": "月結晶バフ",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "all",
          "target_conditions": [
            "target_slot != source_slot"
          ],
          "conditions": [
            "has_lunar_crystallize_mooncage"
          ],
          "duration_seconds": 6,
          "triggers_any": [
            {
              "type": "skill_hit",
              "source": "self"
            },
            {
              "type": "lunar_crystallize_damage",
              "source": "self"
            }
          ]
        }
      ]
    },
    {
      "name": "海淵のフィナーレ",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "duration_seconds": 15,
          "cooldown_seconds": 10,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "蒼耀",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "source_has_zero_energy"
          ]
        },
        {
          "stat": "会心ダメ",
          "amount": [
            0.4,
            0.5,
            0.6,
            0.7,
            0.8
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          },
          "conditions": [
            "source_has_zero_energy"
          ]
        }
      ]
    },
    {
      "name": "赦罪",
      "buffs": [
        {
          "stat": "会心ダメ",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "有楽御簾切",
      "buffs": [
        {
          "stat": "通常バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        },
        {
          "stat": "スキルバフ",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self"
        },
        {
          "stat": "通常バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 15,
          "trigger": {
            "type": "team_field_geo_damage_hit",
            "source": "team"
          }
        },
        {
          "stat": "スキルバフ",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self",
          "duration_seconds": 15,
          "trigger": {
            "type": "team_field_geo_damage_hit",
            "source": "team"
          }
        },
        {
          "stat": "防御力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "萃光の裁葉",
      "buffs": [
        {
          "stat": "会心率",
          "amount": [
            0.04,
            0.05,
            0.06,
            0.07,
            0.08
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "霧切の廻光",
      "buffs": [
        {
          "stat": "全元素バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "導炎の源",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "星電導バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "star_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "星拡散バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "star_reaction_triggered",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "磐岩結緑",
      "buffs": [
        {
          "stat": "HP%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        },
        {
          "stat": "攻撃力実数",
          "amount_formula": "source_hp * if(refinement >= 5, 0.024, if(refinement >= 4, 0.021, if(refinement >= 3, 0.018, if(refinement >= 2, 0.015, 0.012))))",
          "target": "self"
        }
      ]
    },
    {
      "name": "波乱月白経津",
      "buffs": [
        {
          "stat": "全元素バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        },
        {
          "stat": "通常バフ",
          "amount": [
            0.4,
            0.5,
            0.6,
            0.7,
            0.8
          ],
          "target": "self",
          "duration_seconds": 8,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "狼の末路",
      "buffs": [
        {
          "stat": "防御力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "鉄彩の花",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "duration_seconds": 8
        },
        {
          "stat": "熟知",
          "amount": [
            48,
            60,
            72,
            84,
            96
          ],
          "target": "self",
          "duration_seconds": 8
        }
      ]
    },
    {
      "name": "螭龍の剣",
      "buffs": [
        {
          "stat": "全元素バフ",
          "amount_formula": "if(refinement >= 5, 0.10, if(refinement >= 4, 0.09, if(refinement >= 3, 0.08, if(refinement >= 2, 0.07, 0.06)))) * if(source_has_shield, 5, 3)",
          "target": "self",
          "conditions": [
            "source_is_field"
          ]
        }
      ]
    },
    {
      "name": "息災",
      "buffs": [
        {
          "stat": "全元素バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.384,
            0.48,
            0.576,
            0.672,
            0.768
          ],
          "target": "self",
          "duration_seconds": 20
        }
      ]
    },
    {
      "name": "シンフォニーの鋳影",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "trigger": {
            "type": "bp_claymore_cycle"
          }
        },
        {
          "stat": "熟知",
          "amount": [
            120,
            150,
            180,
            210,
            240
          ],
          "target": "self",
          "trigger": {
            "type": "bp_claymore_cycle"
          }
        },
        {
          "stat": "星電導バフ",
          "amount": [
            0.32,
            0.4,
            0.48,
            0.56,
            0.64
          ],
          "target": "self",
          "trigger": {
            "type": "bp_claymore_cycle"
          }
        },
        {
          "stat": "星拡散バフ",
          "amount": [
            0.32,
            0.4,
            0.48,
            0.56,
            0.64
          ],
          "target": "self",
          "trigger": {
            "type": "bp_claymore_cycle"
          }
        }
      ]
    },
    {
      "name": "救済の剣",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            64,
            80,
            96,
            112,
            128
          ],
          "target": "self"
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "胸中の谺",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            60,
            75,
            90,
            105,
            120
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "星電導バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "star_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "星拡散バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "star_reaction_triggered",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "天空の巻",
      "buffs": [
        {
          "stat": "ダメバフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "天空の脊",
      "buffs": [
        {
          "stat": "会心率",
          "amount": [
            0.08,
            0.1,
            0.12,
            0.14,
            0.16
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "誓いの明瞳",
      "buffs": [
        {
          "stat": "チャージ効率",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "匣中日月",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "duration_seconds": 6,
          "trigger": {
            "type": "field_normal_hit",
            "source": "self"
          }
        },
        {
          "stat": "爆発バフ",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "duration_seconds": 6,
          "trigger": {
            "type": "field_normal_hit",
            "source": "self"
          }
        },
        {
          "stat": "通常バフ",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "duration_seconds": 6,
          "triggers_any": [
            {
              "type": "field_skill_hit",
              "source": "self"
            },
            {
              "type": "field_burst_hit",
              "source": "self"
            }
          ]
        }
      ]
    },
    {
      "name": "万国諸海の図譜",
      "buffs": [
        {
          "stat": "全元素バフ",
          "amount": [
            0.08,
            0.1,
            0.12,
            0.14,
            0.16
          ],
          "target": "self",
          "duration_seconds": 10,
          "max_stacks": 2,
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "ドドコの物語",
      "buffs": [
        {
          "stat": "重撃バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 6,
          "trigger": {
            "type": "field_normal_hit",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.08,
            0.1,
            0.12,
            0.14,
            0.16
          ],
          "target": "self",
          "duration_seconds": 6,
          "trigger": {
            "type": "field_charged_hit",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "遠望の歌",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "star_reaction_triggered",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "氷の吐息",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "duration_seconds": 15,
          "trigger": {
            "type": "cryo_or_hydro_reaction_triggered",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "聖祭者の輝杖",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.08,
            0.1,
            0.12,
            0.14,
            0.16
          ],
          "target": "self",
          "duration_seconds": 6,
          "max_stacks": 3,
          "trigger": {
            "type": "skill_hit",
            "source": "self"
          }
        },
        {
          "stat": "チャージ効率",
          "amount": [
            0.06,
            0.075,
            0.09,
            0.105,
            0.12
          ],
          "target": "self",
          "duration_seconds": 6,
          "max_stacks": 3,
          "trigger": {
            "type": "skill_hit",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "金掘りのシャベル",
      "buffs": [
        {
          "stat": "感電バフ",
          "amount": [
            0.48,
            0.6,
            0.72,
            0.84,
            0.96
          ],
          "target": "self"
        },
        {
          "stat": "月感電バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        },
        {
          "stat": "月感電バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "conditions": [
            "moon_sign_count >= 2"
          ]
        }
      ]
    },
    {
      "name": "玉響停の御噺",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "虹の行方",
      "buffs": [
        {
          "stat": "防御力%",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 15,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "鎮山の釘",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self"
        },
        {
          "stat": "スキルバフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "duration_seconds": 8,
          "trigger": {
            "type": "other_skill_used",
            "source": "team"
          }
        }
      ]
    },
    {
      "name": "プロスペクタードリル",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.03,
            0.04,
            0.05,
            0.06,
            0.07
          ],
          "target": "self",
          "trigger": {
            "type": "prospector_drill_conflict",
            "source": "self"
          }
        },
        {
          "stat": "全元素バフ",
          "amount": [
            0.07,
            0.085,
            0.1,
            0.115,
            0.13
          ],
          "target": "self",
          "trigger": {
            "type": "prospector_drill_conflict",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "フィヨルドの歌",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            120,
            150,
            180,
            210,
            240
          ],
          "target": "self",
          "conditions": [
            "if(pyro_count > 0, 1, 0) + if(hydro_count > 0, 1, 0) + if(electro_count > 0, 1, 0) + if(cryo_count > 0, 1, 0) + if(anemo_count > 0, 1, 0) + if(geo_count > 0, 1, 0) + if(dendro_count > 0, 1, 0) >= 3"
          ]
        }
      ]
    },
    {
      "name": "風信の矛",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount": [
            48,
            60,
            72,
            84,
            96
          ],
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "斬波のひれ長",
      "buffs": [
        {
          "stat": "爆発バフ",
          "amount_formula": "min(team_energy_cost_total * if(refinement >= 5, 0.0024, if(refinement >= 4, 0.0021, if(refinement >= 3, 0.0018, if(refinement >= 2, 0.0015, 0.0012)))), if(refinement >= 5, 0.80, if(refinement >= 4, 0.70, if(refinement >= 3, 0.60, if(refinement >= 2, 0.50, 0.40)))))",
          "target": "self"
        }
      ]
    },
    {
      "name": "「漁獲」",
      "buffs": [
        {
          "stat": "爆発バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        },
        {
          "stat": "爆発会心率",
          "amount": [
            0.06,
            0.075,
            0.09,
            0.105,
            0.12
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "喜多院十文字槍",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": [
            0.06,
            0.075,
            0.09,
            0.105,
            0.12
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "無工の剣",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount_formula": "if(source_has_shield, 2, 1) * if(refinement >= 5, 0.08, if(refinement >= 4, 0.07, if(refinement >= 3, 0.06, if(refinement >= 2, 0.05, 0.04))))",
          "target": "self",
          "duration_seconds": 8,
          "max_stacks": 5,
          "trigger": {
            "type": "field_refresh_attack_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "聖顕の鍵",
      "buffs": [
        {
          "stat": "HP%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        },
        {
          "stat": "熟知",
          "amount_formula": "source_hp * if(refinement >= 5, 0.0024, if(refinement >= 4, 0.0021, if(refinement >= 3, 0.0018, if(refinement >= 2, 0.0015, 0.0012))))",
          "target": "self",
          "duration_seconds": 20,
          "max_stacks": 3,
          "trigger": {
            "type": "key_of_khaj_nisut_grand_hymn_stack",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount_formula": "source_hp * if(refinement >= 5, 0.0040, if(refinement >= 4, 0.0035, if(refinement >= 3, 0.0030, if(refinement >= 2, 0.0025, 0.0020))))",
          "target": "team",
          "duration_seconds": 20,
          "trigger": {
            "type": "key_of_khaj_nisut_team_em",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "斬山の刃",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount_formula": "if(source_has_shield, 2, 1) * if(refinement >= 5, 0.08, if(refinement >= 4, 0.07, if(refinement >= 3, 0.06, if(refinement >= 2, 0.05, 0.04))))",
          "target": "self",
          "duration_seconds": 8,
          "max_stacks": 5,
          "trigger": {
            "type": "field_refresh_attack_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "蒼古なる自由への誓い",
      "buffs": [
        {
          "stat": "ダメバフ",
          "amount": [
            0.1,
            0.125,
            0.15,
            0.175,
            0.2
          ],
          "target": "self"
        },
        {
          "stat": "通常バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "team",
          "duration_seconds": 12,
          "trigger": {
            "type": "freedom_sworn_millennial_song",
            "source": "self"
          }
        },
        {
          "stat": "重撃バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "team",
          "duration_seconds": 12,
          "trigger": {
            "type": "freedom_sworn_millennial_song",
            "source": "self"
          }
        },
        {
          "stat": "落下バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "team",
          "duration_seconds": 12,
          "trigger": {
            "type": "freedom_sworn_millennial_song",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "team",
          "duration_seconds": 12,
          "trigger": {
            "type": "freedom_sworn_millennial_song",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "終焉を嘆く詩",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            60,
            75,
            90,
            105,
            120
          ],
          "target": "self"
        },
        {
          "stat": "熟知",
          "amount": [
            100,
            125,
            150,
            175,
            200
          ],
          "target": "team",
          "duration_seconds": 12,
          "trigger": {
            "type": "elegy_for_the_end_millennial_song",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力%",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "team",
          "duration_seconds": 12,
          "trigger": {
            "type": "elegy_for_the_end_millennial_song",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "万能の鍵",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            60,
            75,
            90,
            105,
            120
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount": [
            60,
            75,
            90,
            105,
            120
          ],
          "target": "self",
          "duration_seconds": 12,
          "conditions": [
            "moon_sign_count >= 2"
          ],
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "知恵の溶炎",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            60,
            75,
            90,
            105,
            120
          ],
          "target": "self",
          "duration_seconds": 15,
          "trigger": {
            "type": "wisdom_molten_flame_reaction",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "アースシェイカー",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 8,
          "trigger": {
            "type": "team_pyro_reaction_triggered",
            "source": "team"
          }
        }
      ]
    },
    {
      "name": "実りの鉤鉈",
      "buffs": [
        {
          "stat": "落下会心率",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self"
        },
        {
          "stat": "通常バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "field_plunge_hit",
            "source": "self"
          }
        },
        {
          "stat": "重撃バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "field_plunge_hit",
            "source": "self"
          }
        },
        {
          "stat": "落下バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "field_plunge_hit",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "携帯型チェーンソー",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            40,
            50,
            60,
            70,
            80
          ],
          "target": "self",
          "duration_seconds": 10,
          "max_stacks": 3,
          "trigger": {
            "type": "portable_power_saw_rouse",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "タイダル·シャドー",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": [
            0.24,
            0.3,
            0.36,
            0.42,
            0.48
          ],
          "target": "self",
          "duration_seconds": 8,
          "trigger": {
            "type": "healing_received",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "惡王丸",
      "buffs": [
        {
          "stat": "爆発バフ",
          "amount_formula": "min(team_energy_cost_total * if(refinement >= 5, 0.0024, if(refinement >= 4, 0.0021, if(refinement >= 3, 0.0018, if(refinement >= 2, 0.0015, 0.0012)))), if(refinement >= 5, 0.80, if(refinement >= 4, 0.70, if(refinement >= 3, 0.60, if(refinement >= 2, 0.50, 0.40)))))",
          "target": "self"
        }
      ]
    },
    {
      "name": "マカイラの水色",
      "buffs": [
        {
          "stat": "攻撃力実数",
          "amount_formula": "source_em * if(refinement >= 5, 0.48, if(refinement >= 4, 0.42, if(refinement >= 3, 0.36, if(refinement >= 2, 0.30, 0.24))))",
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "wandering_evenstar_cycle",
            "source": "self"
          }
        },
        {
          "stat": "攻撃力実数",
          "amount_formula": "source_em * if(refinement >= 5, 0.48, if(refinement >= 4, 0.42, if(refinement >= 3, 0.36, if(refinement >= 2, 0.30, 0.24)))) * 0.3",
          "target": "other",
          "duration_seconds": 12,
          "trigger": {
            "type": "wandering_evenstar_cycle",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "桂木斬長正",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": [
            0.06,
            0.075,
            0.09,
            0.105,
            0.12
          ],
          "target": "self"
        }
      ]
    },
    {
      "name": "匣中滅龍",
      "buffs": [
        {
          "stat": "ダメバフ",
          "amount": [
            0.2,
            0.24,
            0.28,
            0.32,
            0.36
          ],
          "target": "self",
          "trigger": {
            "type": "dragons_bane_hydro_or_pyro_aura",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "静水流転の輝き",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": [
            0.08,
            0.1,
            0.12,
            0.14,
            0.16
          ],
          "target": "self",
          "duration_seconds": 6,
          "max_stacks": 3,
          "cooldown_seconds": 0.2,
          "trigger": {
            "type": "hp_changed",
            "source": "self"
          }
        },
        {
          "stat": "HP%",
          "amount": [
            0.14,
            0.175,
            0.21,
            0.245,
            0.28
          ],
          "target": "self",
          "duration_seconds": 6,
          "max_stacks": 2,
          "cooldown_seconds": 0.2,
          "trigger": {
            "type": "other_hp_changed",
            "source": "team"
          }
        }
      ]
    },
    {
      "name": "月紡ぎの曙光",
      "buffs": [
        {
          "stat": "爆発バフ",
          "amount": [
            0.2,
            0.25,
            0.3,
            0.35,
            0.4
          ],
          "target": "self"
        },
        {
          "stat": "爆発バフ",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "conditions": [
            "source_energy_cost <= 60"
          ]
        },
        {
          "stat": "爆発バフ",
          "amount": [
            0.12,
            0.15,
            0.18,
            0.21,
            0.24
          ],
          "target": "self",
          "conditions": [
            "source_energy_cost <= 40"
          ]
        }
      ]
    },
    {
      "name": "静謐の笛",
      "buffs": [
        {
          "stat": "HP%",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "HP%",
          "amount": [
            0.16,
            0.2,
            0.24,
            0.28,
            0.32
          ],
          "target": "self",
          "duration_seconds": 12,
          "conditions": [
            "moon_sign_count >= 2"
          ],
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "銀の釭JP0D",
      "buffs": [
        {
          "stat": "熟知",
          "amount": [
            52,
            65,
            78,
            91,
            104
          ],
          "target": "self",
          "duration_seconds": 12,
          "max_stacks": 2,
          "independent_stacks": true,
          "trigger": {
            "type": "skill_used",
            "source": "self"
          }
        }
      ]
    }
  ],
  "artifacts": [
    {
      "name": "炉炎溶錬の心",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": 0.18,
          "target": "self"
        },
        {
          "stat": "攻撃力%",
          "amount": 0.12,
          "target": "self",
          "duration_seconds": 12,
          "trigger": {
            "type": "version_7_artifact_2_star_reaction",
            "source": "self"
          }
        },
        {
          "stat": "星電導バフ",
          "amount": 0.5,
          "target": "all",
          "duration_seconds": 12,
          "unique": true,
          "trigger": {
            "type": "version_7_artifact_2_star_reaction",
            "source": "self"
          }
        },
        {
          "stat": "星拡散バフ",
          "amount": 0.5,
          "target": "all",
          "duration_seconds": 12,
          "unique": true,
          "trigger": {
            "type": "version_7_artifact_2_star_reaction",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "紅血の証",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": 0.18,
          "target": "self"
        },
        {
          "stat": "会心率",
          "amount": 0.16,
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "red_blood_proof_star_swirl",
            "source": "self"
          }
        },
        {
          "stat": "星拡散バフ",
          "amount": 0.4,
          "target": "self",
          "duration_seconds": 10,
          "trigger": {
            "type": "red_blood_proof_star_swirl",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "影に沈む幻",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": 0.18,
          "target": "self"
        },
        {
          "stat": "超電導バフ",
          "amount": 0.8,
          "target": "self"
        },
        {
          "stat": "星電導バフ",
          "amount": 0.4,
          "target": "self"
        },
        {
          "stat": "会心率",
          "amount": 0.16,
          "target": "self"
        }
      ]
    },
    {
      "name": "暁の星と月の歌",
      "buffs": [
        {
          "stat": "熟知",
          "amount": 80,
          "target": "self"
        },
        {
          "stat": "月バフ",
          "amount": 0.2,
          "target": "self"
        },
        {
          "stat": "月バフ",
          "amount": 0.6,
          "target": "self",
          "conditions": [
            "moon_sign_count >= 2"
          ]
        }
      ]
    },
    {
      "name": "月を紡ぐ夜の歌",
      "buffs": [
        {
          "stat": "チャージ効率",
          "amount": 0.2,
          "target": "self"
        },
        {
          "stat": "熟知",
          "amount": 60,
          "target": "all",
          "unique": true,
          "unique_group": "silken_moon_devotion_em_1",
          "conditions": [
            "moon_sign_count >= 1"
          ]
        },
        {
          "stat": "熟知",
          "amount": 60,
          "target": "all",
          "unique": true,
          "unique_group": "silken_moon_devotion_em_2",
          "conditions": [
            "moon_sign_count >= 2"
          ]
        },
        {
          "stat": "月バフ",
          "amount": 0.1,
          "target": "all",
          "unique": true,
          "unique_group": "silken_moon_devotion_lunar_buff"
        }
      ]
    },
    {
      "name": "華館夢醒形骸記",
      "buffs": [
        {
          "stat": "防御力%",
          "amount": 0.3,
          "target": "self"
        },
        {
          "stat": "防御力%",
          "amount": 0.06,
          "target": "self",
          "max_stacks": 4,
          "trigger": {
            "type": "husk_of_opulent_dreams_stack",
            "source": "self"
          }
        },
        {
          "stat": "岩バフ",
          "amount": 0.06,
          "target": "self",
          "max_stacks": 4,
          "trigger": {
            "type": "husk_of_opulent_dreams_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "天穹の顕現せし夜",
      "buffs": [
        {
          "stat": "熟知",
          "amount": 80,
          "target": "self"
        },
        {
          "stat": "会心率",
          "amount": 0.15,
          "target": "self",
          "conditions": [
            "moon_sign_count >= 1"
          ]
        },
        {
          "stat": "会心率",
          "amount": 0.15,
          "target": "self",
          "conditions": [
            "moon_sign_count >= 2"
          ]
        },
        {
          "stat": "月バフ",
          "amount": 0.1,
          "target": "all",
          "unique": true,
          "unique_group": "skys_unveiling_lunar_buff"
        }
      ]
    },
    {
      "name": "翠緑の影",
      "buffs": [
        {
          "stat": "風バフ",
          "amount": 0.15,
          "target": "self"
        },
        {
          "stat": "拡散バフ",
          "amount": 0.6,
          "target": "self"
        },
        {
          "stat": "星拡散バフ",
          "amount": 0.2,
          "target": "self"
        }
      ]
    },
    {
      "name": "深林の記憶",
      "buffs": [
        {
          "stat": "草バフ",
          "amount": 0.15,
          "target": "self"
        },
        {
          "stat": "草耐性ダウン",
          "amount": 0.3,
          "target": "all",
          "duration_seconds": 8,
          "triggers_any": [
            {
              "type": "skill_hit",
              "source": "self"
            },
            {
              "type": "burst_hit",
              "source": "self"
            }
          ]
        }
      ]
    },
    {
      "name": "旧貴族のしつけ",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 12,
          "trigger": {
            "type": "burst_used",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "天からの贈り物",
      "buffs": [
        {
          "stat": "チャージ効率",
          "amount": 0.2,
          "target": "self"
        }
      ]
    },
    {
      "name": "風立ちの日",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": 0.43,
          "target": "self"
        },
        {
          "stat": "会心率",
          "amount": 0.2,
          "target": "self",
          "conditions": [
            "is_hexenzirkel"
          ]
        }
      ]
    },
    {
      "name": "深廊の終曲",
      "buffs": [
        {
          "stat": "氷バフ",
          "amount": 0.15,
          "target": "self"
        },
        {
          "stat": "通常バフ",
          "amount": 0.6,
          "target": "self",
          "conditions": [
            "source_has_zero_energy"
          ],
          "disabled_by_attack_type": "burst",
          "disabled_duration_seconds": 6
        },
        {
          "stat": "爆発バフ",
          "amount": 0.6,
          "target": "self",
          "conditions": [
            "source_has_zero_energy"
          ],
          "disabled_by_attack_type": "normal",
          "disabled_duration_seconds": 6
        }
      ]
    },
    {
      "name": "教官",
      "buffs": [
        {
          "stat": "熟知",
          "amount": 120,
          "target": "all"
        }
      ],
      "duration_seconds": 8,
      "trigger": {
        "type": "field_elemental_reaction_triggered",
        "source": "self"
      }
    },
    {
      "name": "黄金の劇団",
      "buffs": [
        {
          "stat": "スキルバフ",
          "amount": 0.7,
          "target": "self"
        }
      ]
    },
    {
      "name": "長き夜の誓い",
      "buffs": [
        {
          "stat": "落下バフ",
          "amount": 0.25,
          "target": "self"
        },
        {
          "stat": "落下バフ",
          "amount": 0.15,
          "target": "self",
          "duration_seconds": 6,
          "max_stacks": 5,
          "trigger": {
            "type": "long_night_oath_stack",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "黒曜の秘典",
      "buffs": [
        {
          "stat": "ダメバフ",
          "amount": 0.15,
          "target": "self",
          "conditions": [
            "source_is_field",
            "source_has_night_soul"
          ]
        },
        {
          "stat": "会心率",
          "amount": 0.4,
          "target": "self",
          "duration_seconds": 6,
          "cooldown_seconds": 1,
          "trigger": {
            "type": "night_soul_consumed",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "遂げられなかった想い",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": 0.18,
          "target": "self"
        },
        {
          "stat": "ダメバフ",
          "amount_timeline": "unfinished_reverie_burning",
          "target": "self"
        }
      ]
    },
    {
      "name": "ファントムハンター",
      "buffs": [
        {
          "stat": "通常バフ",
          "amount": 0.15,
          "target": "self"
        },
        {
          "stat": "重撃バフ",
          "amount": 0.15,
          "target": "self"
        },
        {
          "stat": "会心率",
          "amount": 0.12,
          "target": "self",
          "duration_seconds": 5,
          "max_stacks": 3,
          "trigger": {
            "type": "hp_changed",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "金メッキの夢",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount_formula": "same_element_other_count * 0.14",
          "target": "self",
          "duration_seconds": 8,
          "cooldown_seconds": 8,
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount_formula": "different_element_other_count * 50",
          "target": "self",
          "duration_seconds": 8,
          "cooldown_seconds": 8,
          "trigger": {
            "type": "elemental_reaction_triggered",
            "source": "self"
          }
        },
        {
          "stat": "熟知",
          "amount": 80,
          "target": "self"
        }
      ]
    },
    {
      "name": "千岩牢固",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": 0.2,
          "target": "all",
          "duration_seconds": 3,
          "trigger": {
            "type": "skill_hit",
            "source": "self"
          }
        }
      ]
    },
    {
      "name": "絶縁の旗印",
      "buffs": [
        {
          "stat": "チャージ効率",
          "amount": 0.2,
          "target": "self"
        }
      ]
    },
    {
      "name": "ATK36%",
      "buffs": [
        {
          "stat": "攻撃力%",
          "amount": 0.36,
          "target": "self"
        }
      ]
    },
    {
      "name": "EM160",
      "buffs": [
        {
          "stat": "熟知",
          "amount": 160,
          "target": "self"
        }
      ]
    }
  ],
  "schema": {
    "buff": {
      "stat": "攻撃力%",
      "amount": 0,
      "amount_by_talent_level": {},
      "amount_formula": "",
      "target": "self",
      "duration_seconds": 0,
      "cooldown_seconds": 0,
      "trigger": {
        "type": "always",
        "source": "self"
      },
      "conditions": []
    },
    "stats": [
      "防御無視%",
      "防御デバフ%",
      "攻撃速度",
      "熟知",
      "攻撃力%",
      "攻撃力実数",
      "HP%",
      "HP実数",
      "防御力%",
      "防御力実数",
      "チャージ効率",
      "天賦レベル",
      "全天賦レベル",
      "通常天賦レベル",
      "通常攻撃天賦レベル",
      "スキル天賦レベル",
      "元素スキル天賦レベル",
      "爆発天賦レベル",
      "元素爆発天賦レベル",
      "独立乗算",
      "通常独立乗算",
      "重撃独立乗算",
      "スキル独立乗算",
      "爆発独立乗算",
      "ダメバフ",
      "通常バフ",
      "通常実数ダメージ加算",
      "重撃バフ",
      "重撃実数ダメージ加算",
      "落下バフ",
      "落下実数ダメージ加算",
      "スキルバフ",
      "スキル実数ダメージ加算",
      "爆発バフ",
      "爆発実数ダメージ加算",
      "風バフ",
      "岩バフ",
      "雷バフ",
      "草バフ",
      "水バフ",
      "炎バフ",
      "氷バフ",
      "物理バフ",
      "全元素バフ",
      "月バフ",
      "拡散バフ",
      "結晶バフ",
      "蒸発バフ",
      "溶解バフ",
      "感電バフ",
      "超電導バフ",
      "開花バフ",
      "超開花バフ",
      "烈開花バフ",
      "月感電バフ",
      "月開花バフ",
      "月結晶バフ",
      "星電導バフ",
      "星拡散バフ",
      "風耐性ダウン",
      "岩耐性ダウン",
      "雷耐性ダウン",
      "草耐性ダウン",
      "水耐性ダウン",
      "炎耐性ダウン",
      "氷耐性ダウン",
      "物理耐性ダウン",
      "月感電基礎ダメ加算",
      "月開花基礎ダメ加算",
      "月結晶基礎ダメ加算",
      "星電導基礎ダメ加算",
      "星拡散基礎ダメ加算",
      "向上",
      "会心率",
      "スキル会心率",
      "爆発会心率",
      "落下会心率",
      "会心ダメ",
      "スキル会心ダメ",
      "爆発会心ダメ",
      "落下会心ダメ",
      "月会心率",
      "月開花会心率",
      "風会心ダメ",
      "岩会心ダメ",
      "雷会心ダメ",
      "草会心ダメ",
      "水会心ダメ",
      "炎会心ダメ",
      "氷会心ダメ",
      "月会心ダメ",
      "星会心ダメ",
      "月開花会心ダメ",
      "星電導会心ダメ",
      "星拡散会心ダメ"
    ],
    "targets": [
      "self",
      "all",
      "other",
      "field",
      "field_other",
      "healed",
      "healed_other",
      "pyro",
      "hydro",
      "electro",
      "cryo",
      "anemo",
      "geo",
      "dendro"
    ],
    "triggers": [
      "always",
      "rotation_start",
      "combo_used",
      "skill_hit",
      "field_skill_hit",
      "wolf_fang_skill_hit",
      "skill_hydro_or_dendro_hit",
      "burst_hit",
      "normal_hit",
      "field_normal_hit",
      "charged_hit",
      "field_charged_hit",
      "field_plunge_hit",
      "key_of_khaj_nisut_grand_hymn_stack",
      "key_of_khaj_nisut_team_em",
      "normal_or_charged_hit",
      "field_burst_hit",
      "wolf_fang_burst_hit",
      "skill_used",
      "normal_skill_used",
      "hold_skill_used",
      "burst_used",
      "skill_or_burst_used",
      "special_burst_used",
      "burst_or_special_burst_used",
      "shield_created",
      "field_shield_created",
      "shield_inactive",
      "elemental_reaction_triggered",
      "field_elemental_reaction_triggered",
      "team_field_geo_damage_hit",
      "team_pyro_reaction_triggered",
      "wisdom_molten_flame_reaction",
      "star_reaction_triggered",
      "cryo_or_hydro_reaction_triggered",
      "swirl_or_star_swirl_reaction_triggered",
      "other_skill_used",
      "prospector_drill_conflict",
      "portable_power_saw_rouse",
      "falca_azure_fang_oath",
      "citlali_itzpapa_freeze_or_melt",
      "lunar_bloom_reaction",
      "lunar_reaction_or_damage",
      "normal_or_plunge_hit",
      "plunge_hit",
      "vivid_heart_plunge_cast",
      "vivid_heart_skill_or_burst_used",
      "lunar_bloom_damage",
      "lunar_crystallize_damage",
      "healing_done",
      "healing_received",
      "hp_changed",
      "wriothesley_gracious_rebuke_stack",
      "other_hp_changed",
      "night_soul_consumed",
      "night_soul_burst",
      "long_night_oath_stack",
      "peak_patrol_two_stack",
      "fang_of_the_mountain_king_stack",
      "rainslasher_hydro_or_electro_aura",
      "dragons_bane_hydro_or_pyro_aura",
      "white_lake_winter_plume_skill_stack",
      "staff_of_the_scarlet_sands_skill_stack",
      "wolfish_wold_four_winds_poem_stack",
      "surfing_time_summer_stack",
      "tulaytullah_remembrance_normal_stack",
      "memory_of_dust_stack",
      "field_refresh_attack_stack",
      "lost_prayer_field_stack",
      "kings_game_board_rule",
      "wandering_evenstar_cycle",
      "sacrificial_jade_off_field",
      "ballad_of_boundless_blue_stack",
      "fruit_of_fulfillment_stack",
      "freedom_sworn_millennial_song",
      "elegy_for_the_end_millennial_song",
      "lumidouce_elegy_stack",
      "verdict_pact_stack",
      "star_edge_sword_hit",
      "arosha_mark_activation"
    ],
    "trigger_notes": {
      "always": "triggerを書かない、またはtypeをalwaysにすると常時発動。",
      "cooldown_seconds": "任意。triggerで発動するバフに設定すると、前回発動から指定秒数経過するまで再発動しない。例: 10秒に1回なら10。",
      "rotation_start": "ローテ開始時からduration_seconds秒だけ有効。",
      "combo_used": "装備者が何かしらのコンボを使った時に発動。trigger.sequenceを書くと特定sequenceだけにできる。",
      "skill_hit": "装備者の元素スキル扱いの攻撃が敵に命中した時に発動。hits.jsonの元素スキル追撃も対象。",
      "field_skill_hit": "装備者がフィールド上にいる時、元素スキル扱いの攻撃が敵に命中した時に発動。待機中の設置・追撃は対象外。",
      "wolf_fang_skill_hit": "狼牙専用。装備者が表にいる時、combo.json由来の元素スキル扱い攻撃を敵に命中させた時に発動。設置・追撃・周期ヒットは対象外。",
      "skill_hydro_or_dendro_hit": "装備者の元素スキル扱いの水元素または草元素ダメージが敵に命中した時に発動。",
      "burst_hit": "装備者の元素爆発扱いの攻撃が敵に命中した時に発動。",
      "normal_hit": "装備者の通常攻撃が敵に命中した時に発動。",
      "field_normal_hit": "装備者がフィールド上にいる時、通常攻撃が敵に命中した時に発動。待機中の追撃は対象外。",
      "charged_hit": "装備者の重撃が敵に命中した時に発動。",
      "field_charged_hit": "装備者がフィールド上にいる時、重撃が敵に命中した時に発動。待機中の追撃は対象外。",
      "field_plunge_hit": "装備者がフィールド上にいる時、落下攻撃が敵に命中した時に発動。待機中の追撃は対象外。",
      "key_of_khaj_nisut_grand_hymn_stack": "聖顕の鍵専用。装備者がフィールド上にいる時、元素スキル命中で壮大な詩篇を1層獲得。0.3秒に1層、最大3層、各層20秒独立。",
      "key_of_khaj_nisut_team_em": "聖顕の鍵専用。壮大な詩篇が3層に到達した時、または3層状態で更新された時にチーム熟知バフを付与。",
      "normal_or_charged_hit": "装備者の通常攻撃または重撃が敵に命中した時に発動。",
      "field_burst_hit": "装備者がフィールド上にいる時、元素爆発扱いの攻撃が敵に命中した時に発動。待機中の設置・追撃は対象外。",
      "wolf_fang_burst_hit": "狼牙専用。装備者が表にいる時、combo.json由来の元素爆発扱い攻撃を敵に命中させた時に発動。設置・追撃・周期ヒットは対象外。",
      "skill_used": "装備者がE/hE/sE系の攻撃を使った時に発動。コンボ内にE/hE/sEがある場合は、その攻撃ヒット時に発動する。E1、sE-1なども対象。追撃ラベルは除外。",
      "normal_skill_used": "装備者がE/hE系の攻撃を使った時に発動。sEは含めない。",
      "hold_skill_used": "装備者がhE系の攻撃を使った時に発動。コンボ内にhEがある場合は、その攻撃ヒット時に発動する。E/sEと追撃ラベルは含めない。",
      "burst_used": "装備者がQまたはsQ系の攻撃を使った時に発動。コンボ内にQ/sQがある場合は、その攻撃ヒット時に発動する。追撃ラベルは含めない。",
      "skill_or_burst_used": "装備者がE/hE/sE/Q/sQ系の攻撃を使った時に発動。コンボ内にE/hE/sE/Q/sQがある場合は、その攻撃ヒット時に発動する。追撃ラベルは除外。",
      "special_burst_used": "装備者がsQを使った時に発動。",
      "burst_or_special_burst_used": "装備者がQまたはsQ系の攻撃を使った時に発動。コンボ内にQ/sQがある場合は、その攻撃ヒット時に発動する。burst_usedとspecial_burst_usedのORを明示したい時用。",
      "shield_created": "装備者がシールドを生成できる行動を使った時に発動。対象キャラと行動はcalc.jsのSHIELD_GENERATION_RULESで管理。",
      "field_shield_created": "装備者がフィールド上にいる時、装備者がシールドを生成できる行動を使った時に発動。対象キャラと行動はcalc.jsのSHIELD_GENERATION_RULESで管理。",
      "shield_inactive": "チームがシールド状態でない間だけ有効。triggers_allでskill_hitなどと組み合わせると、シールドなし状態で命中した時だけ発動できる。",
      "elemental_reaction_triggered": "装備者自身が元素反応を起こした時に発動。反応ログにsourceSlotがある反応のみ対象。",
      "field_elemental_reaction_triggered": "装備者がフィールド上にいる時、装備者自身が元素反応を起こした時に発動。反応ログにsourceSlotがある反応のみ対象。",
      "team_field_geo_damage_hit": "チーム内キャラクターがフィールド上で岩元素ダメージを与えた時に発動。待機中の設置・追撃は対象外。",
      "team_pyro_reaction_triggered": "チーム内キャラクターが炎元素に関連する元素反応を起こした時に発動。",
      "wisdom_molten_flame_reaction": "知恵の溶炎専用。装備者自身が感電/月感電/開花/月開花/結晶/月結晶反応を起こした時に発動。15秒に1回まで。",
      "star_reaction_triggered": "装備者自身が星電導または星拡散反応を起こした時に発動。星反応ダメージを与えた時は含めない。",
      "cryo_or_hydro_reaction_triggered": "装備者自身が氷元素または水元素に関連する元素反応を起こした時に発動。",
      "swirl_or_star_swirl_reaction_triggered": "装備者がフィールド上にいる時、装備者自身が拡散または星拡散反応を起こした時に発動。",
      "other_skill_used": "チーム内の装備者以外のキャラクターがE/hE/sE系の攻撃を使った時に発動。追撃ラベルは除外。",
      "prospector_drill_conflict": "プロスペクタードリル専用。治療を与える/受けると団結マークを最大3枚獲得し、skill_or_burst_used時に全消費。消費枚数ぶんのスタックとして10秒有効、15秒に1回まで。",
      "portable_power_saw_rouse": "携帯型チェーンソー専用。治療を与える/受けると強靭マークを最大3枚獲得し、skill_or_burst_used時に全消費。消費枚数ぶんのスタックとして10秒有効、15秒に1回まで。",
      "falca_azure_fang_oath": "ファルカ専用。付近にいるチーム内キャラクターが拡散または星拡散反応を起こした時、蒼牙の誓いを1層獲得。反応を起こしたキャラクターごとに1秒に1層まで、最大4層、継続8秒。",
      "citlali_itzpapa_freeze_or_melt": "シトラリ専用。イツパパが存在している間にチーム内キャラクターが凍結または溶解反応を起こした時に発動。",
      "lunar_bloom_reaction": "月開花反応が起こった時に発動。trigger.sourceをteamにするとチーム内の誰が起こしても発動。",
      "lunar_reaction_or_damage": "装備者自身が月感電/月開花/月結晶反応を起こした時、または装備者自身が月感電/月開花/月結晶扱いダメージを与えた時に発動。",
      "lunar_electro_charged_or_damage": "装備者自身が月感電反応を起こした時、または装備者自身が月感電扱いダメージを与えた時に発動。雷雲の継続ダメージ参加者判定は含めない。",
      "lunar_bloom_damage": "装備者自身が月開花扱いダメージを与えた時に発動。月開花反応そのものでは発動しない。",
      "lunar_crystallize_damage": "装備者自身が月結晶扱いダメージを与えた時に発動。月結晶反応そのものでは発動しない。",
      "healing_done": "装備者自身がHP回復効果を発生させた時に発動。HPが上限で実際のHPが増えなくても、治療対象になっていれば発動対象に含める。target: healedは治療対象、healed_otherは装備者以外の治療対象。",
      "healing_received": "装備者自身がHP回復効果を受けた時に発動。HPが上限で実際のHPが増えなくても、治療対象になっていれば発動する。",
      "hp_changed": "装備者自身の現在HPが実際に増減した時に発動。HP上限時に回復を受けてHPが増えない場合など、変動量0のイベントでは発動しない。",
      "wriothesley_gracious_rebuke_stack": "リオセスリ専用。元素スキル発動から14秒以内、かつその間に裏へ戻っていない状態でリオセスリ自身の現在HPが実際に増減した時、抵罪の赦免を1層獲得。最大5層、強化状態終了まで有効。",
      "other_hp_changed": "装備者以外のチーム内キャラクターの現在HPが実際に増減した時に発動。HP上限時に回復を受けてHPが増えない場合など、変動量0のイベントでは発動しない。",
      "night_soul_consumed": "装備者がフィールド上にいる時に夜魂値を消費した時に発動。夜魂値の獲得では発動しない。",
      "night_soul_burst": "夜魂バーストが発生した時に発動。trigger.sourceをselfにすると装備者自身が起こした夜魂バーストのみ、teamにするとチーム内の誰が起こしても発動。",
      "long_night_oath_stack": "長き夜の誓い専用。装備者の落下攻撃命中で1層、重撃または元素スキル命中で2層獲得。落下/重撃/スキルそれぞれ1秒に1回まで、最大5層、各層6秒独立。",
      "normal_or_plunge_hit": "装備者の通常攻撃または落下攻撃が命中した時に発動。岩峰を巡る歌はこのtriggerを最大2層として扱う。",
      "plunge_hit": "装備者の落下攻撃が命中した時に発動。",
      "vivid_heart_plunge_cast": "ヴィヴィッド・ハート専用。落下攻撃を行う時に発動し、hP/lP/shPなどの着地時の衝撃が命中した0.1秒後に解除。",
      "vivid_heart_skill_or_burst_used": "ヴィヴィッド・ハート専用。元素スキルまたは元素爆発を使った時に発動し、hP/lP/shPなどの着地時の衝撃が命中した0.1秒後に解除。",
      "peak_patrol_two_stack": "岩峰を巡る歌専用。normal_or_plunge_hitの2層到達時、または2層状態の更新時に発動。",
      "fang_of_the_mountain_king_stack": "山の王の長牙専用。元素スキル命中で1層、チーム内キャラクターが燃焼または烈開花反応を起こした時に3層獲得。各層6秒独立。",
      "rainslasher_hydro_or_electro_aura": "雨裁専用。攻撃命中直前に敵へ水または雷元素が付着している時、その攻撃だけダメバフ。",
      "dragons_bane_hydro_or_pyro_aura": "匣中滅龍専用。攻撃命中直前に敵へ水または炎元素が付着している時、その攻撃だけダメバフ。",
      "bp_claymore_cycle": "シンフォニーの鋳影専用。ローテ開始から攻撃力%、熟知、星電導/星拡散バフを10秒ごとに順番で獲得。装備者が星電導または星拡散反応を起こすと現在枠を12秒延長、延長は12秒に1回まで。",
      "white_lake_winter_plume_skill_stack": "白銀の湖を舞う翼専用。元素スキル命中で攻撃力%を1層獲得。0.1秒に1層、最大3層、継続8秒。",
      "staff_of_the_scarlet_sands_skill_stack": "赤砂の杖専用。装備者の元素スキル扱い攻撃が命中した時、赤砂の夢を1層獲得。最大3層、各層10秒独立。E/sE/hE由来のskill扱いヒットを対象にする。",
      "wolfish_wold_four_winds_poem_stack": "狼の武勲詩専用。通常攻撃命中で1層、skill_usedまたは重撃で2層の四風の詩を獲得。0.01秒に1回、最大4層、各層4秒独立。",
      "surfing_time_summer_stack": "サーフィンタイム専用。元素スキル発動後14秒間、盛夏4層から開始。通常攻撃命中で1層消費、蒸発反応で1層獲得。どちらも1.5秒に1回、最大4層。",
      "tulaytullah_remembrance_normal_stack": "トゥライトゥーラの記憶専用。元素スキル発動後14秒間、1秒ごとに1単位、通常攻撃命中で2単位獲得。通常命中は0.3秒に1回、最大10単位。退場または再スキルでリセット。",
      "memory_of_dust_stack": "浮世の錠専用。装備者がフィールド上にいる時、装備者の攻撃命中で1層獲得。0.3秒に1回、最大5層、各層8秒独立。待機中の攻撃は対象外。",
      "lost_prayer_field_stack": "四風原典専用。装備者がフィールド上にいる間、4秒ごとに1層獲得。最大4層、退場するとリセット。",
      "kings_game_board_rule": "諸王の対局専用。skill_usedで6秒有効、12秒に1回まで。効果中の重撃命中で6秒延長、延長は最大6秒まで。",
      "wandering_evenstar_cycle": "彷徨える星専用。ローテ開始から10秒ごとに12秒間発動。待機中でも発動し、複数武器で重ね掛け可能。",
      "sacrificial_jade_off_field": "古祠の瓏専用。待機時間が5秒を超えると有効。装備者が登場して10秒間フィールドに残ると解除。",
      "ballad_of_boundless_blue_stack": "果てなき紺碧の唄専用。通常攻撃または重撃命中で1層獲得。0.3秒に1回、最大3層、各層6秒独立。通常バフと重撃バフの両方に同じ層数を使う。",
      "fruit_of_fulfillment_stack": "満悦の実専用。装備者が元素反応を起こすと盈虚を1層獲得。0.3秒に1層まで、最大5層。元素反応を起こさないでいると6秒ごとに1層失う。",
      "freedom_sworn_millennial_song": "蒼古なる自由への誓い専用。装備者が元素反応を起こすと0.5秒に1回まで奮起の欠片を獲得。2枚でチームに千年の大楽章·抗争の歌を12秒付与し、その後20秒間は欠片を獲得しない。",
      "elegy_for_the_end_millennial_song": "終焉を嘆く詩専用。装備者の元素スキルまたは元素爆発扱いの攻撃が敵に命中すると0.2秒に1回まで追憶の欠片を獲得。4枚でチームに千年の大楽章·別れの歌を12秒付与し、その後20秒間は欠片を獲得しない。待機中の命中も対象。",
      "field_refresh_attack_stack": "和璞鳶/破天の槍/無工の剣/斬山の刃専用。装備者がフィールド上にいる時、装備者の攻撃命中で1層獲得。0.3秒に1回、最大層まで増加し、新規獲得ごとに全スタックの継続時間を更新。待機中の攻撃は対象外。",
      "husk_of_opulent_dreams_stack": "華館夢醒形骸記専用。装備者が表で岩元素攻撃を命中させると0.3秒に1層、待機中は3秒ごとに1層獲得。最大4層。6秒獲得しないと1層ずつ失う。",
      "lumidouce_elegy_stack": "ルミドゥースの挽歌専用。装備者が燃焼反応を起こした時、または燃焼状態の敵に草元素ダメージを与えた時に1層獲得。最大2層、新規獲得ごとに全スタックの継続時間を更新。",
      "verdict_pact_stack": "裁断専用。チーム内キャラクターが結晶または月結晶反応を起こした時、契印を1層獲得。月結晶反応による獲得は1秒に1層まで。最大2層、各層15秒独立。装備者の元素スキルがダメージを与えた0.2秒後に全層クリア。",
      "star_edge_sword_hit": "星鋒の剣専用。IDが10000007-○または10000005-○の旅人が装備している時のみ、装備者の攻撃命中で発動。5秒に1回、裏からでも発動。",
      "arosha_mark_activation": "アリョーシャ専用。マーク付与済みの敵へ再度E/hEを命中、またはトゥガリン攻撃が命中した時にマークをアクティブ化して発動。6凸時は最大2層まで重ね掛け可能。"
    },
    "field_notes": {
      "disabled_by_attack_type": "任意。指定したattack_typeの攻撃がダメージを与えた後、disabled_duration_seconds秒間このバフを無効化する。例: normal / burst。",
      "disabled_duration_seconds": "disabled_by_attack_typeで無効化する秒数。深廊の終曲の通常/爆発バフ切替などに使う。",
      "night_soul": "combo.json / hits.json の攻撃定義に true を書くと、その攻撃ログを夜魂性質として保持する。未指定またはfalseなら通常攻撃扱い。"
    },
    "condition_variables": [
      "constellation",
      "refinement",
      "rotation_time",
      "skill_used_count",
      "hold_skill_used",
      "burst_used",
      "natlan_count",
      "natlan_divisor",
      "hexenzirkel_count",
      "is_hexenzirkel",
      "moon_sign_count",
      "pech_count",
      "has_2_pech",
      "pyro_count",
      "hydro_count",
      "electro_count",
      "cryo_count",
      "anemo_count",
      "geo_count",
      "dendro_count",
      "has_xilonen",
      "has_venti",
      "has_star_swirl",
      "field_slot",
      "field_is_radiant_star_superconduct",
      "field_is_radiant_star_swirl",
      "field_is_moon_sign",
      "field_constellation",
      "field_has_night_soul",
      "team_has_shield",
      "team_shield_inactive",
      "source_has_shield",
      "source_shield_inactive",
      "field_has_shield",
      "field_shield_inactive",
      "field_pyro",
      "field_hydro",
      "field_electro",
      "field_cryo",
      "field_anemo",
      "field_geo",
      "field_dendro",
      "source_is_field",
      "source_is_active",
      "source_is_off_field",
      "has_zero_energy",
      "source_has_zero_energy",
      "field_has_zero_energy",
      "source_has_night_soul",
      "same_element_other_count",
      "different_element_other_count",
      "is_traveler",
      "source_is_traveler",
      "source_is_pyro",
      "source_is_hydro",
      "source_is_electro",
      "source_is_cryo",
      "source_is_anemo",
      "source_is_geo",
      "source_is_dendro",
      "source_is_radiant_star_superconduct",
      "source_is_radiant_star_swirl",
      "is_radiant_star_superconduct",
      "is_radiant_star_swirl",
      "kagura_verity_stacks",
      "peak_patrol_song_stacks",
      "white_lake_winter_plume_stacks",
      "field_refresh_attack_stacks",
      "lumidouce_elegy_stacks",
      "source_atk",
      "source_hp",
      "source_def",
      "source_em",
      "source_er",
      "source_energy_cost",
      "source_current_hp_percent",
      "base_atk",
      "base_hp",
      "base_def",
      "base_em",
      "artifact_atk_pct",
      "artifact_hp_pct",
      "artifact_hp_flat",
      "artifact_def_pct",
      "artifact_em"
    ],
    "condition_examples": [
      "triggers_allで複数triggerを書くとAND条件。例: skill_or_burst_used かつ shield_created",
      "triggers_anyで複数triggerを書くとOR条件。例: skill_hit または elemental_reaction_triggered",
      "source_shield_inactive",
      "field_shield_inactive",
      "constellation >= 6",
      "source_is_off_field",
      "source_is_field",
      "field_is_radiant_star_superconduct",
      "field_is_radiant_star_swirl",
      "is_hexenzirkel",
      "pech_count >= 2",
      "hydro_count >= 1",
      "source_hp >= 40000"
    ]
  }
};
