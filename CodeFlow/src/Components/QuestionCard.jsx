import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  const difficultyColors = {
    Easy: "Easy",
    Medium: "Medium",
    Hard: "Hard",
  };
  const solveQuestion = () => {
    navigate(`solve/${question._id}`);
  };
  return (
    <Box
      className="flex qstcard border-2 m-auto px-5 py-4 justify-around rounded-md "
      w={{ base: "100%", md: "80%" }}
      flexDirection={{ base: "column", md: "row" }}
      gap={"1rem"}
      box-shadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
    >
      <Box
        className="flex flex-col justify-around  gap-3 w-3/5 "
        width={{ base: "100%", md: "60%" }}
      >
        <Box className="w-full      ">
          <p className="font-bold">
            Title : <span className="font-normal">{question.title}</span>
          </p>
        </Box>
        <Box className="w-full   flex flex-col  ">
          <p className="font-bold">Description :</p>
          <span>{question.description}</span>
        </Box>
      </Box>

      <Box
        className="flex flex-col  justify-around  items-center w-1/4 gap-5 "
        w={{ base: "100%", md: "30%" }}
      >
        <Box
          className=" flex justify-between  "
          w={{ base: "100%", md: "80%" }}
        >
          <Box
            className={` text-center text-white  ${
              difficultyColors[question.difficulty]
            }       py-2  rounded-md `}
            w={{ base: "100%", md: "40%" }}
          >
            {question.difficulty}
          </Box>
          <div className="w-2/5 text-center qstcarddiv rounded-md py-2 px-1 bg-teal-300   block ">
            {question.points} Points{" "}
          </div>
        </Box>
        <Button
          className="qstcarddiv "
          onClick={solveQuestion}
          coloe="white"
          backgroundColor="#92C7CF"
          w={{ base: "100%", md: "80%" }}
        >
          Solve
        </Button>
      </Box>
    </Box>
  );
};
export default QuestionCard;
