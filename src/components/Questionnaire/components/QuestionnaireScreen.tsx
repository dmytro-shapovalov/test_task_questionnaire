import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { questionnaireActions, questionnaireSelectors } from '../../../redux/questionnaire/slice';
import { ScreenConfig } from '../types';

import { Answers } from './Answers/Answers';

interface Props {
  config: ScreenConfig;
  onAnswer: (answer: string) => void;
}

function QuestionnaireScreen({ config, onAnswer }: Props) {
  const dispatch = useAppDispatch();

  const isFirst = useAppSelector(questionnaireSelectors.isFirst);

  function handleBack() {
    dispatch(questionnaireActions.previousScreen());
  }

  const backgroundClassName = { default: 'bg-surface-1', accent: 'bg-(image:--accent-gradient)' }[
    config.background
  ];

  const textColorClassName = config.background === 'accent' ? 'text-white' : '';

  return (
    <div
      className={`flex flex-col items-center h-full w-full overflow-hidden ${backgroundClassName}`}
    >
      <button hidden={isFirst} onClick={handleBack} className="bg-red-300">
        Back
      </button>
      <h1
        className={`w-full sm:w-80 px-4 sm:px-0 text-2xl font-bold leading-7 ${textColorClassName}`}
      >
        {config.title}
      </h1>
      <h2 className={`w-full sm:w-80 px-4 sm:px-0 text-sm mb-2 ${textColorClassName}`}>
        {config.instruction}
      </h2>
      <Answers config={config} onAnswer={onAnswer} />
    </div>
  );
}

export { QuestionnaireScreen };
