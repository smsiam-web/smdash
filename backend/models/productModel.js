const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    slug: String,
    unit: String,
    stock: String,
    sku: String,
    productName: String,
    category: String,
    productImage: [],
    description: String,
    price: String,
    sellingPrice: String,
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
