import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import CodeEditor from "../Components/CodeEditor";
import LanguageDropdown from "../Components/LanguageDropdown";
import ThemeDropdown from "../Components/ThemeDropdown";
import { languageOptions } from "../assets/LanguageOptions";
import OutputWindow from "../Components/OutputWindow";
import PromisePending from "../Components/PromisePending";
import { themes } from "../assets/EditorThemes";

function Judger() {
  const [javaCode, setJavaCode] = useState(`
  import java.util.Scanner;
  public class main {
    public static void main(String[] args) { 
        int num1 = 5;
        int num2 = 7; 
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y = sc.nextInt();
        int sum = x + y; 
        System.out.println("The sum of " + x + " and " + y + " is: " + sum);
    }
}`);
  const [pythonCode, setPythonCode] = useState(`def add_two_numbers(num1, num2):
    return num1 + num2
num1 = 5
num2 = 7
sum = add_two_numbers(num1, num2)
print("The sum of", num1, "and", num2, "is:", sum)
`);
  const [javaScriptCode, setJavaScriptCode] = useState(`let  a = 5;
let c = 8;
 function add(a,b){
    return a+b
 }
 add(5,8)`);
  const [langFocus, setLangFocus] = useState("java");
  const [customInput, setCustomInput] = useState("");
  const [theme, setTheme] = useState(themes[0]);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [output, setOutPut] = useState("OUTPUT");
  const [code, setCode] = useState(javaCode);
  const [pending, setPending] = useState(false);
  const toast = useToast();

  const langCode = {
    python: pythonCode,
    java: javaCode,
    javascript: javaScriptCode,
  };
  function handleThemeChange(th) {
    setTheme(th);
  }
  const complieCode = async () => {
    if (!code) {
      toast({
        title: "Please Provide Code",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    if (!customInput) {
      toast({
        title: "Please Provide Input",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    const res = await fetch("http://localhost:4500/compile/solve", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ language: langFocus, code: code, customInput }),
    });
    setPending(true);
    const data = await res.json();
    setPending(false);
    console.log(data);
    if (data.error) {
      console.log("EEEE");
      toast({
        title: "Error",
        description: "Check Output for more details",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      setOutPut(data.error);
    } else {
      toast({
        title: "Successfully Compiled.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setOutPut(data.output);
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
      <p>{JSON.stringify(customInput)}</p>

      <div className="flex flex-row p-5 justify-around">
        <div className="px-4 py-2">
          <LanguageDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} />
        </div>
        <button onClick={complieCode}>Compile Code</button>
      </div>
      <div className="flex">
        <CodeEditor
          code={langCode[langFocus]}
          onChange={onChange}
          language={langFocus}
          theme={theme.value}
        />
        <div className="w-1/2 flex flex-col align-baseline ">
          <h1 className="font-bold text-xl w-fit p-5 m-auto   bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
            Output
          </h1>
          <textarea
            className="w-4/5 border-2 h-1/5 border-black rounded "
            placeholder="Custom Inputs"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            type="text"
          />
          <button
            className=" compileButton w-fit border-2 p-9 my-2 "
            onClick={complieCode}
          >
            Compile Code
          </button>
          <OutputWindow outputDetails={output} />
        </div>
      </div>
    </div>
  );
}

export default Judger;
