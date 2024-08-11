const SalesCounter = require("../../models/salesCounter");

async function salesCounterDetailsController(req, res) {
  try {
    const salesCounter = await SalesCounter.findOne({});

    res.status(200).json({
      data: salesCounter,
      error: false,
      success: true,
      message: "SalesCounter details",
    });

    console.log("salesCounter", salesCounter);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = salesCounterDetailsController;
