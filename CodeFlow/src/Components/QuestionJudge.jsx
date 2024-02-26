import { useEffect, useState } from "react";
import { themes } from "../assets/EditorThemes";
import { useToast } from "@chakra-ui/react";
import Select from "react-select";
import PromisePending from "./PromisePending";
import LanguageDropdown from "./LanguageDropdown";
import ThemeDropdown from "./ThemeDropdown";
import CodeEditor from "./CodeEditor";
import OutputWindow from "./OutputWindow";
import { languageOptions } from "../assets/LanguageOptions";
import TestCaseResults from "../Components/TestCaseResults";
import axios from "axios";
import TestCaseJudge0Results from "./TestCaseJudge0Results";
import LoadingToast from "./LoadingToast";
import { keys } from "../assets/Extra";
import { customStyles } from "../assets/CustomStyles";

function QuestionJudge({ questionId, question }) {
  // console.log("ENV", metigouda21);
  // console.log("ENV", Vinaygouda_meti16);
  // console.log("ENV", mdmeti);
  const [javaCode, setJavaCode] = useState(`public class Main {
    public static void main(String[] args) {
        // Your code goes here
        System.out.println("Hello, world!");
    }
}
`);
  const [pythonCode, setPythonCode] = useState(`//Write Your Code Here`);
  const [javaScriptCode, setJavaScriptCode] = useState(
    `//Write Your Code Here`
  );
  const [langFocus, setLangFocus] = useState("java");
  const [customInput, setCustomInput] = useState("");
  const [theme, setTheme] = useState(themes[0]);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [output, setOutPut] = useState([]);
  const [code, setCode] = useState(javaCode);
  const [pending, setPending] = useState(false);
  const [apiKey, setAPIKey] = useState(keys[0].value);
  const [submitted, setSubmitted] = useState(false);
  const [judgeResult, setJudgeResult] = useState({});
  const [errorJudge, setErrorJudge] = useState();
  const toast = useToast();

  const langCode = {
    python: pythonCode,
    java: javaCode,
    javascript: javaScriptCode,
  };
  function handleThemeChange(th) {
    setTheme(th);
  }
  // if (judgeResult.length == 4) {
  //   toast({
  //     title: "Successfully Compiled.",
  //     status: "success",
  //     duration: 2000,
  //     isClosable: true,
  //   });
  // }

  // const clickedOnSolve = () => {
  //   console.log(language);
  //   if (language.value == "javascript") {
  //     solveJavaScriptCode();
  //   } else {
  //     console.log("CALL Judge ");
  //   }
  // };

  // const clickedOnSubmit = () => {
  //   if (language.value == "javascript") {
  //     console.log("CALL LOCAL SERVER");
  //   } else {
  //     console.log("CALL Judge ");
  //   }
  // };
  // a158f9dc72msh71a3aa6d6fbbdebp1e4846jsn43b522b4bb6d;
  const checkStatus = async (token, judgeInput) => {
    console.log("judgeInputjudgeInput : ", judgeInput);
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": `${apiKey}`,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;
      if (judgeInput && (statusId === 1 || statusId === 2)) {
        setTimeout(() => {
          checkStatus(token, judgeInput);
        }, 3000);
        return;
      } else {
        console.log("-------------------------", atob(response.data.stdout));
        if (judgeInput) {
          const newObject = {
            inp: `${judgeInput}`,
            out: atob(response.data.stdout),
          };
          setJudgeResult((prevState) => [...prevState, newObject]);

          setPending(false);
          return;
        }

        console.log("response.data", atob(response.data.stdout));
        setOutPut([atob(response.data.stdout)]);
        setPending(false);
        return;
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleSolveJudge = () => {
    setErrorJudge("");
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": `${apiKey}`,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        setTimeout(() => {
          checkStatus(token);
        }, 1000);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setErrorJudge(error);
        console.log(error);
        setPending(false);
      });
  };

  const handleSubmitJudge = (judgeInput) => {
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(judgeInput),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": `${apiKey}`,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token, judgeInput);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setErrorJudge(error);
        setPending(false);
        console.log(error);
      });
  };

  const submitCodeJudge = async () => {
    setSubmitted(false);
    setPending(true);
    if (!code) {
      toast({
        title: "Please Provide Code",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    setJudgeResult([]);

    for (let i = 0; i < question.testCases.length; i++) {
      setErrorJudge("");
      handleSubmitJudge(question.testCases[i].inp);
      setSubmitted(true);
    }
  };

  // const submitCode = async () => {
  //   setSubmitted(false);
  //   setPending(true);
  //   if (!code) {
  //     toast({
  //       title: "Please Provide Code",
  //       status: "warning",
  //       duration: 1000,
  //       isClosable: true,
  //     });
  //     return;
  //   }
  //   const res = await fetch("http://localhost:4500/compile/submit222222222", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       language: langFocus,
  //       code,
  //       customInput,
  //       questionId,
  //     }),
  //   });
  //   const data = await res.json();
  //   setSubmitted(true);
  //   setPending(false);
  //   console.log(data);
  //   if (data.error) {
  //     console.log("EEEE");
  //     toast({
  //       title: "Error",
  //       description: "Check Output for more details",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //     setOutPut(data);
  //   } else {
  //     toast({
  //       title: "Successfully Compiled.",
  //       status: "success",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //     setOutPut(data);
  //   }
  // };

  // const solveCode = async () => {
  //   setSubmitted(false);
  //   if (!code) {
  //     toast({
  //       title: "Please Provide Code",
  //       status: "warning",
  //       duration: 1000,
  //       isClosable: true,
  //     });
  //     return;
  //   }
  //   if (!customInput) {
  //     toast({
  //       title: "Please Provide Input if needed",
  //       status: "warning",
  //       duration: 1000,
  //       isClosable: true,
  //     });
  //   }
  //   const res = await fetch("http://localhost:4500/compile/solve", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       language: langFocus,
  //       code,
  //       customInput,
  //       questionId,
  //     }),
  //   });
  //   setPending(true);
  //   const data = await res.json();
  //   setPending(false);
  //   console.log(data);
  //   if (data.error) {
  //     console.log("EEEE");
  //     toast({
  //       title: "Error",
  //       description: "Check Output for more details",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //     setOutPut(data);
  //   } else {
  //     toast({
  //       title: "Successfully Compiled.",
  //       status: "success",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //     setOutPut(data);
  //   }
  // };

  // const solveJavaScriptCode = async () => {
  //   setSubmitted(false);
  //   if (!code) {
  //     toast({
  //       title: "Please Provide Code",
  //       status: "warning",
  //       duration: 1000,
  //       isClosable: true,
  //     });
  //     return;
  //   }
  //   if (!customInput) {
  //     toast({
  //       title: "Please Provide Input if needed",
  //       status: "warning",
  //       duration: 1000,
  //       isClosable: true,
  //     });
  //     return;
  //   }
  //   const res = await fetch("http://localhost:4500/compile/solve", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       language: langFocus,
  //       code,
  //       customInput,
  //       questionId,
  //     }),
  //   });
  //   setPending(true);
  //   const data = await res.json();
  //   setPending(false);
  //   console.log(data);
  //   if (data.error) {
  //     console.log("EEEE");
  //     toast({
  //       title: "Error",
  //       description: "Check Output for more details",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //     setOutPut(data);
  //   } else {
  //     toast({
  //       title: "Successfully Compiled.",
  //       status: "success",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //     setOutPut(data);
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:4500/questions/${questionId}`
  //       );
  //       const data = await res.json();
  //       setQuestion(data.question);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const onSelectChange = (sl) => {
    setCode(langCode[`${sl.value}`]);
    setLangFocus(sl.value);
    setLanguage(sl);
  };
  const onChange = (action, data) => {
    switch (action) {
      case "java": {
        setJavaCode(data);
        setCode(data);
        break;
      }
      case "python": {
        setPythonCode(data);
        setCode(data);
        break;
      }
      case "javascript": {
        setJavaScriptCode(data);
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  return (
    <div>
      {pending && <PromisePending />}
      {/* <p>{JSON.stringify(customInput)}</p> */}
      <div className="flex flex-row px-5 justify-around">
        <div className="px-4 py-2">
          <LanguageDropdown onSelectChange={onSelectChange} />
        </div>

        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} />
        </div>
        {/* <button onClick={solveCode}>Solve</button> */}
      </div>
      {/* {JSON.stringify(output)} */}
      {/* {loading && <LoadingToast />} */}
      {/* {JSON.stringify(apiKey)} */}
      <div className="flex ">
        <CodeEditor
          code={langCode[langFocus]}
          onChange={onChange}
          language={langFocus}
          theme={theme.value}
        />
        {/* {JSON.stringify(language)} */}
        <div className="w-1/2 px-10 border-2 flex flex-col align-baseline ">
          <h1 className="font-bold text-xl w-fit p-5 m-auto   bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
            Output
          </h1>
          <textarea
            className="w-full border-2 h-1/5 p-2 border-black rounded "
            placeholder="Sample Input"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            type="text"
          />
          <div className="flex justify-around p-2 ">
            <button
              className=" compileButton w-1/4 border-2 p-9 my-2 "
              // onClick={submitCode}
              // onClick={submitCodeJudge}
              onClick={submitCodeJudge}
              // onClick={clickedOnSubmit}
            >
              Submit
            </button>

            <button
              className=" compileButton w-1/4 border-2 p-9 my-2 "
              // onClick={solveCode}
              // onClick={clickedOnSolve}
              onClick={handleSolveJudge}
              // onClick={handleCompile}
            >
              Solve
            </button>
          </div>
          <OutputWindow error={errorJudge} outputDetails={output} />
        </div>
      </div>
      {/* {JSON.stringify(keys)} */}

      {submitted && output.output && output.output.length > 0 && (
        <TestCaseResults
          questionId={questionId}
          code={code}
          results={output.output}
        />
      )}
      {/* {submitted && judgeResult.length == question.testCases.length && (
        <TestCaseJudge0Results
          code={code}
          question={question}
          results={judgeResult}
        />
      )} */}
      {submitted && judgeResult.length == 4 && (
        <TestCaseJudge0Results
          code={code}
          question={question}
          results={judgeResult}
        />
      )}
      <div>
        <p>
          If you are getting Daily Limit Reached in output, please select
          different key in dropdown
        </p>
        <Select
          placeholder={`Select Key`}
          options={keys}
          styles={customStyles}
          defaultValue={keys[0]}
          onChange={(selectedOption) => setAPIKey(selectedOption.value)}
        />
      </div>
    </div>
  );
}

export default QuestionJudge;

//   import java.util.Scanner;
//   public class main {
//     public static void main(String[] args) {
//         int num1 = 5;
//         int num2 = 7;
//         Scanner sc = new Scanner(System.in);
//         int x = sc.nextInt();
//         int y = sc.nextInt();
//         int sum = x + y;
//         System.out.println("The sum of " + x + " and " + y + " is: " + sum);
//     }
// }
