const mongoose = require("mongoose");
const Counter = require("./counterModel");
const SalesCounter = require("./salesCounter");

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      index: true,
    },
    totalAmount: String,
    paidAmount: String,
    discount: String,
    conditionAmount: String,
    shippingCost: String,
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

orderSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  const orderId = this.getQuery()._id;
  if (!update) return next();

  const originalOrder = await orderModel.findById(orderId);

  if (!originalOrder) return next();

  const salesCounter = await SalesCounter.findOne({});
  if (!salesCounter) return next(); // If salesCounter doesn't exist, skip.

  // Calculate the difference between the original order and the updated order
  const orderTotalDiff =
    Number(update.totalAmount || originalOrder.totalAmount) -
    Number(originalOrder.totalAmount);
  const paidTotalDiff =
    Number(update.paidAmount || originalOrder.paidAmount) -
    Number(originalOrder.paidAmount);
  const codTotalDiff =
    Number(update.conditionAmount || originalOrder.conditionAmount) -
    Number(originalOrder.conditionAmount);
  const disTotalDiff =
    Math.abs(Number(update.discount || originalOrder.discount)) -
    Math.abs(originalOrder.discount);
  const shipTotalDiff =
    Number(update.shippingCost || originalOrder.shippingCost) -
    Number(originalOrder.shippingCost);

  const currentDate = new Date();
  const startOfToday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  if (salesCounter.lastUpdated < startOfToday) {
    // If it's a new day, reset today's sales and update yesterday's sales
    salesCounter.yesterdaySales = salesCounter.todaySales;
    salesCounter.yesterdayPaid = salesCounter.todayPaid;
    salesCounter.yesterdayCod = salesCounter.todayCod;
    salesCounter.yesterdayDis = salesCounter.todayDis;
    salesCounter.yesterdayShip = salesCounter.todayShip;

    salesCounter.todaySales = orderTotalDiff;
    salesCounter.todayPaid = paidTotalDiff;
    salesCounter.todayCod = codTotalDiff;
    salesCounter.todayDis = disTotalDiff;
    salesCounter.todayShip = shipTotalDiff;

    salesCounter.lastUpdated = currentDate;
  } else {
    // If it's the same day, update today's sales
    salesCounter.todaySales += orderTotalDiff;
    salesCounter.todayPaid += paidTotalDiff;
    salesCounter.todayCod += codTotalDiff;
    salesCounter.todayDis += disTotalDiff;
    salesCounter.todayShip += shipTotalDiff;
  }

  // Check if the month has changed
  if (salesCounter.lastUpdated.getMonth() !== currentDate.getMonth()) {
    salesCounter.thisMonthSales = orderTotalDiff;
    salesCounter.thisMonthPaid = paidTotalDiff;
    salesCounter.thisMonthCod = codTotalDiff;
    salesCounter.thisMonthDis = disTotalDiff;
    salesCounter.thisMonthShip = shipTotalDiff;
  } else {
    salesCounter.thisMonthSales += orderTotalDiff;
    salesCounter.thisMonthPaid += paidTotalDiff;
    salesCounter.thisMonthCod += codTotalDiff;
    salesCounter.thisMonthDis += disTotalDiff;
    salesCounter.thisMonthShip += shipTotalDiff;
  }

  // Update total sales
  salesCounter.totalSales += orderTotalDiff;
  salesCounter.totalPaid += paidTotalDiff;
  salesCounter.totalCod += codTotalDiff;
  salesCounter.totalDis += disTotalDiff;
  salesCounter.totalShip += shipTotalDiff;

  // Save the updated sales counter
  await salesCounter.save();

  next();
});

orderSchema.pre("save", async function (next) {
  const doc = this;

  const totalStr = doc.totalAmount;
  const paidStr = doc.paidAmount;
  const codStr = doc.conditionAmount;
  const discount = doc.discount;
  const shippingCost = doc.shippingCost;

  const orderTotal = Number(totalStr);
  const paidTotal = Number(paidStr);
  const codTotal = Number(codStr);
  const dis = Number(discount);
  const disTotal = Math.abs(dis);
  const shipTotal = Number(shippingCost);

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
      totalDis: disTotal,
      totalShip: shipTotal,

      todaySales: orderTotal,
      todayPaid: paidTotal,
      todayCod: codTotal,
      todayDis: disTotal,
      todayShip: shipTotal,

      yesterdaySales: 0,
      yesterdayPaid: 0,
      yesterdayCod: 0,
      yesterdayDis: 0,
      yesterdayShip: 0,

      thisMonthSales: orderTotal,
      thisMonthPaid: paidTotal,
      thisMonthCod: codTotal,
      thisMonthDis: disTotal,
      thisMonthShip: shipTotal,

      lastUpdated: currentDate,
      createdAt: currentDate,
    });
  } else {
    if (salesCounter.lastUpdated < startOfToday) {
      // If it's a new day, shift todaySales to yesterdaySales and reset todaySales
      salesCounter.yesterdaySales = salesCounter.todaySales;
      salesCounter.yesterdayPaid = salesCounter.todayPaid;
      salesCounter.yesterdayCod = salesCounter.todayCod;
      salesCounter.yesterdayDis = salesCounter.todayDis;
      salesCounter.yesterdayShip = salesCounter.todayShip;

      salesCounter.todaySales = orderTotal;
      salesCounter.todayPaid = paidTotal;
      salesCounter.todayCod = codTotal;
      salesCounter.todayDis = disTotal;
      salesCounter.todayShip = shipTotal;

      salesCounter.lastUpdated = currentDate;
    } else {
      // If it's the same day, just increment todaySales
      salesCounter.todaySales += orderTotal;
      salesCounter.todayPaid += paidTotal;
      salesCounter.todayCod += codTotal;
      salesCounter.todayDis += disTotal;
      salesCounter.todayShip += shipTotal;
    }

    // Check if the month has changed
    if (salesCounter?.lastUpdated.getMonth() !== currentDate.getMonth()) {
      salesCounter.thisMonthSales = orderTotal;
      salesCounter.thisMonthPaid = paidTotal;
      salesCounter.thisMonthCod = codTotal;
      salesCounter.thisMonthDis = disTotal;
      salesCounter.thisMonthShip = shipTotal;
    } else {
      salesCounter.thisMonthSales += orderTotal;
      salesCounter.thisMonthPaid += paidTotal;
      salesCounter.thisMonthCod += codTotal;
      salesCounter.thisMonthDis += disTotal;
      salesCounter.thisMonthShip += shipTotal;
    }

    // Increment totalSales regardless of the day
    salesCounter.totalSales += orderTotal;
    salesCounter.totalPaid += paidTotal;
    salesCounter.totalCod += codTotal;
    salesCounter.totalDis += disTotal;
    salesCounter.totalShip += shipTotal;

    // Update the last updated timestamp
    salesCounter.lastUpdated = currentDate;

    await salesCounter.save();
  }

  const counter = await Counter.findByIdAndUpdate(
    { _id: "orderId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  doc.orderId = `RA0${counter.seq}`;
  next();
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
