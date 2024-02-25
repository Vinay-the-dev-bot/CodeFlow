import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
// import axios from "axios";
// import React, { useState } from "react";
import { useSelector } from "react-redux";
import SolvedQuestionProfile from "../Components/SolvedQuestionProfile";

const Dashboard = () => {
  const name = useSelector((state) => state.auth.name);
  // const name = "Geetesh Mehuria";

  const [user, setUser] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token found!");
        return;
      }
      try {
        const res = await axios.get("http://localhost:8080/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setSolved(res.data[0].solved_questions);
        // console.log(res.data);x
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  console.log(user);
  console.log(solved);

  // console.log(user[0].solved_questions);
  // const { solved_questions } = user[0];
  // setSolved(solved_questions);
  // console.log(solved);
  return (
    <>
      <Box>
        <Flex
          width={{ base: "97%", md: "85%" }}
          m={"auto"}
          gap={6}
          mt={"2rem"}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box
            width={{ base: "100%", md: "30%" }}
            // border={"2px Solid black"}
            p={"1.3rem 0rem"}
          >
            <Box w={"95%"} m={"auto"} border={"2px Solid black"}>
              {user.map((e) => {
                return (
                  <>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      gap={4}
                      // border={"2px Solid black"}
                      // margin={"19px 19px 5px 19px"}
                      p={2}
                    >
                      <Image
                        src={`https://ui-avatars.com/api/?name=${e.name}&background=random&color=fff`}
                        width={"35%"}
                        // border={"2px Solid red"}
                        borderRadius={"50%"}
                      />
                    </Box>
                    <Box textAlign={"center"}>
                      <Text fontSize={"2rem"} fontWeight={"bold"}>
                        {name}
                      </Text>
                      <Text fontSize={"1.3rem"}>{e.email}</Text>
                    </Box>
                  </>
                );
              })}

              {/* <Box display={"flex"} justifyContent={"center"} mt={5}>
                <Select
                  bg=""
                  // borderColor="blue"
                  color="black"
                  placeholder="Select option"
                  w={"50%"}
                  textAlign={"center"}
                  fontSize={"1.3rem"}
                >
                  <option value="option1">Professional</option>
                  <option value="option2">Medium</option>
                  <option value="option3">Beginner</option>
                </Select>
              </Box> */}
              <hr className="border border-black mt-5" />
              <Box
                // border={"2px Solid black"}
                padding={4}
                mt={4}
              >
                <Heading textAlign={"center"} fontSize={"1.5rem"}>
                  Skills
                </Heading>
                <Text>Java</Text>
              </Box>
            </Box>
          </Box>
          <Box width={{ base: "100%", md: "70%" }}>
            <Box width={"100%"} m={"auto"} mb={2}>
              <TableContainer mt={"1.5rem"} border={"2px solid red"}>
                <Table>
                  <Thead textAlign={"center"}>
                    <Tr>
                      <Th textAlign={"center"}>solved</Th>
                      <Th textAlign={"center"}>Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {user.map((e) => {
                      return (
                        <>
                          <Tr>
                            <Td textAlign={"center"}>
                              {e.solved_questions.length}
                            </Td>
                            <Td textAlign={"center"}>100</Td>
                          </Tr>
                        </>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box border={"2px solid red"}>
              <Box width={"90%"} m={"auto"} mt={"1.5rem"}>
                {solved.map((e) => {
                  return <SolvedQuestionProfile key={e._id} questionId={e} />;
                })}
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Dashboard;

// {
//   "_id": "65d9bfef6705eef75e8db94c",
//   "name": "raja",
//   "email": "raja@gmail.com",
//   "pass": "$2b$05$4AJ4RYE05Eti/n5IhH17AOCpELb6foXatugVUBNgHQ7rYaLAvFHcG",
//   "image": "https://firebasestorage.googleapis.com/v0/b/coinsquare-8dc2e.appspot.com/o/default.jpg?alt=media&token=fa163076-3ed8-48b2-875b-3b370c66f251",
//   "solved_questions": [],
//   "role": "user"
// }
