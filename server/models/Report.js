const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  data: Object,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // auto delete after 24 hrs
  }
});

module.exports = mongoose.model("Report", ReportSchema);