const express=require('express');
const authUser = require('../controllers/userController');
const protect=require('../middleware/authMiddleware')
const router=express()

router.route('/login',authUser)
router.route('/profile',protect,authUser)

module.exports=router;   