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

  return (
    <div>
      <button hidden={isFirst} onClick={handleBack} className="bg-red-300">
        Back
      </button>
      <h3>{config.title}</h3>
      <h5>{config.instruction}</h5>
      <Answers config={config} onAnswer={onAnswer} />
    </div>
  );
}

export { QuestionnaireScreen };
