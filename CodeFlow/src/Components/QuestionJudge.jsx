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
  const [statusId, setStatusId] = useState(null);
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
      let statusID = response.data.status?.id;
      console.log("ID  : ", statusID);
      setStatusId(statusID);
      if (judgeInput && (statusID === 1 || statusID === 2)) {
        setTimeout(() => {
          checkStatus(token, judgeInput);
        }, 3000);
        return;
      } else {
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
    setStatusId(null);
    setOutPut("");
    if (!customInput) {
      toast({
        title: "Please Provide Input to Solve",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
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
        console.log(error);
        setErrorJudge(error.message ? error.message : error);
        // setErrorJudge(error);
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
        console.log(err);
        setErrorJudge(error.message ? error.message : error);
        setPending(false);
        console.log("djfjsd", error.message);
      });
  };

  const submitCodeJudge = async () => {
    setSubmitted(false);
    setPending(true);
    setStatusId(null);
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
      </div>
      <div className="flex ">
        <CodeEditor
          code={langCode[langFocus]}
          onChange={onChange}
          language={langFocus}
          theme={theme.value}
        />

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
              onClick={submitCodeJudge}
            >
              Submit
            </button>

            <button
              className=" compileButton w-1/4 border-2 p-9 my-2 "
              onClick={handleSolveJudge}
            >
              Solve
            </button>
          </div>
          <OutputWindow
            error={errorJudge}
            statusID={statusId}
            outputDetails={output}
          />
        </div>
      </div>

      {submitted && output.output && output.output.length > 0 && (
        <TestCaseResults
          questionId={questionId}
          code={code}
          results={output.output}
        />
      )}

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
