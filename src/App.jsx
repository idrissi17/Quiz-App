import React, { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Questions from "./Components/Questions";
import NextButton from "./Components/NextButton";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import Timer from "./Components/Timer";

const initialState = {
  questions: [],
  // 'loading' ,'error' ,'ready' ,'active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30,
      };
    case "newAnswer":
      // const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions.at(state.index).correctOption
            ? state.points + state.questions.at(state.index).points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkonwn");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const result = await response.json();
        dispatch({ type: "dataReceived", payload: result });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} onStart={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              onSelect={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={questions.length}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            maxPoints={maxPoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
