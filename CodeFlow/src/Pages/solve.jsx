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
      <Box
        flexDirection={{ md: "row", base: "column" }}
        className="flex m-10 p-5  "
        border={"1px solid black"}
      >
        <Box
          w={{ md: "60%", base: "95%" }}
          className="w-3/5     flex flex-col gap-5"
        >
          <h1 className="text-2xl font-bold "> Statement</h1>
          <p className="text-2xl ">{question.title}</p>

          <h1 className="text-2xl font-bold "> Description</h1>
          <p>{question.description}</p>
        </Box>
        <Box
          w={{ md: "20%", base: "95%" }}
          className="w-1/5 mx-auto flex pt-10 flex-col gap-5 justify-evenly"
        >
          <Text
            w={{ md: "80%", base: "100%" }}
            className={`p-2 text-2xl text-center   ${question.difficulty}`}
          >
            {question.difficulty}
          </Text>
          <Text
            w={{ md: "80%", base: "100%" }}
            className={`p-2 w-4/5 text-2xl text-center rounded-md 0 points points-${question.points}`}
            bg={"#5EEAD4"}
          >
            {question.points} Points
          </Text>
        </Box>
      </Box>
      <QuestionJudge question={question} questionId={questionId} />
    </div>
  );
}

export default Solve;
