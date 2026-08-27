export function getDefenseMultiplier(
  characterLevel: number,
  enemyLevel: number,
  defShredPercent = 0,
  defIgnorePercent = 0
) {
  const attacker = characterLevel + 100;

  const defender =
    (enemyLevel + 100) *
    (1 - defShredPercent / 100) *
    (1 - defIgnorePercent / 100);

  return attacker / (attacker + defender);
}

export function getResistanceMultiplier(
  enemyResistancePercent: number,
  resistanceShredPercent = 0
) {
  const resistance =
    (enemyResistancePercent -
      resistanceShredPercent) /
    100;

  if (resistance < 0) {
    return 1 - resistance / 2;
  }

  if (resistance < 0.75) {
    return 1 - resistance;
  }

  return 1 / (4 * resistance + 1);
}

export function getFinalAttack(
  totalBaseAttack: number,
  attackPercent: number,
  flatAttack: number
) {
  return (
    totalBaseAttack *
      (1 + attackPercent / 100) +
    flatAttack
  );
}

export function getCritMultiplier(
  critDamagePercent: number
) {
  return 1 + critDamagePercent / 100;
}

export function calculateDirectDamage({
  attack,
  multiplier,
  damageBonus,
  critDamage,
  defenseMultiplier,
  resistanceMultiplier,
}: {
  attack: number;
  multiplier: number;
  damageBonus: number;
  critDamage: number;
  defenseMultiplier: number;
  resistanceMultiplier: number;
}) {
  return (
    attack *
    multiplier *
    (1 + damageBonus / 100) *
    getCritMultiplier(critDamage) *
    defenseMultiplier *
    resistanceMultiplier
  );
}