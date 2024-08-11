const orderModel = require("../models/orderModel"); // Adjust path as needed

const orderController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  try {
    const orders = await orderModel
      .find()
      .sort({ createdAt: -1 }) // Sorting by latest orders
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Count total documents for pagination info
    const totalOrders = await orderModel.countDocuments();

    res.json({
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

module.exports = orderController;
