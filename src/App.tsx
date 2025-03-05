import { useEffect } from 'react';

import a from './components/Questionnaire/configs/onboarding.json';
import { Questionnaire } from './components/Questionnaire/Questionnaire';
import { questionnaireConfigFileSchema } from './components/Questionnaire/types';
import { useAppDispatch } from './redux/hooks';
import { questionnaireActions } from './redux/questionnaire/slice';

const { data } = questionnaireConfigFileSchema.parse(a);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(questionnaireActions.setScreensConfig(data));
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      <Questionnaire />
    </div>
  );
}

export default App;
