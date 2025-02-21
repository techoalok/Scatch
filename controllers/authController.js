const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken');

module.exports.registerUser = async function(req, res){
  try {
    let {fullname, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.send("User already exists");

    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(password, salt, async (err, hash)=>{
        if(err) return res.send(err.message);
        else{
          let user = await userModel.create({
            fullname,
            email,
            password:hash
          });
        
          // res.send(user);
          let token = generateToken(user);
          // let token = jwt.sign({email, id:user._id}, "alokalok");
          res.cookie("token", token);
          res.send("User created successfully");
        }
      });
    });
  
  } catch (err) {
    res.send(err.message);
  }

}

module.exports.loginUser = async function(req, res){
  try {
    let {email, password} = req.body;

    let user = await userModel
      .findOne({email});
    if(!user) return res.send("User not found");

    bcrypt.compare(password, user.password, (err,result)=>{
      if(result){
        let token = generateToken(user);
        res.cookie("token", token);
        // res.send("User logged in successfully");
        res.redirect('/shop');
      }
      else{
        res.send("Invalid email or password");
      }
    })

}
catch (err) {
  res.send(err.message);
}
}

module.exports.logout = function(req, res){ 
  res.clearCookie("token", "");
  res.redirect('/');
}