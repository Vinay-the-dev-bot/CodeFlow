import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { url } from "../assets/Extra";
import LoadingToast from "../Components/LoadingToast";
import { useSelector } from "react-redux";
import { Button, Box } from "@chakra-ui/react";

function Contest() {
  const state = useSelector((state) => state.auth.user);
  const { contestId } = useParams();
  const [contest, setContest] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  console.log(contestId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/contests/${contestId}`);
        const data = await res.json();
        console.log(data);
        setContest(data.contest);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const difficultyColors = {
    Easy: "Easy",
    Medium: "Medium",
    Hard: "Hard",
  };
  const solveQuestion = (qstId) => {
    console.log(qstId);
    navigate(`/contest/solve/${qstId}`);
  };
  console.log(state);
  return (
    <>
      {isLoading && <LoadingToast message={"getting contests"} />}

      <div className="w-full flex mx-auto py-10 ">
        <div className="w-1/3">
          <p className="text-5xl">{contest.title}</p>
          <p className="text-3xl">{contest.description}</p>
        </div>
        <div className="flex h-fit flex-col w-2/3 gap-5 ">
          {contest.questions &&
            contest.questions.map((question, index) => {
              return (
                <Box className=" contest w-4/5  flex px-5 rounded-md py-2 items-center justify-between m-auto  ">
                  <Box className=" flex  items-center w-1/2">
                    <p className="w-5">{index + 1}.</p>
                    <p className="w-full">{question.qstTitle} </p>
                  </Box>
                  <Box className="flex w-2/5 items-center  justify-between text-left ">
                    <Box
                      className={` text-center text-white   ${
                        difficultyColors[question.difficulty]
                      }       py-2  rounded-md `}
                      w={{ base: "100%", md: "40%" }}
                    >
                      {question.difficulty}
                    </Box>
                    <Button
                      bg={`${
                        state &&
                        state.solved_questions?.includes(question.qstId)
                          ? "#4ccd99"
                          : "#92C7CF"
                      } `}
                      fontWeight={0}
                      color={"black"}
                      className={`w-2/5 `}
                      onClick={() => solveQuestion(question.qstId)}
                    >
                      {state && state.solved_questions?.includes(question.qstId)
                        ? "Solved"
                        : "Solve"}
                    </Button>
                  </Box>
                </Box>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Contest;
