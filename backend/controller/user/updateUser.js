const userModel = require("../../models/userModel");
const updateUserPermission = require("../../helpers/permission");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;
    if (!updateUserPermission(sessionUser)) {
      throw new Error("Permission denied");
    }

    const { _id, email, name, role } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const updateUser = await userModel.findByIdAndUpdate(_id, payload);

    res.json({
      data: updateUser,
      message: "User Updated",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
