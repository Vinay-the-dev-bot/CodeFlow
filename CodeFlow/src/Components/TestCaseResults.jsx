import axios from "axios";

const TestCaseResults = ({ code, questionId, results }) => {
  // console.log("RESULT", results);
  // const testCasePasses = results.reduce((res) => {
  //    res.expe.replaceAll(" ", "") ==
  //      res.stdout.replaceAll("\r\n", "").replaceAll(" ", "") && {pass +=1 }
  // }, pass);

  const pass = 0;
  const testCasePassed = results.reduce((acc, res) => {
    return res.expe.replaceAll(" ", "") ===
      res.stdout.replaceAll("\r\n", "").replaceAll(" ", "")
      ? acc + 1
      : acc;
  }, pass);

  console.log("Number of test cases passed:", testCasePassed);

  const percPassed = (testCasePassed / results.length) * 100;

  const saveResults = async () => {
    const res = await fetch(`${url}/users/submission`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        questionID: questionId,
        code,
        results,
        userID: "65d9cbc56c9b36cd3dd0bf62",
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  // [
  //   {
  //     expe: "dlrow",
  //     stdout: " dlrow\r\n",
  //   },
  //   {
  //     expe: "avaj",
  //     stdout: " avaj\r\n",
  //   },
  //   {
  //     expe: "AAAAAAAA",
  //     stdout: " AAAAAAAA\r\n",
  //   },
  //   {
  //     expe: "mhtirogla",
  //     stdout: " mhtirogla\r\n",
  //   },
  // ];
  return (
    <div className="testCaseResults w-4/5  my-10 m-auto border-2 py-10 h-fit ">
      {/* <div className="w-4/5 mx-auto my-2 text-center text-5xl ">Results</div> */}
      {/* <div>{JSON.stringify(question)}</div>
      <div>{JSON.stringify(results)}</div> */}
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
          {percPassed == 100 && (
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

        {results.map((res, i) => {
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
        })}
      </div>
    </div>
  );
};

export default TestCaseResults;
