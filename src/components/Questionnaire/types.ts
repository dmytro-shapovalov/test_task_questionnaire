import { z } from 'zod';

// TODO move capturing group names to constants and reuse in string matching
const _nonInterpolatedPart = '[^{}[\\]]';
const _interpolationPart = '\\{(?<field>\\w+)\\}'; // {personal_attitude}
const _interpolationWithMatchPart =
  '\\{(?<field>\\w+)\\[(?<operation>[=><])(?<match_value>\\w+):(?<return_value>[\\w ]+)\\]\\}'; // {personal_attitude[=cool:I'm cool with it!]}

function removeNamedCapturingGroups(str: string) {
  // Remove capturing groups from big regex to improve performance.
  //! This might introduce breaking behavior if some of the matched capturing groups will have quantifiers for the whole group.
  return str.replaceAll(
    /\(\?<.*?>(?<capturing_group_content>.*?)\)/g,
    '$<capturing_group_content>',
  );
}

const onlyInterpolation = RegExp(`${_interpolationPart}+`, 'g');
const mixed = RegExp(
  removeNamedCapturingGroups(
    `^((${_interpolationWithMatchPart})|(${_interpolationPart})|(${_nonInterpolatedPart}))+$`,
  ),
  'g',
);
const onlyInterpolationWithMatch = RegExp(`${_interpolationWithMatchPart}+`, 'g');
const nonInterpolated = RegExp(`^${_nonInterpolatedPart}*$`, 'g');

function isInterpolationGroups(val: unknown): val is { field: string } {
  return !!val && typeof val === 'object' && 'field' in val;
}

function isInterpolationWithMatchGroups(val: unknown): val is {
  field: string;
  operation: '=' | '<' | '>';
  match_value: string;
  return_value: string;
} {
  return (
    !!val &&
    typeof val === 'object' &&
    'field' in val &&
    'operation' in val &&
    'match_value' in val &&
    'return_value' in val
  );
}

const _maybeInterpolatedStringSchema = z.string().regex(mixed);

const _commonScreenSchema = z.object({
  id: z.string().regex(nonInterpolated),
  title: _maybeInterpolatedStringSchema,
  instruction: _maybeInterpolatedStringSchema.optional(),
  nextStepId: _maybeInterpolatedStringSchema.optional(),
  background: z.union([z.literal('default'), z.literal('accent')]),
});

const informationScreenSchema = _commonScreenSchema.extend({
  screenType: z.literal('information'),
});

const birthDateScreenSchema = _commonScreenSchema.extend({
  screenType: z.literal('birthDate'),
});

const yesNoQuestionScreenSchema = _commonScreenSchema.extend({
  screenType: z.literal('yesNoQuestion'),
});

const openQuestionScreenSchema = _commonScreenSchema.extend({
  screenType: z.literal('openQuestion'),
  options: z.array(z.object({ text: z.string(), value: z.string() })),
});

const screenSchema = z.discriminatedUnion('screenType', [
  informationScreenSchema,
  birthDateScreenSchema,
  yesNoQuestionScreenSchema,
  openQuestionScreenSchema,
]);

const questionnaireSchema = z.array(screenSchema);

const questionnaireConfigFileSchema = z.object({ data: questionnaireSchema, $schema: z.string() });

type ScreenConfig = z.infer<typeof screenSchema>;

type QuestionnaireConfig = z.infer<typeof questionnaireSchema>;

export {
  isInterpolationGroups,
  isInterpolationWithMatchGroups,
  onlyInterpolation,
  onlyInterpolationWithMatch,
  type QuestionnaireConfig,
  questionnaireConfigFileSchema,
  type ScreenConfig,
};
