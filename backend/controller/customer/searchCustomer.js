const Customer = require("../../models/customerModel");

const searchCustomerController = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i", "g");

    const customer = await Customer.find({
      $or: [
        {
          name: regex,
        },
        {
          phone: regex,
        },
      ],
    });

    res.json({
      data: customer,
      message: "Search customer list",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = searchCustomerController;
