interface Props {
  answers: { question: string; answer: string | undefined }[];
}

function Results({ answers }: Props) {
  return (
    <ol className="w-full flex flex-col items-center">
      {answers.map(({ answer, question }) => (
        <li key={question} className="flex flex-col sm:w-80 mb-4">
          <div>
            <span className="font-bold">Question:</span> {question}
          </div>
          <div>
            <span className="font-bold">Answer:</span> {answer}
          </div>
        </li>
      ))}
    </ol>
  );
}

export { Results };
