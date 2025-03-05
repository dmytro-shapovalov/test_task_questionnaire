interface Props {
  options: { value: string; text: string }[];
  onAnswer: (answer: string) => void;
}

function OpenQuestionAnswers({ options, onAnswer }: Props) {
  return (
    <ol className="grid row-auto gap-5 sm:justify-center overflow-auto p-4 w-full">
      {options.map(({ value, text }) => (
        <li key={value} className="w-full">
          <button
            className="bg-surface-2 border border-border-1 solid shadow-elevated-1 text-sm w-full sm:w-80 min-h-16 rounded-2xl px-4 py-2 text-pretty"
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
