const orderModel = require("../models/orderModel"); // Adjust path as needed

const orderController = async (req, res) => {
  const { page = 1, limit = 10, q } = req.query; // Default to page 1 and limit 10
  const regex = new RegExp(q, "i", "g");

  try {
    const orders = await orderModel
      .find({
        $or: [
          {
            status: regex,
          },
        ],
      })
      .sort({ createdAt: -1 }) // Sorting by latest orders
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Count total documents for pagination info
    const totalOrders = await orderModel.countDocuments();
    const totalStatusWiseOrders = await orderModel.countDocuments({
      status: q,
    });
    const allStatusWiseCount = await orderModel.aggregate([
      {
        $group: {
          _id: "$status", // Group by the 'status' field
          count: { $sum: 1 }, // Count the number of documents for each status
        },
      },
    ]);

    res.json({
      orders,
      totalOrders,
      allStatusWiseCount,
      totalStatusWiseOrders,
      totalPages: Math.ceil(totalOrders / limit),
      totalStatusPages: Math.ceil(totalStatusWiseOrders / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

module.exports = orderController;
