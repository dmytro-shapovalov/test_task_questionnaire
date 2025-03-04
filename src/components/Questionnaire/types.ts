import { z } from 'zod';

const interpolatedRegex = /^.*(\{\w+\})+.*$/gi;
const interpolatedRegexWithMatch = /^.*(\{\w+\[[=><]\w+:\w+\]\})+.*$/gi;
const nonInterpolatedRegex = /^[^{}[\]]*$/gi;

const _maybeInterpolated = z.union([
  z.string().regex(interpolatedRegex),
  z.string().regex(interpolatedRegexWithMatch),
  z.string().regex(nonInterpolatedRegex),
]);

const _commonScreenSchema = z.object({
  id: z.string().regex(nonInterpolatedRegex),
  title: _maybeInterpolated,
  instruction: _maybeInterpolated.optional(),
  nextStepId: _maybeInterpolated,
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

type Screen = z.infer<typeof screenSchema>;

const questionnaireSchema = z.object({ data: z.array(screenSchema), $schema: z.string() });

type Questionnaire = z.infer<typeof questionnaireSchema>;

export { type Questionnaire, questionnaireSchema, type Screen };
