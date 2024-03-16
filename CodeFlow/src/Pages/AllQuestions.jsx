import { useEffect, useState } from "react";
import QuestionCard from "../Components/QuestionCard";
import { url } from "../assets/Extra";
import LoadingToast from "../Components/LoadingToast";

function AllQuestions() {
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
      {isLoading && <LoadingToast message={"getting contests"} />}
      <div className="flex flex-col gap-10 p-10  rounded-xl ">
        {questions.map((question, index) => {
          return <QuestionCard key={index} question={question} />;
        })}
      </div>
    </div>
  );
}

export default AllQuestions;
