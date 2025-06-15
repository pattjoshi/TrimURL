import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find user by ID and exclude sensitive data
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getUserData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
