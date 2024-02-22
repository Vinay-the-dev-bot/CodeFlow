import { useEffect, useRef, useState } from "react";
import Button from "../Components/Button";
import Editor, { useMonaco } from "@monaco-editor/react";
import ThemeDropdown from "../Components/ThemeDropdown";
function HTMLCompiler() {
  const [openedEditor, setOpenedEditor] = useState("HTML");
  const [html, setHTML] = useState(
    `<h1>Heading</h1>\n<p id="para" >Paragraph</p>\n<button id="btn" >Click Me</button>`
  );
  const [css, setCSS] = useState("p{\ncolor:red\n}\nh1{\ncolor:blue\n}");
  const [javascript, setJS] = useState(
    `document.getElementById("btn").addEventListener("click",()=>{\n    document.getElementById("para").style.color = "black"\n})`
  );
  const [theme, setTheme] = useState("vs-dark");

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
      <p className="text-5xl py-5 m-auto text-center">
        Welcome to CODEFLOW editor!
      </p>
      <div className="flex w-1/1 items-center justify-center">
        <div className="tab-button-container w-1/2 ml-20 mt-10  my-10 mx-auto flex gap-10 ">
          <Button
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
        </div>
        <div className="w-1/2 ">
          {/* <label className="m-auto" for="themeSelect">
            Select Theme:
          </label>
          <select id="themeSelect" onChange={handleThemeChange}>
            <option selected value="light">
              Light
            </option>
            <option value="vs-dark">Dark</option>
          </select> */}
          <ThemeDropdown handleThemeChange={handleThemeChange} />
        </div>
      </div>

      <div className="editor-container flex  mx-auto m-1 h-full  ">
        <div className="  flex flex-col w-1/2 ">
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
        </div>
        <div className="w-1/2 h-full rounded-xl ">
          <iframe
            className=" mx-auto rounded-xl  "
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="1"
            width="99%"
            height="500px"
          />
        </div>
      </div>
    </div>
  );
}

export default HTMLCompiler;
