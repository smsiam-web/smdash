const customerModel = require("../../models/customerModel"); // Adjust path as needed

const getCustomerController = async (req, res) => {
  const { page = 1, limit = 10, q } = req.query; // Default to page 1 and limit 10
  const regex = new RegExp(q, "i", "g");

  try {
    const customers = await customerModel
      .find({
        $or: [
          {
            types: regex,
          },
        ],
      })
      .sort({ createdAt: -1 }) // Sorting by latest orders
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCustomer = await customerModel.countDocuments();
    const totalTypeWiseCustomers = await customerModel.countDocuments({
      types: q,
    });

    const allTypeWiseCount = await customerModel.aggregate([
      {
        $group: {
          _id: "$types", // Group by the 'status' field
          count: { $sum: 1 }, // Count the number of documents for each status
        },
      },
    ]);

    res.json({
      customers,
      totalCustomer,
      allTypeWiseCount,
      totalTypeWiseCustomers,
      totalPages: Math.ceil(totalCustomer / limit),
      totalStatusPages: Math.ceil(totalTypeWiseCustomers / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve customer" });
  }
};

module.exports = getCustomerController;
