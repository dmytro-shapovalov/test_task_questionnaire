import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { questionnaireActions, questionnaireSelectors } from '../../redux/questionnaire/slice';

import { QuestionnaireScreen } from './components/QuestionnaireScreen';
import { Results } from './components/Results';

function Questionnaire() {
  const config = useAppSelector(questionnaireSelectors.current);
  const answers = useAppSelector(questionnaireSelectors.answers);

  const dispatch = useAppDispatch();

  function handleAnswer(answer: string) {
    dispatch(questionnaireActions.nextScreen(answer));
  }

  if (!config) {
    return <Results answers={answers} />;
  }

  return <QuestionnaireScreen config={config} onAnswer={handleAnswer} />;
}

export { Questionnaire };
