const productModel = require("../../models/productModel"); // Adjust path as needed

const productController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  try {
    const products = await productModel
      .find()
      .sort({ createdAt: -1 }) // Sorting by latest orders
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Count total documents for pagination info
    const totalProducts = await productModel.countDocuments();

    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};

module.exports = productController;
