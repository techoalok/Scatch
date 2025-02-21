const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

const isLoggedin = async (req, res, next) => {  
  if(!req.cookies.token) {
    req.flash('error', 'Please login to access this page');
    return res.redirect('/');
  }
  try {
    let token = req.cookies.token;
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    let user =  await userModel.findOne({email: decoded.email}).select('-password');
    // if(!user) return res.send("User not found");
    req.user = user;
      
    next(); 

  } catch (err) {
    req.flash("error", "somehing token");
    return res.redirect('/');
  }
}
module.exports = isLoggedin;