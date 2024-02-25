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
} from "@chakra-ui/react";
const QuestionCard = ({ submission, slNo }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="w-3/5">
      <div className="flex items-center  border-2 text-center w-full   px-5 py-4 justify-around rounded-md ">
        <p className="w-9/10 text-center">{slNo + 1}</p>
        <p className="w-9/10  text-center ">{submission.title}</p>
        <p className="w-1/10 text-center">{submission.results.length}</p>
        <p className="w-1/5 text-center">100%</p>
        <button
          className="bg-sky-500 px-10 text-2xl py-1 rounded-md "
          onClick={onOpen}
        >
          View
        </button>
        <p></p>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Submission Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col gap-5">
            <p>ID : {submission._id}</p>
            <p>Title : {submission.title}</p>
            <p>
              Submission Code :<pre> {submission.code}</pre>
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
                    <td className="border text-center">
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
    </div>
  );
};
export default QuestionCard;
