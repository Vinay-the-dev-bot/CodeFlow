import { useNavigate } from "react-router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
const QuestionCard = ({ submission, slNo }) => {
  const navigate = useNavigate();
  let [count, setCount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  for (let i = 0; i < submission.results.length; i++) {
    console.log(submission.results[i].pass);
    if (submission.results[i].pass) {
      count++;
    }
  }
  console.log(count);
  return (
    <Box w={{ md: "60%", base: "100%" }} className="  mx-auto">
      <Box
        flexDirection={{ md: "row", base: "column" }}
        gap={{ base: "20px" }}
        className="flex items-center  border-2 text-center w-full    px-5 py-4 justify-evenly rounded-md "
      >
        <Box w={{ md: "50%", base: "100%" }} className="  flex justify-around">
          <p className="w-9/10 text-center">{slNo + 1}</p>
          <p className="w-9/10  text-center ">{submission.title}</p>
          <p className="w-1/10 text-center">{submission.results.length}</p>
        </Box>

        <Box
          w={{ md: "40%", base: "80%" }}
          className=" items-center flex justify-around "
        >
          <Text
            w={{ md: "20%", base: "fit-content" }}
            className="  text-center"
          >
            {(count / 4) * 100}%
          </Text>
          <button
            className="bg-sky-500 px-10 text-2xl py-1 rounded-md "
            onClick={onOpen}
          >
            View
          </button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Submission Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col gap-5">
            <p>
              <strong>ID : </strong>
              {submission._id}
            </p>
            <p>
              <strong>Title : </strong>
              {submission.title}
            </p>
            <p>
              <strong>Submission Code</strong> :
              <pre className="w-full m-auto"> {submission.code}</pre>
            </p>
            <table className="w-full border border-orange-950 ">
              <tr className="w-full  border ">
                <th className="border ">TestCase</th>
                <th className="border ">Expected</th>
                <th className="border ">OutPut</th>
                <th className="border ">Passed</th>
              </tr>
              {submission.results.map((sub) => {
                return (
                  <tr className="border ">
                    <td className="py-1 border  text-center">{sub.testcase}</td>
                    <td className="border text-center">{sub.expe}</td>
                    <td className="border text-center">{sub.out}</td>
                    <td
                      className={`${
                        sub.pass ? "text-green-500" : "text-red-600"
                      } border text-center `}
                    >
                      {sub.pass ? "Pass" : "Fail"}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div></div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default QuestionCard;
