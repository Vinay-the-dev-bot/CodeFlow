import {
  Box,
  Flex,
  Heading,
  Image,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
// import axios from "axios";
// import React, { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // const name = useSelector((state) => state.auth.name);
  const name = "Geetesh Mehuria";
  const email = "bWqFP@example.com";
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   const getUser = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.log("no token found!");
  //       return;
  //     }
  //     try {
  //       const res = await axios.get("https:// http://localhost:8080/users", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setUser(res.data);
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUser();
  // }, []);
  return (
    <>
      <Box>
        <Flex width={"90%"} m={"auto"} gap={6} mt={"2rem"}>
          <Box width={"35%"} border={"2px Solid black"} p={"1.3rem 0rem"}>
            <Box w={"95%"} m={"auto"} border={"2px Solid black"}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                gap={4}
                border={"2px Solid black"}
                // margin={"19px 19px 5px 19px"}
                p={2}
              >
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/coinsquare-8dc2e.appspot.com/o/default.jpg?alt=media&token=fa163076-3ed8-48b2-875b-3b370c66f251"
                  width={"45%"}
                  border={"2px Solid red"}
                  borderRadius={"50%"}
                />
              </Box>
              <Box textAlign={"center"}>
                <Text fontSize={"2rem"} fontWeight={"bold"}>
                  {name}
                </Text>
                <Text fontSize={"1.3rem"}>{email}</Text>
              </Box>
              <Box display={"flex"} justifyContent={"center"} mt={5}>
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
              </Box>

              <Box border={"2px Solid black"} padding={4} mt={4}>
                <Heading textAlign={"left"} fontSize={"1.5rem"}>
                  Skills
                </Heading>
              </Box>
            </Box>
          </Box>
          <Box width={"60%"} border={"2px Solid black"}>
            <Box width={"50%"}>
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>Easy</Th>
                      <Th>Medium</Th>
                      <Th>Hard</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
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