const uploadCustomerPermission = require("../../helpers/permission");
const customerModel = require("../../models/customerModel");

async function updateCustomerController(req, res) {
  try {
    // Check for permission
    if (!uploadCustomerPermission(req.userId)) {
      throw new Error("Permission denied. Only admin can update.");
    }

    const { _id, orderId, ...resBody } = req.body;

    // Validate _id
    if (!_id) {
      throw new Error("Customer ID is required for update.");
    }

    // Find the customer by ID and update
    const updateCustomer = await customerModel.findByIdAndUpdate(_id, resBody, {
      new: true,
    });

    // If the customer doesn't exist
    if (!updateCustomer) {
      throw new Error("Customer not found.");
    }

    // If orders are updated, recalculate the order counters
    if (resBody.orders) {
      updateCustomer.updateOrderCounters();
    }

    // Send successful response
    res.json({
      message: "Customer updated successfully",
      data: updateCustomer,
      success: true,
      error: false,
    });
  } catch (err) {
    // Handle errors
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateCustomerController;
