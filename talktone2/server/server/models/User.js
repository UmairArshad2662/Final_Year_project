const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  cnic: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "operator", 
  },
  Profile:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Profile",
  
  },
  Performance:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Performance",
  
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
