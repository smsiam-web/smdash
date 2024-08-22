const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderId: { type: String, required: true },
  status: {
    type: String,
    enum: ["in_review", "delivered", "canceled", "fake", "pending", "returned"],
    default: "in_review",
  },
  orderDate: { type: Date, default: Date.now },
});

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    orders: [orderSchema],
    totalDeliveredOrders: { type: Number, default: 0 },
    totalCanceledOrders: { type: Number, default: 0 },
    totalPendingOrders: { type: Number, default: 0 },
    totalFakeOrders: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

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
  this.totalFakeOrders = this.orders.filter(
    (order) => order.isFakeOrder
  ).length;
};

const customerModel = mongoose.model("customer", customerSchema);

module.exports = customerModel;
