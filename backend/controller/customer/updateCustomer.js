const uploadOrderPermission = require("../../helpers/permission");
const customerModel = require("../../models/customerModel");

async function updateCustomerController(req, res) {
  try {
    if (!uploadOrderPermission(req.userId)) {
      throw new Error("Permission denied, Only admin can update");
    }

    const { _id, ...resBody } = req.body;

    const updateCustomer = await customerModel.findByIdAndUpdate(_id, resBody);

    res.json({
      message: "Customer update successfully",
      data: updateCustomer,
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

module.exports = updateCustomerController;
