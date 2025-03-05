import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { questionnaireActions, questionnaireSelectors } from '../../redux/questionnaire/slice';

import { QuestionnaireScreen } from './components/QuestionnaireScreen';

function Questionnaire() {
  const config = useAppSelector(questionnaireSelectors.current);
  const answers = useAppSelector(questionnaireSelectors.answers);

  const dispatch = useAppDispatch();

  function handleAnswer(answer: string) {
    dispatch(questionnaireActions.nextScreen(answer));
  }

  if (!config) {
    return <pre>{JSON.stringify(answers, undefined, 2)}</pre>;
  }

  return <QuestionnaireScreen config={config} onAnswer={handleAnswer} />;
}

export { Questionnaire };
