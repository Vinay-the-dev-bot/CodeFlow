import { useToast } from "@chakra-ui/react";
import { useState } from "react";

import { url } from "../assets/Extra";
const TestCaseJudge0Results = ({ code, question, results }) => {
  const [Vinay, setVinay] = useState("d");
  console.log("SADSALD+++++++++++++++++++", results);
  const toast = useToast();
  const resultsssss = [
    {
      inp: "10",
      out: "NO\n",
    },
    {
      inp: "1",
      out: "NO\n",
    },
    {
      inp: "7",
      out: "YES\n",
    },
    {
      inp: "17",
      out: "YES\n",
    },
  ];
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
    console.log(ressss);
    const res = await fetch(`${url}/users/submissions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorizations: `Bearer ${token}`,
      },
      body: JSON.stringify({
        questionID: question._id,
        title: question.title,
        code,
        results: ressss,
        // userID: "65dacfbf3264a92caeb63a48",
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
    }
    console.log(data);
  };

  return (
    <div className="testCaseResults w-4/5  my-10 m-auto border-2 py-10 h-fit ">
      {/* TestCaseJudge0Results. */}
      {/* {JSON.stringify(ressss)} */}
      <div className="w-4/5 mx-auto my-2 text-center text-5xl ">Results</div>
      {/* <div className="flex flex-col gap-5">
        {res.length > 0 &&
          res.map((res, i) => {
            return (
              <div
                key={i}
                className={`w-2/5 flex text-white items-center m-auto border-2 h-10 ${
                  res[i] ? "bg-emerald-800" : "bg-rose-800"
                }`}
              >
                <p className="w-1/2 text-center m-auto">{expected[i]}</p>
                <p>|</p>
                <p className="w-1/2 text-center m-auto">{result[i]}</p>
              </div>
            );
          })}
      </div> */}
      <div className="flex flex-col  rounded-md  gap-5">
        <div className="flex items-center justify-around">
          {
            <p className="text-center  text-3xl p-5 ">
              {JSON.stringify(percPassed)} % testcases passed
            </p>
          }
          {true && (
            <button
              className="px-5  rounded-xl h-fit p-1    bg-emerald-500 "
              onClick={saveResults}
            >
              saveResults
            </button>
          )}
        </div>
        <div
          className={`w-4/5 flex  items-center m-auto  rounded-md border-2 h-10  `}
        >
          <p className="w-1/2 text-center  rounded-md m-auto">TestCase</p>
          <p>|</p>
          <p className="w-1/2 text-center  rounded-md m-auto">Expected</p>
          <p>|</p>
          <p className="w-1/2 text-center  rounded-md m-auto">OutPut</p>
        </div>
        {/* {ressss.map((res, i) => {
          return <p>{JSON.stringify(res)}</p>;
        })} */}
        {/* <p>aksndncdsnclkdsn{JSON.stringify(ressss)}</p> */}
        {/* {ressss.map((res, i) => {
          return (
            <div
              key={i}
              className={`w-4/5 flex text-white items-center m-auto rounded-md  border-2 h-10 ${
                res.expe.replaceAll(" ", "") ==
                res.stdout.replaceAll("\r\n", "").replaceAll(" ", "")
                  ? "bg-emerald-800"
                  : "bg-rose-800"
              }`}
            >
              <p className="w-1/3 text-center m-auto">{res.inp}</p>
              <p>|</p>
              <p className="w-1/3 text-center m-auto">{res.expe}</p>
              <p>|</p>
              <p className="w-1/3 text-center m-auto">{res.stdout}</p>
            </div>
          );
        })} */}
        {ressss.map((res, i) => {
          return (
            <div
              key={i}
              className={`w-4/5 flex text-white items-center m-auto rounded-md  border-2 h-10 ${
                res.pass ? "bg-emerald-800" : "bg-rose-800"
              }`}
            >
              <p className="w-1/3 text-center m-auto">{res.testcase}</p>
              <p>|</p>
              <p className="w-1/3 text-center m-auto">{res.expe}</p>
              <p>|</p>
              <p className="w-1/3 text-center m-auto">{res.out}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestCaseJudge0Results;
