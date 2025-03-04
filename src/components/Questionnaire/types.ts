import { z } from 'zod';

const conditionalReturn = /^.*\{(\w+\[[=><]\w+:\w+\]\})+.*$/gi;
const notConditionalReturn = /^[^{}[\]]*$/gi;

const _commonScreenSchema = z.object({
  id: z.string(),
  title: z.string(),
  instruction: z.string().optional(),
  nextStepId: z.union([
    z.string().regex(notConditionalReturn),
    z.string().regex(conditionalReturn),
  ]),
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
