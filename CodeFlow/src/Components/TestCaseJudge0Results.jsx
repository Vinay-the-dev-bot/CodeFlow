import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

import { url } from "../assets/Extra";
import { useDispatch, useSelector } from "react-redux";
import { qstnSolved } from "../redux/authSlice";
import { useNavigate } from "react-router";
const TestCaseJudge0Results = ({ code, question, results }) => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  let count = 0;
  console.log(question);
  const ressss = [];
  console.log(question.title);
  for (let i = 0; i < question.testCases.length; i++) {
    for (let j = 0; j < results.length; j++) {
      console.log("DATA");
      if (question.testCases[i].inp == results[j].inp) {
        let pass =
          question.testCases[i].oup === results[j].out.replace("\n", "");
        if (pass) {
          count++;
        }
        let data = {
          testcase: question.testCases[i].inp,
          expe: question.testCases[i].oup,
          out: results[j].out,
          pass,
        };
        ressss.push(data);
        console.log("DATA", data);
      }
    }
  }
  const token = localStorage.getItem("token");
  console.log(token);
  const percPassed = (count / question.testCases.length) * 100;
  const saveResults = async () => {
    if (state.auth) {
      const res = await fetch(`${url}/users/submissions`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          questionID: question._id,
          title: question.title,
          code,
          results: ressss,
        }),
      });
      const data = await res.json();
      if (data.msg.includes("submitted")) {
        toast({
          title: "Solution Saved",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        dispatch(qstnSolved(question._id));
      }
      console.log(data);
    } else {
      setShowModal(true);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    navigate("/login");
  };
  return (
    <>
      <Box
        w={{ md: "80%", base: "95%" }}
        className="testCaseResults w-4/5  my-10 m-auto border-2 py-10 h-fit "
      >
        <div className="w-4/5 mx-auto my-2 text-center text-5xl ">Results</div>
        <div className="flex flex-col  rounded-md  gap-5">
          <Box
            display={"flex"}
            w={{ md: "80%", base: "95%" }}
            flexDirection={{ md: "row", base: "column" }}
            className=" m-auto items-center justify-around"
          >
            {
              <p className="text-center  text-3xl p-5 ">
                {JSON.stringify(percPassed)} % testcases passed
              </p>
            }

            <button
              className="px-5  rounded-xl h-fit p-1    bg-emerald-500 "
              onClick={saveResults}
            >
              saveResults
            </button>
          </Box>
          <Box
            w={{ md: "80%", base: "95%" }}
            className={`  flex  items-center m-auto  rounded-md border-2 h-10  `}
          >
            <p className="w-1/2 text-center  rounded-md m-auto">TestCase</p>
            <p>|</p>
            <p className="w-1/2 text-center  rounded-md m-auto">Expected</p>
            <p>|</p>
            <p className="w-1/2 text-center  rounded-md m-auto">OutPut</p>
          </Box>

          {ressss.map((res, i) => {
            return (
              <Box
                key={i}
                w={{ md: "80%", base: "95%" }}
                className={` flex text-white items-center m-auto rounded-md py-5 border-2 h-fit ${
                  res.pass ? "bg-emerald-800" : "bg-rose-800"
                }`}
              >
                <p className="w-1/3 text-center m-auto">{res.testcase}</p>
                <p>|</p>
                <p className="w-1/3 text-center m-auto">{res.expe}</p>
                <p>|</p>
                <p className="w-1/3 text-center m-auto">{res.out}</p>
              </Box>
            );
          })}
        </div>
      </Box>
      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Not Logged In</ModalHeader>
          <ModalBody>Please Log In!!</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Log In
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TestCaseJudge0Results;
