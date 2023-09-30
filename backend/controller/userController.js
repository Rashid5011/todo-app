const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generatetoken");

const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist with this email");
  }

  const user = await User.create({
    name,
    email,
    password,
    picture,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("user Error");
  }

  res.json({ name, email, password, picture });
});

const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchpassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // Change to 401 for unauthorized
    throw new Error("Invalid username or password");
  }
});

module.exports = { registerUser, authUser };
