import a from './components/Questionnaire/configs/onboarding.json';
import { Questionnaire } from './components/Questionnaire/Questionnaire';
import { questionnaireConfigFileSchema } from './components/Questionnaire/types';

const { data } = questionnaireConfigFileSchema.parse(a);

function App() {
  return (
    <div className="flex justify-center">
      <Questionnaire config={data} />
    </div>
  );
}

export default App;
