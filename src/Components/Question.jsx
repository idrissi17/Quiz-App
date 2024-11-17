import React from "react";

function Question({ questions, onSelect, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {questions.options.map((opt, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === questions.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={opt}
          disabled={hasAnswered}
          onClick={() => onSelect({ type: "newAnswer", payload: index })}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Question;
