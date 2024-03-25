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

      <Box
        flexDirection={{ md: "row", base: "column" }}
        className="w-full flex mx-auto py-10 "
      >
        <Box w={{ md: "33.3%", base: "100%" }} className=" px-5 w-1/3">
          <p className="text-5xl">{contest.title}</p>
          <p className="text-3xl px-5">{contest.description}</p>
        </Box>
        <Box
          w={{ base: "100%", md: "66.7%" }}
          className="flex h-fit flex-col   gap-5 "
        >
          {contest.questions &&
            contest.questions.map((question, index) => {
              return (
                <Box
                  w={{ base: "95%", md: "80%" }}
                  flexDirection={{ base: "column", md: "row" }}
                  className=" contest w-4/5  flex px-5 rounded-md py-2 items-center justify-between m-auto  "
                >
                  <Box
                    w={{ base: "95%", md: "80%" }}
                    className=" flex  items-center  "
                  >
                    <p className="w-5">{index + 1}.</p>
                    <p className="w-full">{question.qstTitle} </p>
                  </Box>
                  <Box
                    w={{ base: "95%", md: "80%" }}
                    className="flex w-2/5 items-center py-5 justify-between text-left "
                  >
                    <Box
                      className={` w-2/5 text-center text-white   ${
                        difficultyColors[question.difficulty]
                      }       py-2  rounded-md `}
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
        </Box>
      </Box>
    </>
  );
}

export default Contest;
