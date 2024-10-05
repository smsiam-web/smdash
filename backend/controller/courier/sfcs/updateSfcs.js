const updateSFCSPermission = require("../../../helpers/permission");
const sfcsModel = require("../../../models/sfcsModel");

async function updateSFCSController(req, res) {
  try {
    // Check for permission
    if (!updateSFCSPermission(req.userId)) {
      throw new Error("Permission denied. Only admin can update.");
    }

    const { _id, ...resBody } = req.body;

    // Validate _id
    if (!_id) {
      throw new Error("SFCS ID is required for update.");
    }

    // Find the sfcs by ID and update
    const updateSFCS = await sfcsModel.findByIdAndUpdate(_id, resBody, {
      new: true,
    });

    // If the customer doesn't exist
    if (!updateSFCS) {
      throw new Error("Customer not found.");
    }

    // Send successful response
    res.json({
      message: "SFCS updated successfully",
      data: updateSFCS,
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

module.exports = updateSFCSController;
