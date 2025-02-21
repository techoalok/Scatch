const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose-connection");

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(()=>{
  dbgr("connected");
})
.catch((err)=>{
  dbgr(err);
})


module.exports = mongoose.connection;