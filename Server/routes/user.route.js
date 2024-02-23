const express = require("express");
const {UserModel} = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { blackListTokenModel } = require("../models/blacklist.model");
const { AnswerModel } = require("../models/answer.model");
const { auth } = require("../middleware/auth.middleware");
const { access } = require("../middleware/access.middleware");

const userRouter = express.Router();

// get all Users
userRouter.get("/all",async(req,res)=>{
const users = await UserModel.find();
res.status(200).send({users});
})



//registration
userRouter.post("/register", (req, res) => {
    const { name, email, pass, role } = req.body;
  
    try {
      bcrypt.hash(pass, 5, async (err, hash) => {
        if (err) {
          res.status(200).send({ error: err });
        } else {
          const user = new UserModel({name, email, pass: hash, role });
          await user.save();
          console.log(user);
          res.status(200).json({ msg: "Hey! user You are successfully Register" });
        } 
     });
    } catch (err) {
      res.status(400).send({ error : "err" });
    }
  });
  
  
  //login
  userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        bcrypt.compare(pass, user.pass, (err, result) => {
          if (result) {
            const token = jwt.sign({ userID: user._id }, "codeflow", { expiresIn: "7d"});
            res .status(200).send({ msg: "Login Successfull!", token});
             
          } else {
            res .status(200).send({ msg: "Please register first, wrong Credential" });
             }
        });
      }
    } catch (err) {
      res.status(400).send({ error: "err" });
   }
  });
  
  
  //logout
  userRouter.get("/logout", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
      const blacklist = new blackListTokenModel({ token });
      await blacklist.save();
      res.status(200).send({ msg: "You are Logged out" });
    } catch (err) {
      res.status(400).send({ error: "err" });
    }
  });


userRouter.post("/:questionID/answer", auth, async (req, res) => {
    const {questionID} =req.params
    console.log(questionID);
    const{userID,answer}=req.body
    try {
      const ans = new AnswerModel({questionID,userID,answer});
      await ans.save();
      res.status(200).send({ msg: "New ans Added." });
    } catch (err) {
      console.log("Error:", err);
      res.status(400).send({ msg: "Bad Request." });
    }
  });



userRouter.get("/submissions",auth,async(req,res)=>{
  try{
    
      const notes =await AnswerModel.find({userID:req.body.userID})
      res.status(200).send({notes})
  }catch(err){
      res.status(400).send({"error":err})
  }
})

  

module.exports = {
    userRouter
}




// {
//     "name":"Aishwarya",
//     "email":"aishwarya@gmail.com",
//     "pass":"aishwarya",
//     "role":"admin"
// }