import { z } from 'zod';

// TODO reuse parts of regExps
// TODO move capturing group names to constants and reuse in string matching
const interpolated = /^.*(?:\{\w+\})+.*$/gi; // Interpolation is {personal_attitude}!
const onlyInterpolation = /\{(?<field>\w+)\}/gi; // {personal_attitude}
const interpolatedWithMatch = /^.*(?:\{\w+\[[=><]\w+:\w+\]\})+.*$/gi; // Interpolation is {personal_attitude[=2:cool]}!
const onlyInterpolationWithMatch =
  /\{(?<field>\w+)\[(?<operation>[=><])(?<match_value>\w+):(?<return_value>\w+)\]\}/gi; // {personal_attitude[=2:cool]}
const nonInterpolated = /^[^{}[\]]*$/gi; // Interpolation is cool.

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

const _maybeInterpolatedStringSchema = z.union([
  z.string().regex(interpolated),
  z.string().regex(interpolatedWithMatch),
  z.string().regex(nonInterpolated),
]);

const _commonScreenSchema = z.object({
  id: z.string().regex(nonInterpolated),
  title: _maybeInterpolatedStringSchema,
  instruction: _maybeInterpolatedStringSchema.optional(),
  nextStepId: _maybeInterpolatedStringSchema,
  background: z.union([z.literal('default'), z.literal('accent')]),
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
