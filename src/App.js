import "./App.css";
import data from "./components/QuestionReponse.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function App() {
  const [questionsCount, setQuestionCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [score, setScore] = useState(1);
  const [isCorrect, setIsCorrect] = useState(null);
  const [yourCorrectIn, setYourCorrectIn] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const ChangeQuestion = () => {
    let rightValueQ = Math.floor(Math.random() * data.length);
    if (rightValueQ === questionsCount) {
      rightValueQ = (rightValueQ + 1) % data.length;
      setScore((prev)=>prev+1);
    }
    setQuestionCount(rightValueQ);
    setQuestion(data[rightValueQ].question.text);
    setIsCorrect(null);
    setScore((prev)=>prev+1)
  };

  const Verification = (answer) => {
    setLoading(true); 
    if (answer.innerText.toLowerCase() === data[questionsCount].correctAnswer.toLowerCase()) {
      setIsCorrect(true);
      setYourCorrectIn((prev)=>prev + 1);
    } else {
      setIsCorrect(false);
    }
  };
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        ChangeQuestion(); 
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div className="container-fluid bg-secondary d-flex justify-content-center text-white w-100 min-vh-100">
      {score>=10 ?
      (
        <div className="card " >
          <div className="card card-body bg-warning" >
            <h2 className="text-center">Resultat :</h2>
            <div className={`alert ${yourCorrectIn<5 ? "alert-danger":"alert-success"} text-dark p-5 mt-5 d-flex justify-content-center fw-bold text-dark h1`}>{yourCorrectIn}/10</div>
            <h1 className="text-center ">{yourCorrectIn>5 ? "You Are Great":"Have More luck in the Next Chance "}</h1>
             <button className="btn btn-primary mt-5 p-3" onClick={()=>{setScore(0);setYourCorrectIn(0)}}>Try Again</button>
        </div>
        </div>
      ) 
      :
      loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 mt-4">
          <div className="spinner-border text-primary mb-2" role="status"></div>
          <span>Loading...</span>
          {isCorrect !== null && (
            <div className={`alert mt-3 ${isCorrect ? "alert-success" : "alert-danger"}`}>
              {isCorrect
                ? "Your answer was correct!"
                : `Wrong! The correct answer is: ${data[questionsCount].correctAnswer}`}
            </div>
          )}
        </div>
      ) : (
        <div className="card mt-5">
          <div className="card-header text-center fw-bold">
            {score} <sup>QUESTION</sup> / 10
          </div>
          <div className="card-body bg-warning">
            <h5 className="card-title alert">{question || "Are You Ready?"}</h5>
            <ul className="list-group">
              {data[questionsCount].Answers.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={(e) => Verification(e.target)}
                    className="btn btn-danger w-100 m-2"
                  >
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <button className="btn btn-secondary w-100 m-2" onClick={ChangeQuestion}>
                  I Don't Know
                </button>
              </li>
            </ul>
          </div>
        </div>
      )
    }
    </div>
  );
}

export default App;
