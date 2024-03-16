import { useEffect, useRef, useState } from "react";
import Button from "../Components/Button";
import Editor, { useMonaco } from "@monaco-editor/react";
import ThemeDropdown from "../Components/ThemeDropdown";
import { themes } from "../assets/EditorThemes";
import { Box, border } from "@chakra-ui/react";
function HTMLCompiler() {
  const [openedEditor, setOpenedEditor] = useState("HTML");
  const [html, setHTML] = useState(
    `<div>\n    <h1>Heading</h1>\n    <p id="para" >Paragraph</p>\n    <button id="btn" >Click Me</button>\n</div>`
  );
  const [css, setCSS] = useState("p{\ncolor:red\n}\nh1{\ncolor:blue\n}");
  const [javascript, setJS] = useState(
    `document.getElementById("btn").addEventListener("click",()=>{\n    document.getElementById("para").style.color = "black"\n})`
  );
  const [theme, setTheme] = useState(themes[0]);

  const [srcDoc, setSrcDoc] = useState(` `);
  const [activeTab, setActiveTab] = useState("HTML");
  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
    setActiveTab(editorName);
  };
  function handleHTMLChange(value, event) {
    setHTML(value);
  }
  function handleCSSChange(value, event) {
    setCSS(value);
  }
  function handleJSChange(value, event) {
    setJS(value);
  }
  const handleThemeChange = (theme) => {
    setTheme(theme.value);
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(
        `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${javascript}</script>
          </html>
        `
      );
    }, 250);
    return () => clearTimeout(timeOut);
  }, [html, css, javascript]);
  return (
    <div>
      <Box
        className="flex  items-center justify-center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box
          className="tab-button-container w-1/2  my-10    flex gap-10 "
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={"center"}
        >
          <Button
            bg={"red"}
            title="HTML"
            onClick={() => {
              onTabClick("HTML");
            }}
            isActive={activeTab === "HTML"}
          />
          <Button
            title="CSS"
            onClick={() => {
              onTabClick("CSS");
            }}
            isActive={activeTab === "CSS"}
          />
          <Button
            title="JavaScript"
            onClick={() => {
              onTabClick("JavaScript");
            }}
            isActive={activeTab === "JavaScript"}
          />
        </Box>
        <div className=" mx-auto block  ">
          <ThemeDropdown handleThemeChange={handleThemeChange} />
        </div>
      </Box>

      <Box
        className="editor-container flex  mx-auto mb-10 h-full  "
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box
          className="  flex flex-col  "
          w={{ base: "100%", md: "50%" }}
          border={{ md: "1px solid black" }}
          padding={"30px 0"}
        >
          {openedEditor === "HTML" ? (
            <div className="HTML-Editor flex flex-col w-1/1 ">
              <Editor
                height="500px"
                width="100%"
                className="mx-auto"
                theme={theme}
                value={html}
                onChange={handleHTMLChange}
              />
            </div>
          ) : openedEditor === "CSS" ? (
            <div className="CSS-Editor  w-1/1 ">
              <Editor
                height="500px"
                width="100%"
                className="m-auto"
                language="css"
                value={css}
                theme={theme}
                onChange={handleCSSChange}
              />
            </div>
          ) : (
            <div className="JS-Editor w-1/1">
              <Editor
                height="500px"
                width="100%"
                className="m-auto"
                language="javascript"
                value={javascript}
                theme={theme}
                onChange={handleJSChange}
              />
            </div>
          )}
        </Box>
        <Box
          className="w-1/2      "
          border={{ md: "1px solid black" }}
          padding={"0 10px"}
        >
          <iframe
            className=" mx-auto   "
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="1"
            width="99%"
            height="500px"
          />
        </Box>
      </Box>
    </div>
  );
}

export default HTMLCompiler;
