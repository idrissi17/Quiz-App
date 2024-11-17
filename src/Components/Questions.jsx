import React from "react";
import Question from "./Question";

function Questions({ questions, onSelect, answer }) {
  console.log(questions);

  return (
    <div>
      <h4>{questions.question}</h4>
      <Question questions={questions} onSelect={onSelect} answer={answer} />
    </div>
  );
}

export default Questions;
