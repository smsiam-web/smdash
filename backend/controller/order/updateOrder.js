const uploadOrderPermission = require("../../helpers/permission");
const orderModel = require("../../models/orderModel");

async function updateOrderController(req, res) {
  try {
    if (!uploadOrderPermission(req.userId)) {
      throw new Error("Permission denied, Only admin can update");
    }

    const { _id, ...resBody } = req.body;

    const updateOrder = await orderModel.findByIdAndUpdate(_id, resBody);

    res.json({
      message: "Order update successfully",
      data: updateOrder,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateOrderController;
