const uploadOrderPermission = require("../../helpers/permission");
const orderModel = require("../../models/orderModel");

async function UploadOrderController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadOrderPermission(sessionUserId)) {
      throw new Error("Permission denied, only ADMIN can...");
    }

    const uploadOrder = new orderModel(req.body);
    const saveOrder = await uploadOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      error: false,
      success: true,
      data: saveOrder,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadOrderController;
