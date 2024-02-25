import { useEffect, useState } from "react";
import Judger from "./Judger";
import QuestionCard from "../Components/QuestionCard";

function Contest() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestion = async () => {
      const res = await fetch("http://localhost:4500/questions/");
      const data = await res.json();
      console.log(data.questions);
      setQuestions(data.questions);
    };
    getQuestion();
  }, []);

  return (
    <div>
      {/* <button onClick={getQuestion}>Get Question</button> */}
      <div className="flex flex-col gap-10 p-10  rounded-xl ">
        {questions.map((question, index) => {
          return <QuestionCard key={index} question={question} />;
        })}
      </div>
    </div>
  );
}

export default Contest;
