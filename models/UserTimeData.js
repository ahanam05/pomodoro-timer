const mongoose = require("mongoose");

const userTimeDataSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  totalPomoMins: { type: Number, default: 0 },
  totalBreakMins: { type: Number, default: 0 },
  yearPomoMins: [
    {
      date: { type: String, required: true }, 
      minutes: { type: Number, required: true }, 
    },
  ],
  yearBreakMins: [
    {
      date: { type: String, required: true }, 
      minutes: { type: Number, required: true }, 
    },
  ],
});

  
const UserTimeData = mongoose.model("UserTimeData", userTimeDataSchema);
  
module.exports = UserTimeData;