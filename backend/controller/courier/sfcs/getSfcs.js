const sfcsModel = require("../../../models/sfcsModel");

const getSFCSController = async (req, res) => {
  try {
    const sfcs = await sfcsModel.find().sort({ createdAt: -1 });

    res.json({
      message: "SFCS data found!",
      success: true,
      error: false,
      data: sfcs,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getSFCSController;
