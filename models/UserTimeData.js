const mongoose = require("mongoose");

const userTimeDataSchema = new mongoose.Schema({
    userID: {
      type: String,
      unique: true,
    },
    totalPomoMins: {
      type: Number,
    },
    totalBreakMins: {
      type: Number,
    },
    yearPomoMins: {
      type: [[Date, Number]],
    },
    yearBreakMins: {
      type: [[Date, Number]],
    },
});
  
const UserTimeData = mongoose.model("UserTimeData", userTimeDataSchema);
  
module.exports = UserTimeData;