import { ScreenConfig } from '../types';

import { Answers } from './Answers/Answers';

interface Props {
  config: ScreenConfig;
  onAnswer: (answer: string) => void;
}

function QuestionnaireScreen({ config, onAnswer }: Props) {
  return (
    <div>
      <h3>{config.title}</h3>
      <h5>{config.instruction}</h5>
      <Answers config={config} onAnswer={onAnswer} />
    </div>
  );
}

export { QuestionnaireScreen };
