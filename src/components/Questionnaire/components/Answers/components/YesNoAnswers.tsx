import { OpenQuestionAnswers } from './OpenQuestionAnswers';

interface Props {
  onAnswer: (answer: string) => void;
}

function YesNoAnswers({ onAnswer }: Props) {
  return (
    <OpenQuestionAnswers
      options={[
        { text: 'Yes', value: 'yes' },
        { text: 'No', value: 'no' },
      ]}
      onAnswer={onAnswer}
    />
  );
}

export { YesNoAnswers };
