const uploadProductPermission = require("../../helpers/permission");
const customerModel = require("../../models/customerModel");

async function CreateCustomerController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const createCustomer = new customerModel(req.body);
    const saveCustomer = await createCustomer.save();

    res.status(201).json({
      message: "Customer created successfully",
      error: false,
      success: true,
      data: saveCustomer,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = CreateCustomerController;
