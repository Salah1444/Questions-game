import "./App.css";
import data from "./data/QuestionReponse.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const TOTAL = Math.min(10, data.length);
const LETTERS = ["A", "B", "C", "D", "E", "F"];
const SKIPPED = "__skipped__";

const pickQuestions = () =>
  [...data].sort(() => Math.random() - 0.5).slice(0, TOTAL);

const same = (a, b) =>
  String(a).trim().toLowerCase() === String(b).trim().toLowerCase();

function App() {
  const [questions, setQuestions] = useState(pickQuestions);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const answered = selected !== null;

  // Move on automatically after an answer
  useEffect(() => {
    if (!answered) return;
    const timer = setTimeout(() => {
      if (current + 1 >= TOTAL) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [answered, current]);

  const choose = (answer) => {
    if (answered) return;
    setSelected(answer);
    if (answer !== SKIPPED && same(answer, q.correctAnswer)) {
      setCorrectCount((c) => c + 1);
    }
  };

  const restart = () => {
    setQuestions(pickQuestions());
    setCurrent(0);
    setSelected(null);
    setCorrectCount(0);
    setFinished(false);
  };

  const buttonState = (item) => {
    if (!answered) return "";
    if (same(item, q.correctAnswer)) return "correct";
    if (item === selected) return "wrong";
    return "dimmed";
  };

  /* ---------- Result screen ---------- */
  if (finished) {
    const percent = Math.round((correctCount / TOTAL) * 100);
    const great = percent >= 60;
    return (
      <div className="banner">
        <div className="quiz-card result text-center">
          <div className="result-emoji">{percent >= 80 ? "🏆" : great ? "🎉" : "💪"}</div>
          <h2 className="fw-bold">Result</h2>

          <div
            className="score-ring"
            style={{ "--percent": `${percent}%` }}
            data-good={great}
          >
            <div className="score-ring-inner">
              <span className="score-number">
                {correctCount}/{TOTAL}
              </span>
              <small>{percent}%</small>
            </div>
          </div>

          <p className="result-message">
            {percent >= 80
              ? "Excellent! You really know your stuff."
              : great
              ? "Great job, keep it up!"
              : "Better luck next time, you can do it!"}
          </p>

          <button className="btn-main" onClick={restart}>
            ↻ Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Question screen ---------- */
  return (
    <div className="banner">
      <div className="quiz-card">
        <div className="quiz-top">
          <span className="badge-pill">
            Question {current + 1} / {TOTAL}
          </span>
          <span className="badge-pill ghost">✔ {correctCount}</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((current + (answered ? 1 : 0)) / TOTAL) * 100}%` }}
          />
        </div>

        <h4 className="question-text" key={current}>
          {q.question.text || "Are You Ready?"}
        </h4>

        <div className="answers" key={`a-${current}`}>
          {q.Answers.map((item, index) => (
            <button
              key={index}
              disabled={answered}
              onClick={() => choose(item)}
              className={`answer-btn ${buttonState(item)}`}
            >
              <span className="answer-letter">{LETTERS[index]}</span>
              <span className="answer-text">{item}</span>
              {answered && same(item, q.correctAnswer) && <span className="mark">✓</span>}
              {answered && item === selected && !same(item, q.correctAnswer) && (
                <span className="mark">✗</span>
              )}
            </button>
          ))}
        </div>

        <div className="quiz-footer">
          {answered ? (
            <div
              className={`feedback ${
                selected !== SKIPPED && same(selected, q.correctAnswer) ? "ok" : "ko"
              }`}
            >
              {selected !== SKIPPED && same(selected, q.correctAnswer)
                ? "🎯 Correct!"
                : `The correct answer is: ${q.correctAnswer}`}
            </div>
          ) : (
            <button className="skip-btn" onClick={() => choose(SKIPPED)}>
              I Don't Know →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;