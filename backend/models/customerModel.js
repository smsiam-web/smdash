const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderId: { type: String, required: true },
  status: {
    type: String,
    default: "pending",
  },
  orderDate: { type: Date, default: Date.now },
});

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    orders: [orderSchema],
    types: String,
    totalDeliveredOrders: { type: Number, default: 0 },
    totalCanceledOrders: { type: Number, default: 0 },
    totalPendingOrders: { type: Number, default: 0 },
    totalInReviewOrders: { type: Number, default: 0 },
    totalFakeOrders: { type: Number, default: 0 },
    totalReturnedOrders: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre("save", async function (next) {
  this.updateOrderCounters();
  next();
});

customerSchema.post("findOneAndUpdate", function (doc) {
  if (doc) {
    doc.updateOrderCounters();
    doc.save();
  }
});

customerSchema.methods.updateOrderCounters = function () {
  this.totalDeliveredOrders = this.orders.filter(
    (order) => order.status === "delivered"
  ).length;

  this.totalCanceledOrders = this.orders.filter(
    (order) => order.status === "canceled"
  ).length;

  this.totalPendingOrders = this.orders.filter(
    (order) => order.status === "pending"
  ).length;

  this.totalInReviewOrders = this.orders.filter(
    (order) => order.status === "in_review"
  ).length;

  this.totalFakeOrders = this.orders.filter(
    (order) => order.status === "fake"
  ).length;

  this.totalReturnedOrders = this.orders.filter(
    (order) => order.status === "returned"
  ).length;
};

const customerModel = mongoose.model("customer", customerSchema);

module.exports = customerModel;
