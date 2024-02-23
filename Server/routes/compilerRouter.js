const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const app = express();
const fs = require("fs");
app.use(bodyParser.json());
const path = require("path");
const { QuestionModel } = require("../models/question.model");
const compileRouter = express.Router();

compileRouter.post("/solve", async (req, res) => {
  console.log("SOLVE");
  let { language, code, customInput } = req.body;
  // console.log(language);
  // console.log(code);
  // console.log(customInput);
  switch (language) {
    case "java": {
      fs.writeFile("main.java", code, (err) => {
        if (err) {
          //console.error(err);
          return res.status(500).json({ error: "Error writing Java file" });
        } else {
          exec("javac main.java", (err, stdout, stderr) => {
            if (err) {
              //console.error(err);
              return res
                .status(500)
                .json({ error: "Compilation error", stderr });
            } else {
              console.log("+++++++++++", customInput);
              customInput = customInput.replaceAll("\n", " ");
              console.log("--------------", customInput);
              exec(`echo ${customInput} | java main`, (err, stdout, stderr) => {
                if (err) {
                  //console.error(err);
                  return res
                    .status(500)
                    .json({ error: "Execution error", stderr });
                } else {
                  console.log(stdout);
                  fs.unlink("main.java", (err) => {
                    if (err) {
                      //console.error(err);
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
          //console.error(err);
          return res.status(500).json({ error: "Error writing Python file" });
        }
        const stdin = customInput.replaceAll(" ", "\n");
        const inputs = customInput.split(" ");
        const processssss = exec(`python  python.py`, (err, stdout, stderr) => {
          console.log("executed");
          if (err) {
            //console.error(err);
            return res.status(500).json({ error: "Execution error", stderr });
          }
          console.log(stdout);
          res.send({ language: "Python", output: stdout });
        });
        inputs.forEach((input) => {
          processssss.stdin.write(input + "\n");
        });

        processssss.stdin.end();
      });
      return;
    }
    case "javascript": {
      try {
        const result = await eval(code);
        res.send({ language: "JavaScript", output: result });
      } catch (err) {
        //console.error(err);
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

compileRouter.post("/submit", async (req, res) => {
  console.log(
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSOLVE"
  );
  let { language, code, customInput, questionId } = req.body;
  // console.log(language);
  // console.log(code);
  // console.log(customInput);
  console.log(questionId);
  const question = await QuestionModel.findOne({
    _id: questionId,
  });
  console.log(question.testCases.length);
  const testCaseOP = [];
  const error = [];
  let responseSent = false;
  switch (language) {
    case "java": {
      try {
        fs.writeFile("main.java", code, (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Error writing Java file" });
            i += question.testCases.length;
            return;
          } else {
            for (
              var i = 0;
              i < question.testCases.length && !responseSent;
              i++
            ) {
              const testCase = question.testCases[i].inp;
              console.log(testCase);
              exec("javac main.java", (err, stdout, stderr) => {
                if (err) {
                  //console.error(err);
                  res.status(500).json({ error: "Compilation error", stderr });
                  i += question.testCases.length;
                  return;
                } else {
                  let customInput = testCase;
                  console.log("+++++++++++", customInput);
                  customInput = customInput.replaceAll("\n", " ");
                  console.log("--------------", customInput);
                  exec(
                    `echo ${customInput} | java main`,
                    (err, stdout, stderr) => {
                      if (err) {
                        //console.error(err);
                        res
                          .status(500)
                          .json({ error: "Execution error", stderr });
                        i += question.testCases.length;
                        return;
                      } else {
                        // console.log("askasclsdc", question.testCases[0]);
                        testCaseOP.push({
                          tcId: question.testCases[0]._id,
                          stdout,
                        });
                        if (testCaseOP.length == 4) {
                          console.log(testCaseOP);
                          console.log("DONE");
                          res.send({ language: "Java", output: testCaseOP });
                          i += question.testCases.length;
                          return;
                        }
                      }
                    }
                  );
                }
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
      return;
    }
    case "python": {
      fs.writeFile("python.py", code, (err) => {
        if (err) {
          //console.error(err);
          return res.status(500).json({ error: "Error writing Python file" });
        }
        const stdin = customInput.replaceAll(" ", "\n");
        const inputs = customInput.split(" ");
        const processssss = exec(`python  python.py`, (err, stdout, stderr) => {
          console.log("executed");
          if (err) {
            //console.error(err);
            return res.status(500).json({ error: "Execution error", stderr });
          }
          console.log(stdout);
          res.send({ language: "Python", output: stdout });
        });
        inputs.forEach((input) => {
          processssss.stdin.write(input + "\n");
        });

        processssss.stdin.end();
      });
      return;
    }
    case "javascript": {
      try {
        const result = await eval(code);
        res.send({ language: "JavaScript", output: result });
      } catch (err) {
        //console.error(err);
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

compileRouter.post("/submit22", async (req, res) => {
  let { language, code, customInput, questionId } = req.body;
  console.log(questionId);
  const question = await QuestionModel.findOne({
    _id: questionId,
  });
  console.log(question.testCases.length);
  const testCaseOP = [];
  const errors = [];
  let responseSent = false;
  switch (language) {
    case "java": {
      fs.writeFile("main.java", code, (err) => {
        if (err) {
          console.error(err);
          errors.push(err);
        } else {
          for (var i = 0; i < question.testCases.length && !responseSent; i++) {
            const testCase = question.testCases[i].inp;
            console.log(testCase);
            exec("javac main.java", (err, stdout, stderr) => {
              if (err) {
                errors.push({ error: "Compilation error", stderr });
                return;
              } else {
                let customInput = testCase;
                customInput = customInput.replaceAll("\n", " ");
                exec(
                  `echo ${customInput} | java main`,
                  (err, stdout, stderr) => {
                    if (err) {
                      errors.push({ error: "Execution error", stderr });
                      return;
                    } else {
                      testCaseOP.push({
                        tcId: question.testCases[0]._id,
                        stdout,
                      });
                      if (testCaseOP.length == 4) {
                        res.send({
                          language: "Java",
                          output: testCaseOP,
                          errors: errors,
                        });
                        i += question.testCases.length;
                        return;
                      }
                    }
                  }
                );
              }
            });
          }
        }
      });
      return;
    }
    case "python": {
      fs.writeFile("python.py", code, (err) => {
        if (err) {
          //console.error(err);
          return res.status(500).json({ error: "Error writing Python file" });
        }
        const stdin = customInput.replaceAll(" ", "\n");
        const inputs = customInput.split(" ");
        const processssss = exec(`python  python.py`, (err, stdout, stderr) => {
          console.log("executed");
          if (err) {
            //console.error(err);
            return res.status(500).json({ error: "Execution error", stderr });
          }
          console.log(stdout);
          res.send({ language: "Python", output: stdout });
        });
        inputs.forEach((input) => {
          processssss.stdin.write(input + "\n");
        });

        processssss.stdin.end();
      });
      return;
    }
    case "javascript": {
      try {
        const result = await eval(code);
        res.send({ language: "JavaScript", output: result });
      } catch (err) {
        //console.error(err);
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

compileRouter.post("/solve", async (req, res) => {
  let { language, code, customInput, questionId } = req.body;
  // console.log(language);
  // console.log(code);
  // console.log(customInput);
  console.log(questionId);
  const question = await QuestionModel.findOne({
    _id: questionId,
  });
  console.log(question.testCases.length);
  const testCaseOP = [];
  const error = [];
  let responseSent = false;
  switch (language) {
    case "java": {
      for (let i = 0; i < question.testCases.length && !responseSent; i++) {
        const testCase = question.testCases[i].inp;
        console.log(testCase);
        fs.writeFile("main.java", code, (err) => {
          if (err) {
            console.error(1);
            res.status(500).json({ error: "Error writing Java file" });
            responseSent = true;
            return;
          } else {
            console.log(11);
            exec("javac main.java", (err, stdout, stderr) => {
              if (err) {
                console.error(2);
                res.status(500).send({ error: "Compilation error", stderr });
                responseSent = true;
                return;
              } else {
                customInput = testCase.replaceAll("\n", " ");
                console.log("//////////////////", customInput);
                exec(
                  `echo ${customInput} | java main`,
                  (err, stdout, stderr) => {
                    if (err) {
                      console.error(3);
                      res
                        .status(500)
                        .json({ error: "Execution error", stderr });
                      responseSent = true;
                      return;
                    } else {
                      console.log(stdout);
                      // fs.unlink("main.java", (err) => {
                      //   if (err) {
                      //     //console.error(err);
                      //     return res
                      //       .status(500)
                      //       .json({ error: "Error deleting Java file" });
                      //   }
                      //   console.log("Java file deleted successfully");
                      // });
                      console.log(stdout);
                      testCaseOP.push(stdout);

                      // res.send({ language: "Java", output: stdout });
                      if (testCaseOP.length == question.testCases.length) {
                        console.log(4);
                        res.send({ output: testCaseOP });
                        responseSent = true;
                        return;
                      }
                    }
                  }
                );
              }
            });
          }
        });
      }
      console.log(responseSent);
      if (!responseSent) {
        res.send({ result: testCaseOP });
      }
      return;
    }
    case "python": {
      fs.writeFile("python.py", code, (err) => {
        if (err) {
          //console.error(err);
          return res.status(500).json({ error: "Error writing Python file" });
        }
        const stdin = customInput.replaceAll(" ", "\n");
        const inputs = customInput.split(" ");
        const processssss = exec(`python  python.py`, (err, stdout, stderr) => {
          console.log("executed");
          if (err) {
            //console.error(err);
            return res.status(500).json({ error: "Execution error", stderr });
          }
          console.log(stdout);
          res.send({ language: "Python", output: stdout });
        });
        inputs.forEach((input) => {
          processssss.stdin.write(input + "\n");
        });

        processssss.stdin.end();
      });
      return;
    }
    case "javascript": {
      try {
        const result = await eval(code);
        res.send({ language: "JavaScript", output: result });
      } catch (err) {
        //console.error(err);
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

// https://vivmagarwal.notion.site/Readme-Template-c308679e49464cfe9bb86043a4b73da1
// https://www.gitkraken.com/learn/git/best-practices/git-commit-message

// tc = int(input())
// for _ in range(tc):
//     n = int(input())
//     arr = []
//     for _ in range(n):
//         arr.append(int(input()))
//     x = 0
//     for i in range(n):
//         x += arr[i]
//     print("SUM OF ARRAY is", x)

//   import java.util.Scanner;
//   public class main {
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         int tc = sc.nextInt();
//         while(tc-- > 0){
//            int n = sc.nextInt();
//          int[] arr = new int[n];
//          for(int i = 0; i<n;i++){
//           arr[i] = sc.nextInt();
//          }
//          int x = 0;
//          for(int i = 0; i<n;i++){
//           System.out.println(x);
//           x += arr[i];
//          }
//          System.out.println("SUM OF ARRAY is" + x);
//         }
//     }
// }
