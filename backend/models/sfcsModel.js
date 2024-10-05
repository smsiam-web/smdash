const mongoose = require("mongoose");

const sfcsSchema = mongoose.Schema(
  {
    api_key: String,
    secret_key: String,
    base_url: String,
    courier: String,
    createdBy: String,
  },
  {
    timestamps: true,
  }
);

const sfcsModel = mongoose.model("sfcs", sfcsSchema);

module.exports = sfcsModel;
