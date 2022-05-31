const express = require("express");
const authUser = require("../controllers/userController");
const registerUser = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express();
const generateToken = require("../utils/generateToken");
const User = require("../models/UserModel");
const { route } = require("express/lib/application");

// @desc    Update user profile
// @route   PUT /api/users/login
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(401).json({ msg: "User Not found" });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.post("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ msg: "No user found" });
  }
});

router.get("/profile", protect,async (req, res) => {

  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({msg:'User not found'});
  }
});

router.route("/", registerUser);

module.exports = router;
