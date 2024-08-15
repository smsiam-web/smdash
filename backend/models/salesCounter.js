const mongoose = require("mongoose");

const salesCounterSchema = new mongoose.Schema({
  todaySales: {
    type: Number,
    default: 0,
  },
  todayPaid: {
    type: Number,
    default: 0,
  },
  todayCod: {
    type: Number,
    default: 0,
  },
  thisMonthSales: {
    type: Number,
    default: 0,
  },
  thisMonthPaid: {
    type: Number,
    default: 0,
  },
  thisMonthCod: {
    type: Number,
    default: 0,
  },
  yesterdaySales: {
    type: Number,
    default: 0,
  },
  yesterdayPaid: {
    type: Number,
    default: 0,
  },
  yesterdayCod: {
    type: Number,
    default: 0,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
  totalPaid: {
    type: Number,
    default: 0,
  },
  totalCod: {
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
