import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { questionnaireActions, questionnaireSelectors } from '../../redux/questionnaire/slice';

import { QuestionnaireScreen } from './components/QuestionnaireScreen';

function Questionnaire() {
  const config = useAppSelector(questionnaireSelectors.current);

  const dispatch = useAppDispatch();

  function handleAnswer(answer: string) {
    dispatch(questionnaireActions.nextScreen(answer));
  }

  if (!config) {
    return 'Loading...';
  }

  return <QuestionnaireScreen config={config} onAnswer={handleAnswer} />;
}

export { Questionnaire };
