import { useEffect, useState } from "react";
import { useParams } from "react-router";
import QuestionJudge from "../Components/QuestionJudge";
import { url } from "../assets/Extra";
import LoadingToast from "../Components/LoadingToast";
import { Box, Text } from "@chakra-ui/react";

function Solve() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/questions/${questionId}`);
        const data = await res.json();
        setQuestion(data.question);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <LoadingToast message={"geting question"} />}
      <Box className="flex m-10 p-5  " border={"1px solid black"}>
        <div className="w-3/5 px-10    flex flex-col gap-5">
          <h1 className="text-2xl font-bold "> Statement</h1>
          <p className="text-2xl ">{question.title}</p>

          <h1 className="text-2xl font-bold "> Description</h1>
          <p>{question.description}</p>
        </div>
        <div className="w-1/5 mx-auto flex flex-col gap-5 justify-evenly">
          <p
            className={`p-2 text-2xl text-center w-4/5 ${question.difficulty}`}
          >
            {question.difficulty}
          </p>
          <Text
            className={`p-2 w-4/5 text-2xl text-center rounded-md 0 points points-${question.points}`}
            bg={"#5EEAD4"}
          >
            {question.points} Points
          </Text>
        </div>
      </Box>
      <QuestionJudge question={question} questionId={questionId} />
    </div>
  );
}

export default Solve;
