import { useEffect, useState } from "react";
import { useParams } from "react-router";
import QuestionJudge from "../Components/QuestionJudge";

function Solve() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:4500/questions/${questionId}`
        );
        const data = await res.json();
        setQuestion(data.question);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <p>{JSON.stringify(question)}</p> */}
      <div className="flex p-10">
        <div className="w-3/5 px-10    flex flex-col gap-5">
          <h1 className="text-2xl font-bold "> Statement</h1>
          <p className="text-2xl ">
            {question.title}
            {/* |
            <span className={`px-2 ${question.difficulty}`}>
              {question.difficulty}
            </span> */}
          </p>
          <h1 className="text-2xl font-bold "> Description</h1>
          <p>{question.description}</p>
          <h1 className="text-2xl font-bold"> Constraints</h1>
          <p>{question.constraints}</p>
        </div>
        <div className="w-1/5 mx-auto flex flex-col gap-5 justify-evenly">
          <p
            className={`p-2 text-2xl text-center w-4/5 ${question.difficulty}`}
          >
            {question.difficulty}
          </p>
          <p
            className={`p-2 w-4/5 text-2xl text-center rounded-md bg-green-600 points points-${question.points}`}
          >
            {question.points} Points
          </p>
        </div>
      </div>
      <QuestionJudge question={question} questionId={questionId} />
    </div>
  );
}

export default Solve;
