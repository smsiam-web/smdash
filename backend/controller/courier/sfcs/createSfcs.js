const updateSFCSPermission = require("../../../helpers/permission");
const sfcsModel = require("../../../models/sfcsModel");

async function CreateSFCSController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!updateSFCSPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const createSfcs = new sfcsModel(req.body);
    const saveSfcs = await createSfcs.save();

    res.status(201).json({
      message: "SFCS config successfully",
      error: false,
      success: true,
      data: saveSfcs,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = CreateSFCSController;
