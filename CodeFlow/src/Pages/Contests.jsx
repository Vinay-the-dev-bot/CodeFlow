import { useEffect, useState } from "react";
import { url } from "../assets/Extra";
import LoadingToast from "../Components/LoadingToast";
import ContestCard from "../Components/ContestCard";

function Contests() {
  const [contests, setContests] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getContests = async () => {
      const res = await fetch(`${url}/contests/`);
      const data = await res.json();
      console.log(data.contests);
      setContests(data.contests);
      setQuestions(data.contests[0].questions);
      setIsLoading(false);
    };
    getContests();
  }, []);
  return (
    <div>
      {isLoading && <LoadingToast message={"getting contests"} />}

      <div className="flex flex-col gap-10 p-10  rounded-xl ">
        {contests.map((contest) => {
          return <ContestCard key={contest._id} contest={contest} />;
        })}
      </div>
    </div>
  );
}

export default Contests;
