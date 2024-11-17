import React from "react";

function FinishScreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  return (
    <>
      <p className="result">
        Your scored{" "}
        <strong>
          {points} out of {maxPoints}({percentage}%)
        </strong>
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui "
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
