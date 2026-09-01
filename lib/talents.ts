import type {
  CharacterData,
  PromoteData,
  SkillData,
} from "./types";

export type TalentEntry = {
  id: string;

  /*
   * Nanokaの天賦項目を安定して識別するための情報。
   *
   * 現在のNanokaレスポンスには
   * charged_damage_3 / damage_3 のような
   * 内部キーが直接含まれていないため、
   * param番号を sourceKey として保持する。
   *
   * 例:
   * {param6:F1P} → sourceKey = "param6"
   */
  sourceKey: string | null;
  descIndex: number;
  paramNumber: number | null;

  label: string;
  paramIndex: number | null;
  value: number | null;
  format: string | null;
  isPercent: boolean;
  hitCount: number;
};

export function getSkill(
  character: CharacterData,
  skillIndex: number
): SkillData | null {
  return character.skills?.[skillIndex] ?? null;
}

export function getTalentLevelData(
  character: CharacterData,
  skillIndex: number,
  talentLevel: number
): PromoteData | null {
  const skill =
    getSkill(
      character,
      skillIndex
    );

  if (!skill) {
    return null;
  }

  return (
    skill.promote?.[
      String(
        talentLevel - 1
      )
    ] ?? null
  );
}

function getHitCount(
  label: string
) {
  const match =
    label.match(
      /[×xX*]\s*(\d+)/
    );

  if (!match) {
    return 1;
  }

  return (
    Number(match[1]) ||
    1
  );
}

export function getTalentEntries(
  character: CharacterData,
  skillIndex: number,
  talentLevel: number
): TalentEntry[] {
  const levelData =
    getTalentLevelData(
      character,
      skillIndex,
      talentLevel
    );

  if (!levelData) {
    return [];
  }

  return levelData.desc
    .map<TalentEntry | null>(
      (
        text,
        index
      ) => {
        if (!text) {
          return null;
        }

        const [
          labelPart,
          expressionPart,
        ] =
          text.split("|");

        const label =
          labelPart?.trim() ||
          `項目 ${index + 1}`;

        if (
          !expressionPart
        ) {
          return {
            id:
              `${skillIndex}-${talentLevel}-${index}`,

            sourceKey: null,
            descIndex: index,
            paramNumber: null,

            label,
            paramIndex: null,
            value: null,
            format: null,
            isPercent: false,

            hitCount:
              getHitCount(
                label
              ),
          };
        }

        /*
         * 例:
         * {param6:F1P}
         *
         * match[1] = 6
         * match[2] = F1P
         */
        const match =
          expressionPart.match(
            /\{param(\d+)(?::([^}]+))?\}/
          );

        if (!match) {
          return {
            id:
              `${skillIndex}-${talentLevel}-${index}`,

            sourceKey: null,
            descIndex: index,
            paramNumber: null,

            label,
            paramIndex: null,
            value: null,
            format: null,
            isPercent: false,

            hitCount:
              getHitCount(
                label
              ),
          };
        }

        const paramNumber =
          Number(
            match[1]
          );

        const paramIndex =
          paramNumber - 1;

        const sourceKey =
          `param${paramNumber}`;

        const format =
          match[2] ??
          null;

        const value =
          levelData.param?.[
            paramIndex
          ] ?? null;

        const isPercent =
          Boolean(
            format?.includes(
              "P"
            )
          );

        return {
          id:
            `${skillIndex}-${talentLevel}-${index}`,

          sourceKey,
          descIndex: index,
          paramNumber,

          label,
          paramIndex,
          value,
          format,
          isPercent,

          hitCount:
            getHitCount(
              label
            ),
        };
      }
    )
    .filter(
      (
        entry
      ): entry is TalentEntry =>
        entry !== null
    );
}

export function formatTalentValue(
  entry: TalentEntry
) {
  if (
    entry.value ===
    null
  ) {
    return "-";
  }

  if (
    entry.isPercent
  ) {
    return `${(
      entry.value * 100
    ).toFixed(2)}%`;
  }

  if (
    entry.format?.includes(
      "I"
    )
  ) {
    return `${Math.round(
      entry.value
    )}`;
  }

  return entry.value.toFixed(
    2
  );
}
