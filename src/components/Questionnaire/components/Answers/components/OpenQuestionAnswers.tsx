interface Props {
  options: { value: string; text: string }[];
  onAnswer: (answer: string) => void;
}

function OpenQuestionAnswers({ options, onAnswer }: Props) {
  return (
    <ol className="grid row-auto gap-2 justify-center">
      {options.map(({ value, text }) => (
        <li key={value}>
          <button
            className="bg-amber-300 w-36 min-h-16 rounded-2xl"
            onClick={() => onAnswer(value)}
          >
            {text}
          </button>
        </li>
      ))}
    </ol>
  );
}

export { OpenQuestionAnswers };
