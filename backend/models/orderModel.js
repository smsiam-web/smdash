const mongoose = require("mongoose");
const Counter = require("./counterModel");
const SalesCounter = require("./salesCounter");

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
      unique: true,
      index: true,
    },
    amount: String,
    deliveryType: String,
    contact: String,
    items: [],
    name: String,
    address: String,
    courier: String,
    note: String,
    createdBy: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", async function (next) {
  const doc = this;

  const str = doc.amount;
  const orderTotal = Number(str);

  const currentDate = new Date();
  const startOfToday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const salesCounter = await SalesCounter.findOne({});

  if (!salesCounter) {
    await SalesCounter.create({
      totalSales: orderTotal,
      todaySales: orderTotal,
      yesterdaySales: 0,
      thisMonthSales: orderTotal,
      lastUpdated: currentDate,
      createdAt: currentDate,
    });
  } else {
    if (salesCounter.lastUpdated < startOfToday) {
      // If it's a new day, shift todaySales to yesterdaySales and reset todaySales
      salesCounter.yesterdaySales = salesCounter.todaySales;
      salesCounter.todaySales = orderTotal;
      salesCounter.lastUpdated = currentDate;
    } else {
      // If it's the same day, just increment todaySales
      salesCounter.todaySales += orderTotal;
    }

    // Check if the month has changed
    if (salesCounter?.lastUpdated.getMonth() !== currentDate.getMonth()) {
      salesCounter.thisMonthSales = orderTotal;
    } else {
      salesCounter.thisMonthSales += orderTotal;
    }

    // Increment totalSales regardless of the day
    salesCounter.totalSales += orderTotal;
    // Update the last updated timestamp
    salesCounter.lastUpdated = currentDate;

    await salesCounter.save();
  }

  const counter = await Counter.findByIdAndUpdate(
    { _id: "orderId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  doc.orderId = counter.seq;
  next();
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
