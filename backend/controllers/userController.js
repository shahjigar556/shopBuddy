const User = require("../models/UserModel")


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        console.log('here-------')
        const user=await User.findOne({email})
        if(user && await user.matchPassword(user.password)){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
              });
        }

    } catch (error) {
        res.status(401)
    }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserprofile=async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404).json({msg:"User not found"})
      // throw new Error('User not found')
    }
  }

module.exports={authUser,getUserprofile}