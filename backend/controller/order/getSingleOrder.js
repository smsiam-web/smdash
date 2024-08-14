const orderModel = require("../../models/orderModel");

const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const signleOrder = await orderModel.findById(orderId);

    res.json({
      data: signleOrder,
      message: "Ok",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getSingleOrder;
