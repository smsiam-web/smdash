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
    totalAmount: String,
    paidAmount: String,
    discount: String,
    conditionAmount: String,
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

  const totalStr = doc.totalAmount;
  const paidStr = doc.paidAmount;
  const codStr = doc.conditionAmount;

  const orderTotal = Number(totalStr);
  const paidTotal = Number(paidStr);
  const codTotal = Number(codStr);

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
      totalPaid: paidTotal,
      totalCod: codTotal,

      todaySales: orderTotal,
      todayPaid: paidTotal,
      todayCod: codTotal,

      yesterdaySales: 0,
      yesterdayPaid: 0,
      yesterdayCod: 0,

      thisMonthSales: orderTotal,
      thisMonthPaid: paidTotal,
      thisMonthCod: codTotal,

      lastUpdated: currentDate,
      createdAt: currentDate,
    });
  } else {
    if (salesCounter.lastUpdated < startOfToday) {
      // If it's a new day, shift todaySales to yesterdaySales and reset todaySales
      salesCounter.yesterdaySales = salesCounter.todaySales;
      salesCounter.yesterdayPaid = salesCounter.yesterdayPaid;
      salesCounter.yesterdayCod = salesCounter.yesterdayCod;

      salesCounter.todaySales = orderTotal;
      salesCounter.totalPaid = paidTotal;
      salesCounter.totalCod = codTotal;

      salesCounter.lastUpdated = currentDate;
    } else {
      // If it's the same day, just increment todaySales
      salesCounter.todaySales += orderTotal;
      salesCounter.todayPaid += paidTotal;
      salesCounter.todayCod += codTotal;
    }

    // Check if the month has changed
    if (salesCounter?.lastUpdated.getMonth() !== currentDate.getMonth()) {
      salesCounter.thisMonthSales = orderTotal;
      salesCounter.thisMonthPaid = paidTotal;
      salesCounter.thisMonthCod = codTotal;
    } else {
      salesCounter.thisMonthSales += orderTotal;
      salesCounter.thisMonthPaid += paidTotal;
      salesCounter.thisMonthCod += codTotal;
    }

    // Increment totalSales regardless of the day
    salesCounter.totalSales += orderTotal;
    salesCounter.totalPaid += paidTotal;
    salesCounter.totalCod += codTotal;

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
