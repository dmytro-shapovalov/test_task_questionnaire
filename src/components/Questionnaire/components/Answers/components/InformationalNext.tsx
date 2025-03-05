import { OpenQuestionAnswers } from './OpenQuestionAnswers';

interface Props {
  onAnswer: (answer: string) => void;
}

function InformationalNext({ onAnswer }: Props) {
  return <OpenQuestionAnswers options={[{ text: 'Next', value: '' }]} onAnswer={onAnswer} />;
}

export { InformationalNext };
