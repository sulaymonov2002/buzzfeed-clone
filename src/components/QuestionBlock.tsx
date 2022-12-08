import React from "react";
import { Question } from "../../interfaces";

const QuestionBlock = ({
  question,
  setChosenAnswerItems,
}: {
  question: Question;
  setChosenAnswerItems: Function;
}) => {
  const handleClick = () => {
    setChosenAnswerItems((prevState:string[]) => [...prevState, question.text]);
  };

  return (
    <button className="question-block" onClick={handleClick}>
      <img src={question.image} alt={question.alt} />
      <h3>{question.text}</h3>
      <p>
        <a href={question.image}>{question.credit}</a>
        <a href="https://www.unsplash.com">Unsplash</a>
      </p>
    </button>
  );
};

export default QuestionBlock;
