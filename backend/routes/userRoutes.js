const express=require('express');
const authUser = require('../controllers/userController');
const registerUser = require('../controllers/userController');
const protect=require('../middleware/authMiddleware')
const router=express()
const generateToken=require('../utils/generateToken')
const User=require('../models/UserModel')

router.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email})
        console.log(user)
        if(user && await user.matchPassword(password)){
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
              });
        }

    } catch (error) {
        res.status(401).json({msg:"User Not found"})
    }
})
router.route('/',registerUser)
router.route('/profile',protect,authUser)

module.exports=router;   