import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
// import axios from "axios";
// import React, { useState } from "react";
import { useSelector } from "react-redux";
import SolvedQuestionProfile from "../Components/SolvedQuestionProfile";
import { Link } from "react-router-dom";
import { url } from "../assets/Extra";

const Dashboard = () => {
  const name = useSelector((state) => state.auth.name);
  // const name = "Geetesh Mehuria";

  const [user, setUser] = useState([]);
  const [solved, setSolved] = useState([]);
  const [role, setRole] = useState();
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [difficulty, setDifficulty] = useState();
  const [points, setPoint] = useState();
  const [topics, setTopics] = useState();
  const [constraints, setConstraints] = useState();

  const [inp, setInp] = useState();
  const [oup, setOup] = useState();
  const [tc, setTc] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token found!");
        return;
      }
      try {
        const res = await axios.get(`${url}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setSolved(res.data[0].solved_questions);
        setRole(res.data[0].role);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${url}/questions/add`,
        {
          title,
          description,
          testCases: tc,
          points,
          difficulty,
          topics,
          constraints,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status == 200) {
        toast({
          title: "Question created.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "server error",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      setShowModal(false);
    } catch (error) {
      toast({
        title: "Something went wrong! Please try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
      setShowModal(false);
    }
  };

  const handleAddTestCase = () => {
    setTc([...tc, { inp, oup }]);
  };
  console.log(tc);
  console.log(user);
  return (
    <>
      <Box mb={"4rem"}>
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
            <Box
              w={"95%"}
              m={"auto"}
              p={"1rem 0rem"}
              boxShadow={
                "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px"
              }
              borderRadius={"1rem"}
            >
              {user.map((e) => {
                return (
                  <>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      gap={4}
                      p={2}
                    >
                      <Image
                        src={`https://ui-avatars.com/api/?name=${e.name}&background=random&color=fff`}
                        width={"35%"}
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
              <Box
                alignItems={"center"}
                display={"flex"}
                gap={"15px"}
                flexDirection={"column"}
                justifyContent={"center"}
                m={"2rem 0rem"}
              >
                {role === "admin" && (
                  <Button
                    backgroundColor="#EDF2F7"
                    width={"60%"}
                    margin={"auto"}
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Add Question
                  </Button>
                )}
                <Button width={"60%"} backgroundColor="#EDF2F7">
                  <Link to="/submissions">My Submissions</Link>
                </Button>
              </Box>
            </Box>
          </Box>

          <Box width={{ base: "100%", md: "70%" }}>
            <Box width={"100%"} m={"auto"} mb={2}>
              <TableContainer mt={{ base: "", md: "1.5rem" }}>
                <Table border={"2px solid black"} borderCollapse={"collapse"}>
                  <Thead textAlign={"center"}>
                    <Tr>
                      <Th
                        border={"2px solid black"}
                        textAlign={"center"}
                        fontSize={"1.5rem"}
                      >
                        solved
                      </Th>
                      <Th
                        border={"2px solid black"}
                        textAlign={"center"}
                        fontSize={"1.5rem"}
                      >
                        Total
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {user.map((e) => {
                      return (
                        <>
                          <Tr>
                            <Td
                              border={"2px solid black"}
                              textAlign={"center"}
                              fontSize={"1.3rem"}
                            >
                              {e.solved_questions.length}
                            </Td>
                            <Td
                              textAlign={"center"}
                              fontSize={"1.3rem"}
                              border={"2px solid black"}
                            >
                              {/* 100 */}
                              {user[0].points}
                            </Td>
                          </Tr>
                        </>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box
              boxShadow={
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
              }
              p={"2rem 0"}
              borderRadius={"10px"}
            >
              <Text textAlign={"center"} fontSize={"2rem"} fontWeight={"bold"}>
                Solved Questions
              </Text>
              <Box width={"90%"} m={"auto"} mt={"1.5rem "} mb={"1.5rem"}>
                {solved.map((e) => {
                  {
                    return <SolvedQuestionProfile key={e._id} questionId={e} />;
                  }
                })}
              </Box>
            </Box>
          </Box>
        </Flex>

        {/* model  */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add A Question</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Title:</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description:</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  resize={"none"}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Points:</FormLabel>
                <Input
                  type="number"
                  value={points}
                  onChange={(e) => setPoint(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Difficulty:</FormLabel>

                <Select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  placeholder="Select option"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Topics:</FormLabel>
                <Input
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Test Case:</FormLabel>
                {tc.map((e) => {
                  return (
                    <>
                      <Text>
                        {" "}
                        Inp: {e.inp} | Out : {e.oup}{" "}
                      </Text>
                    </>
                  );
                })}
                <Input
                  type="text"
                  value={inp}
                  onChange={(e) => {
                    setInp(e.target.value);
                  }}
                />
                <Input
                  type="text"
                  value={oup}
                  onChange={(e) => {
                    setOup(e.target.value);
                  }}
                />
                <Button onClick={handleAddTestCase}>Add</Button>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={handleAddQuestion}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default Dashboard;
