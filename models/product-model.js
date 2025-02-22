const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
  image:Buffer,
  name:String,
  price:Number,
  discount:{
    type:Number,
    default:0
  },
  bgcolor:{
    type:String
    
  },
  panelcolor:{
    type:String
  },
  textcolor:{
    type:String
  }
});


module.exports = mongoose.model('product' , productSchema)
