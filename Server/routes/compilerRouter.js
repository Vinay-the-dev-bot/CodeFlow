const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const app = express();
const fs = require("fs");
app.use(bodyParser.json());
const path = require("path");
const compileRouter = express.Router();

compileRouter.post("/", async (req, res) => {
  const { language, code } = req.body;
  console.log(language);
  console.log(code);
  switch (language) {
    case "java": {
      console.log(1);
      fs.writeFile("main.java", code, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error writing Java file" });
        } else {
          console.log(2);
          exec("javac main.java", (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ error: "Compilation error", stderr });
            } else {
              console.log(3);
              exec("java main", (err, stdout, stderr) => {
                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .json({ error: "Execution error", stderr });
                } else {
                  console.log(4);
                  console.log(stdout);
                  fs.unlink("main.java", (err) => {
                    if (err) {
                      console.error(err);
                      return res
                        .status(500)
                        .json({ error: "Error deleting Java file" });
                    }
                    console.log("Java file deleted successfully");
                  });
                  res.send({ language: "Java", output: stdout });
                }
              });
            }
          });
        }
      });
      return;
    }
    case "python": {
      fs.writeFile("python.py", code, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error writing Python file" });
        }

        exec(`python  python.py`, (err, stdout, stderr) => {
          console.log("executed");
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Execution error", stderr });
          }
          console.log(stdout);
          res.send({ language: "Python", Output: stdout });
        });
      });
      return;
    }
    case "javascript": {
      try {
        const result = await eval(code);
        res.send({ language: "JavaScript", output: result });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Execution error", stderr: err.message });
      }
      return;
    }
    default: {
      res.send({ msg: "Please select language" });
      return;
    }
  }
});

module.exports = { compileRouter };
