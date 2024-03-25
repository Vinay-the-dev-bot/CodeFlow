import React, { useState } from "react";
import Editor, { loader } from "@monaco-editor/react";
import { Box } from "@chakra-ui/react";
const CodeEditor = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange(language, value);
  };

  return (
    <Box
      w={{ md: "50%", base: "90%" }}
      className="overlay w-1/2 rounded-md overflow-hidden h-full m-auto shadow-4xl"
    >
      <h1 className="font-bold text-xl w-fit p-5 m-auto bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Input
      </h1>
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={code}
        theme={theme}
        onChange={handleEditorChange}
      />
    </Box>
  );
};
export default CodeEditor;
