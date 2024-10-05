const getUserPermission = require("../../helpers/permission");

const userModel = require("../../models/userModel"); // Adjust path as needed

const getUserController = async (req, res) => {
  console.log(req._id);
  const { page = 1, limit = 10, q } = req.query; // Default to page 1 and limit 10
  const regex = new RegExp(q, "i", "g");

  try {
    const user = await userModel
      .find({
        $or: [
          {
            role: regex,
          },
        ],
      })
      .sort({ createdAt: -1 }) // Sorting by latest orders
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalUser = await userModel.countDocuments();
    const totalRoleWise = await userModel.countDocuments({
      role: q,
    });

    const allRoleWise = await userModel.aggregate([
      {
        $group: {
          _id: "$role", // Group by the 'status' field
          count: { $sum: 1 }, // Count the number of documents for each status
        },
      },
    ]);

    res.json({
      user,
      totalUser,
      allRoleWise,
      totalRoleWise,
      totalPages: Math.ceil(totalUser / limit),
      totalStatusPages: Math.ceil(totalRoleWise / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve all-user" });
  }
};

module.exports = getUserController;
