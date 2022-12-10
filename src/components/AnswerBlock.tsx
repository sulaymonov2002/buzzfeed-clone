import React, { useEffect, useState } from "react";
import { Answer } from "../../interfaces";

const AnswerBlock = ({
  answerOptions,
  chosenAnswers,
}: {
  answerOptions: Answer[] | undefined;
  chosenAnswers: string[];
}) => {
  const [result, setResult] = useState<Answer | null>();

  useEffect(() => {
    answerOptions?.forEach((answer: Answer) => {
      if (
        chosenAnswers.includes(answer.combination[0]) &&
        chosenAnswers.includes(answer.combination[1]) &&
        chosenAnswers.includes(answer.combination[2])
      ) {
        setResult(answer);
      }
    });
  }, [chosenAnswers]);

  console.log(result);

  return (
    <div id="answer-block" className="answer-block">
      <h2>{result?.text}</h2>
      <img src={result?.image} alt={result?.text} />
    </div>
  );
};

export default AnswerBlock;
