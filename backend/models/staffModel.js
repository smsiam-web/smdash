const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderId: { type: String, required: true },
  // invoiceID: { type: String, required: true },
  status: {
    type: String,
    default: "pending",
  },
  orderDate: { type: Date, default: Date.now },
});
const reportSchema = new Schema({
  reportBy: { type: String, required: false },
  reportDetails: { type: String, required: false },
  // invoiceID: { type: String, required: false },
  orderDate: { type: Date, default: Date.now },
});

const staffSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    orders: [orderSchema],
    report: { type: [reportSchema], default: [] },
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

staffSchema.pre("save", async function (next) {
  this.updateOrderCounters();
  next();
});

staffSchema.post("findOneAndUpdate", function (doc) {
  if (doc) {
    doc.updateStaffCounters();
    doc.save();
  }
});

staffSchema.methods.updateStaffCounters = function () {
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

const staffModel = mongoose.model("stuff", staffSchema);

module.exports = staffModel;
