import { useEffect, useState } from "react";
import SubmissionsCard from "../Components/SubmissionsCard";
import { url } from "../assets/Extra";
import LoadingToast from "../Components/LoadingToast";
import { Box, Text } from "@chakra-ui/react";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSubmissions = async () => {
      const res = await fetch(`${url}/users/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data.questions);
      setIsLoading(false);
      setSubmissions(data.submissions);
    };
    getSubmissions();
  }, []);
  return (
    <>
      {isLoading && <LoadingToast message={"getting submissions"} />}
      <div className="w-full p-10 mx-auto ">
        <Text className="w-full m-auto text-5xl font-bold  text-center ">
          My Submissions
        </Text>
        <Box
          padding={{ md: "2.5rem", base: "0" }}
          className=" w-full   flex   mt-10  mx-auto justify-around h-fit flex-col gap-10 w-"
        >
          {submissions.map((submission, index) => {
            return (
              <>
                <SubmissionsCard
                  key={index}
                  slNo={index}
                  submission={submission}
                />
              </>
            );
          })}
        </Box>
      </div>
    </>
  );
};

export default Submissions;
