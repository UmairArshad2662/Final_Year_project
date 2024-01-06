const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PerformanceSchema = new Schema({
  rank: {
    type: String,
    required: true,
  },
  User:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
});

const Performance = mongoose.model("Performance", PerformanceSchema);

module.exports = Performance;
