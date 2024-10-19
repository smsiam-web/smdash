const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Please provide email",
        error: true,
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Please provide password",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "8h", // Adjust as needed
      });

      const tokenOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      // const tokenOptions = {
      //   httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      //   secure: true, // Ensures the cookie is sent only over HTTPS
      //   sameSite: "None", // Allows the cookie to be sent across different origins
      // };

      res.cookie("token", token, tokenOptions).status(200).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      return res.status(401).json({
        message: "Invalid password",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
