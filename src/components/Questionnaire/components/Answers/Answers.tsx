import { assertExhausted } from '../../../../lib/typeHelpers';
import { ScreenConfig } from '../../types';

import { OpenQuestionAnswers } from './components/OpenQuestionAnswers';
import { YesNoAnswers } from './components/YesNoAnswers';

interface Props {
  config: ScreenConfig;
  onAnswer: (answer: string) => void;
}

function Answers({ config, onAnswer }: Props) {
  const { screenType } = config;

  switch (screenType) {
    case 'yesNoQuestion': {
      return <YesNoAnswers onAnswer={onAnswer} />;
    }
    case 'openQuestion': {
      return <OpenQuestionAnswers options={config.options} onAnswer={onAnswer} />;
    }
    case 'birthDate': {
      return 'Screen type birthDate is not supported yet.';
    }
    default:
      assertExhausted(screenType);
  }
}

export { Answers };
