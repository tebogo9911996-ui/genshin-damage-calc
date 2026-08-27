export type BuffTarget =
  | "self"
  | "all"
  | "other"
  | "field"
  | "field_other"
  | "team"
  | "healed"
  | "healed_other"
  | "pyro"
  | "hydro"
  | "electro"
  | "cryo"
  | "anemo"
  | "geo"
  | "dendro";

export type BuffTrigger = {
  type: string;
  source?: "self" | "team";
  sequence?: string;
};

export type BuffDefinition = {
  stat: string;
  amount?: number | number[] | string;
  amount_formula?: string;
  amount_by_talent_level?: Record<string, number>;
  formula_amount_by_talent_level?: Record<string, number>;
  talent?: string;
  talent_title?: string;
  talent_level_bonus_constellation?: number | null;
  target?: BuffTarget;
  duration_seconds?: number;
  cooldown_seconds?: number;
  max_stacks?: number;
  independent_stacks?: boolean;
  unique?: boolean;
  unique_group?: string;
  trigger?: BuffTrigger;
  triggers_any?: BuffTrigger[];
  triggers_all?: BuffTrigger[];
  conditions?: string[];
  target_conditions?: string[];
  disabled_by_attack_type?: string;
  disabled_duration_seconds?: number;
  exclude_from_reference_stats?: boolean;
  amount_timeline?: string;
};

export type BuffSourceEntry = {
  name: string;
  buffs: BuffDefinition[];
  duration_seconds?: number;
  trigger?: BuffTrigger;
};

export type BuffDataFile = {
  characters: BuffSourceEntry[];
  weapons: BuffSourceEntry[];
  artifacts: BuffSourceEntry[];
  schema?: unknown;
};

/*
 * =========================
 * バフ判定用コンテキスト
 * =========================
 *
 * 将来的にキャラ・武器・聖遺物を同じ仕組みで
 * 判定するための共通入力。
 *
 * 現段階では「安全にON/OFFできること」を優先し、
 * 条件式そのものをevalせず、明示的なフラグで判定する。
 */
export type BuffContext = {
  /*
   * 聖遺物
   */
  fourPieceEnabled?: boolean;

  /*
   * 対象・配置
   */
  sourceOnField?: boolean;
  sourceOffField?: boolean;
  targetIsSelf?: boolean;

  /*
   * よく使う条件
   */
  targetAffectedBySuperconductOrStarConduction?: boolean;
  nightsoulBlessing?: boolean;
  obsidianCritActive?: boolean;
  goldenTroupeOffField?: boolean;
  millelithBuffActive?: boolean;
  noblesseBuffActive?: boolean;

  /*
   * スタック
   *
   * 単一スタック系は stackCount。
   * 将来、複数の独立スタックを扱う場合は namedStacks。
   */
  stackCount?: number;
  namedStacks?: Record<string, number>;

  /*
   * 条件・トリガーを文字列で明示的に有効化するための汎用欄。
   *
   * buffData.ts 内の conditions / trigger.type と
   * 一致する文字列を入れる。
   */
  activeConditions?: string[];
  activeTriggers?: string[];

  /*
   * 対象絞り込みが必要な場合に使用。
   */
  allowedTargets?: BuffTarget[];

  /*
   * 将来の式評価用。
   * amount_formula の安全なパーサーを追加した後に利用する。
   */
  variables?: Record<string, number>;
};
