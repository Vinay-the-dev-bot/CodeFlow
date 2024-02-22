import { useState } from "react";
import Judger from "./Judger";
import QuestnCard from "../Components/QuestnCard";
function Contest() {
  const [questions, setQuestions] = useState([]);
  const getQuestion = async () => {
    const res = await fetch("http://localhost:4500/questions/");
    const data = await res.json();
    console.log(data.questions);
    setQuestions(data.questions);
  };

  return (
    <div>
      <button onClick={getQuestion}>Get Question</button>

      <div className="flex flex-col gap-4  rounded-xl ">
        {questions.map((question, index) => {
          return <QuestnCard key={index} question={question} />;
        })}
      </div>
    </div>
  );
}

export default Contest;
