const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: {
    type: String,
    
  },
  address: {
    type: String,
  },
  phNumber: {
    type: String,
   
  },
  dob: {
    type: Date,
  },
  experience: {
    type: String,
  },
  User:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    
  }

});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
