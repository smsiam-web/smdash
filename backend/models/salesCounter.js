const mongoose = require("mongoose");

const salesCounterSchema = new mongoose.Schema({
  todaySales: {
    type: Number,
    default: 0,
  },
  thisMonthSales: {
    type: Number,
    default: 0,
  },
  yesterdaySales: {
    type: Number,
    default: 0,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const SalesCounter = mongoose.model("SalesCounter", salesCounterSchema);

module.exports = SalesCounter;
