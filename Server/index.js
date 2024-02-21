const express = require("express");
require("dotenv").config();
const {connection} = require("./config/db");
const {userRouter} = require("./routes/user.route");
const { auth } = require("./middleware/auth.middleware");
const { access } = require("./middleware/access.middleware");
const cors = require("cors");

const app= express();

app.use(express.json());
app.use(cors());

app.use("/users" , userRouter);


app.get("/", (req, res) => {
    res.send("Welcome to home page");
  });

app.get("/list", auth , access(["admin", "user"]), (req, res) => {
    res.json({ msg: "All Questions list" });
});


app.listen(process.env.port ,async()=>{
   try{
     await connection;
    console.log(`Server is running at http://localhost:${process.env.port}`);
    console.log("codeFlow database is connected..");

   }catch(err){
    console.log(err);
   }
})
