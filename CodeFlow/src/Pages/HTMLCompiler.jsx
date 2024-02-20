import { useEffect, useRef, useState } from "react";
import Button from "../Components/Button";
import Editor, { useMonaco } from "@monaco-editor/react";
function HTMLCompiler() {
  const [openedEditor, setOpenedEditor] = useState("html");
  const [html, setHTML] = useState("//HTML");
  const [css, setCSS] = useState("{* CSS *}");
  const [javascript, setJS] = useState("//JAVASCRIPT");
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
      {/* {`${html} : ${css}  : ${javascript}`} */}
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
          <label className="m-auto" for="themeSelect">
            Select Theme:
          </label>
          <select id="themeSelect">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      {/* <div className="w-1/2">
        <h1 className="openedEditor   mx-auto w-fit text-4xl my-5  py-1">{`Editing ${openedEditor}`}</h1>
      </div> */}
      <div className="editor-container flex  mx-auto m-1 h-full  ">
        <div className="  flex flex-col w-1/2 ">
          {openedEditor === "HTML" ? (
            <div className="HTML-Editor flex flex-col w-1/1 ">
              {/* <p className="mx-auto w-fit text-3xl p-1 ">Input</p> */}
              <Editor
                height="500px"
                width="100%"
                className="mx-auto"
                theme="vs-dark"
                value={html}
                // defaultValue={html}
                onChange={handleHTMLChange}
              />
            </div>
          ) : openedEditor === "CSS" ? (
            <div className="CSS-Editor  w-1/1 ">
              {/* <p className="mx-auto w-fit text-3xl p-1 ">Input</p> */}
              <Editor
                height="500px"
                width="100%"
                className="m-auto"
                language="css"
                // defaultValue={css}
                value={css}
                theme="vs-dark"
                onChange={handleCSSChange}
              />
            </div>
          ) : (
            <div className="JS-Editor w-1/1">
              {/* <p className="mx-auto w-fit text-3xl p-1 ">Input</p> */}
              <Editor
                height="500px"
                width="100%"
                className="m-auto"
                language="javascript"
                value={javascript}
                theme="vs-dark"
                onChange={handleJSChange}
              />
            </div>
          )}
        </div>
        <div className="w-1/2 h-full rounded-xl ">
          {/* <p className="mx-auto w-fit text-3xl p-1 ">Output</p> */}
          <iframe
            className="bg-lime-200 mx-auto rounded-xl  "
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="1"
            width="99%"
            height="500px"
          />
        </div>
      </div>

      {/* <div className="HTML-Editor w-4/5 m-auto">
        <Editor
          min-height="300px"
          language="html"
          theme="vs-dark"
          onChange={handleHTMLChange}
        />
      </div> */}
      {/* <Editor language="css" onChange={handleCSSChange} />
      <Editor language="html" onChange={handleJSChange} /> */}
    </div>
  );
}

export default HTMLCompiler;
