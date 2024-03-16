import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../assets/Extra";

const Signup = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(`${url}/users/register`);
      const response = await axios.post(`${url}/users/register`, {
        name,
        email,
        pass,
      });
      console.log(response);
      if (response.data.msg == "Already Registered") {
        setShowModal(true);
        setModalMessage("Already Registrered. Please Login");
      } else {
        setShowModal(true);
        setModalMessage("Registration successful");
      }
    } catch (error) {
      console.log(error);
      setShowModal(true);
      if (error.response && error.response.status === 400) {
        setModalMessage("Email already exists. Please try with another email.");
      } else {
        setModalMessage("Registration failed. Please try again later.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalMessage === "Registration successful") {
      navigate("/login");
    }
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <Box
        p={8}
        width={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        mt={-10}
        backgroundColor="#EDF2F7"
      >
        <form onSubmit={handleSubmit}>
          <Box textAlign="center" mb={4}>
            <h1 style={{ fontSize: "40px", fontWeight: "700" }}>Signup</h1>
          </Box>

          <FormControl id="name" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              backgroundColor="white"
              placeholder="Enter your username"
              value={name}
              onChange={handleUsername}
            />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              backgroundColor="white"
              onChange={handleEmail}
            />
          </FormControl>

          <FormControl id="pass" mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={pass}
              backgroundColor="white"
              onChange={handlePassword}
            />
          </FormControl>

          <Button type="submit" width="full" backgroundColor="#92C7CF">
            Sign Up
          </Button>
        </form>
      </Box>

      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registration Status</ModalHeader>
          <ModalBody>{modalMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Signup;
