import { useEffect, useState } from "react";
import QuestionCard from "../Components/QuestionCard";
import { url } from "../assets/Extra";
import LoadingToast from "../Components/LoadingToast";

function Contest() {
  const [questions, setQuestions] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getQuestion = async () => {
      const res = await fetch(`${url}/questions/`);
      const data = await res.json();
      console.log(data.questions);
      setQuestions(data.questions);
      setIsLoading(false);
    };
    getQuestion();
  }, []);

  return (
    <div>
      {isLoading && <LoadingToast />}
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
