const customerModel = require("../../models/customerModel");

const getSingleCustomerController = async (req, res) => {
  try {
    const { customerId } = req.body;

    const signleCustomer = await customerModel.findById(customerId);

    res.json({
      message: "Customer data found",
      success: true,
      error: false,
      data: signleCustomer,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getSingleCustomerController;
