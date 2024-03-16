import { useEffect, useState } from "react";
import SubmissionsCard from "../Components/SubmissionsCard";
import { url } from "../assets/Extra";
import LoadingToast from "../Components/LoadingToast";

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
        <h1 className="w-4/5 m-auto text-5xl font-bold  text-center ">
          My Submissions
        </h1>
        <div className=" w-full p-10 flex    mx-auto justify-around h-fit flex-col gap-10 w-">
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
        </div>
      </div>
    </>
  );
};

export default Submissions;
