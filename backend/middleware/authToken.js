const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, "sakdfjansfjvnahfkasjfsnvakfkasdfh", (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({
          message: "Invalid or expired token.",
          error: true,
          success: false,
        });
      }

      // Attach userId to the request object
      req.userId = decoded?._id;

      next();
    });
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(400).json({
      message: err.message || "Authentication error",
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
