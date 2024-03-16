import { Box, Heading, Text } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../assets/Extra";

const SolvedQuestionProfile = (questionId) => {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const getQuestion = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token found!");
        return;
      }
      try {
        const res = await axios.get(
          `${url}/questions/${questionId.questionId}`
        );
        setQuestion(res.data.question);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestion();
  }, []);
  return (
    <>
      <Box
        boxShadow={
          "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
        }
        borderRadius={"1rem"}
        p={3}
        width={"100%"}
        mb={5}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          p={"0rem 2rem"}
          alignItems={"center"}
        >
          <Box>
            <Heading fontSize={{ base: "1.4rem", md: "1.5rem" }} mb={2}>
              {question.title}
            </Heading>
            <Text w={{ base: "85%", md: "100%" }}>{question.description}</Text>
          </Box>
          <Box>
            <Text fontSize={"1.5rem"} fontWeight={"bold"} color={"green"}>
              {question.points}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SolvedQuestionProfile;
