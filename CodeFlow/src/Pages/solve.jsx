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
      <p>Problem Statement</p>
      <p>{question.description}</p>
      <QuestionJudge questionId={questionId} />
    </div>
  );
}

export default Solve;
