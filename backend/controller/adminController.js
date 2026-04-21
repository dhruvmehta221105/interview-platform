const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// REGISTER ADMIN (Protected - only existing admins can create new admins)
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin", // ✅ Set as admin
    });

    return res.status(201).json({
      message: "Admin created successfully",
      user: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token: generateToken(admin._id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ALL ADMINS (For admin dashboard)
const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    
    if (!admins.length) {
      return res.status(404).json({ message: "No admins found" });
    }

    return res.json({
      message: "Admins retrieved successfully",
      admins: admins,
      totalAdmins: admins.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PROMOTE USER TO ADMIN (Only existing admins can do this)
const promoteToAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "User is already an admin" });
    }

    user.role = "admin";
    await user.save();

    return res.json({
      message: "User promoted to admin successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DEMOTE ADMIN TO USER
const demoteAdminToUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ message: "User is not an admin" });
    }

    user.role = "user";
    await user.save();

    return res.json({
      message: "Admin demoted to user successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin,
  getAllAdmins,
  promoteToAdmin,
  demoteAdminToUser,
};
