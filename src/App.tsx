import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";
import { Content, QuizData } from "../interfaces";

const App = () => {
  const [quiz, setQuiz] = useState<QuizData | null>();
  const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([]);
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<
    number[] | undefined
  >([]);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/quiz-item ");
      const json = await response.json();
      setQuiz(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unansweredIds = quiz?.content?.map(({ id }: Content) => id);
    setUnansweredQuestionIds(unansweredIds);
  }, [quiz]);

  console.log(unansweredQuestionIds);

  useEffect(() => {
    if (unansweredQuestionIds) {
      if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true);
        const answerBlock = document.getElementById("answer-block");
        answerBlock?.scrollIntoView({ behavior: "smooth" });
      }
      const highestId = Math.min(...unansweredQuestionIds);
      const highestElement = document.getElementById(String(highestId));
      highestElement?.scrollIntoView({ behavior: "smooth" });
    }
  }, [unansweredQuestionIds, chosenAnswerItems]);

  return (
    <div className="app">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {quiz?.content.map((content: Content, id: Content["id"]) => (
        <QuestionsBlock
          key={id}
          quizItem={content}
          chosenAnswerItems={chosenAnswerItems}
          setChosenAnswerItems={setChosenAnswerItems}
          unansweredQuestionIds={unansweredQuestionIds}
          setUnansweredQuestionIds={setUnansweredQuestionIds}
        />
      ))}

      {showAnswer && (
        <AnswerBlock
          answerOptions={quiz?.answers}
          chosenAnswers={chosenAnswerItems}
        />
      )}
    </div>
  );
};

export default App;
