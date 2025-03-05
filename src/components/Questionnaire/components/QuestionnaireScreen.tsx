import AppLogo from '../../../assets/app_logo.svg';
import AppLogoInverted from '../../../assets/app_logo_inverted.svg';
import BackArrow from '../../../assets/back_arrow.svg';
import BackArrowInverted from '../../../assets/back_arrow_inverted.svg';
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

  const { backgroundClassName, textClassName, backIconSrc, logoIconSrc } = {
    default: {
      backgroundClassName: 'bg-surface-1',
      textClassName: 'text-font-main',
      logoIconSrc: AppLogo,
      backIconSrc: BackArrow,
    },
    accent: {
      backgroundClassName: 'bg-(image:--accent-gradient)',
      textClassName: 'text-font-inverted text-center',
      logoIconSrc: AppLogoInverted,
      backIconSrc: BackArrowInverted,
    },
  }[config.background];

  return (
    <div
      className={`flex flex-col items-center h-full w-full overflow-hidden ${backgroundClassName}`}
    >
      <div className="w-full h-14 items-center px-4 sm:px-0 grid grid-cols-3 justify-items-center">
        <button
          hidden={isFirst}
          onClick={handleBack}
          className="justify-self-start sm:justify-self-auto w-10 h-10"
        >
          <img src={backIconSrc} alt="Back arrow" />
        </button>
        <img
          src={logoIconSrc}
          alt="App logo. Stylized n for nebula"
          className="col-start-2 col-end-2"
        />
      </div>

      <h1
        className={`w-full sm:w-80 px-4 sm:px-0 text-2xl font-bold leading-7 mt-2 ${textClassName}`}
      >
        {config.title}
      </h1>
      <h2 className={`w-full sm:w-80 px-4 sm:px-0 text-sm mb-2 leading-7 mt-5 ${textClassName}`}>
        {config.instruction}
      </h2>
      <Answers config={config} onAnswer={onAnswer} />
    </div>
  );
}

export { QuestionnaireScreen };
