const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "error in callback",
      success: false,
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).send({
      usersCount: users.length,
      success: true,
      message: "All users",
      users,
    });
  } catch (error) {
    return res.status(500).send({
      message: "error in getting user",
      success: false,
      error: error.message,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "User does not exist",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Invalid credentials",
        success: false,
      });
    }

    // If login is successful, include user data in the response
    return res.status(200).send({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        // Add other user data fields as needed
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in getting user",
      success: false,
      error: error.message,
    });
  }
};
