import { QuestionnaireConfig } from './types';

interface Props {
  config: QuestionnaireConfig;
}

function Questionnaire({ config }: Props) {
  return <pre className="text-wrap">{JSON.stringify(config, undefined, 2)}</pre>;
}

export { Questionnaire };
