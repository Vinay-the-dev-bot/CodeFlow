import { useEffect, useState } from "react";
import SubmissionsCard from "../Components/SubmissionsCard";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    const getSubmissions = async () => {
      const res = await fetch("http://localhost:4500/users/submissions");
      const data = await res.json();
      console.log(data.questions);
      setSubmissions(data.submissions);
    };
    getSubmissions();
  }, []);
  return (
    <div className="w-full p-10 h-96 ">
      <h1 className="w-4/5 m-auto text-5xl font-bold  text-start ">
        Submissions :
      </h1>
      <div className=" w-full p-10 flex  mx-auto justify-around h-fit flex-col gap-10 w-">
        {/*  <div className="flex   border-2 text-center w-4/5 m-auto px-5 py-4 justify-around rounded-md ">
          <p>{JSON.stringify(submission)}</p>
          <p className="w-9/10">Sl No.</p>
          <p className="w-1/4">Title</p>
          <p className="w-1/4">Testcases</p>
          <p className="w-1/4">Pass Percentage</p>
        </div> */}

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
  );
};

export default Submissions;
