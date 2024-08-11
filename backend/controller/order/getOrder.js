const orderModel = require("../../models/orderModel");

const getOrderController = async (req, res) => {
  try {
    const allOrder = await orderModel.find().sort({ createdAt: -1 });

    res.json({
      message: "All Product",
      success: true,
      error: false,
      data: allOrder,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getOrderController;
