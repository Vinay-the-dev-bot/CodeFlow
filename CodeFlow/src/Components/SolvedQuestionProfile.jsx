import { Box, Heading, Text } from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SolvedQuestionProfile = (questionId) => {
  // console.log(questionId.questionId);
  const [question, setQuestion] = useState([]);
  // const [dificult, setDeficult] = useState([]);
  // const diff = [];
  useEffect(() => {
    const getQuestion = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token found!");
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:8080/questions/${questionId.questionId}`
        );
        setQuestion(res.data.question);
        // diff.push(res.data.question.difficulty);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestion();
  }, []);
  console.log(question);
  // console.log(diff);
  return (
    <>
      <Box border={"2px solid orange"} p={3} width={"100%"} mb={2}>
        <Box
          // border={"2px solid red"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Heading fontSize={{ base: "1.4rem", md: "1.8rem" }} mb={2}>
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
