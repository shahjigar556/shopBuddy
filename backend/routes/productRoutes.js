const express=require('express');
const Product = require('../models/ProductModel');
const router = express.Router()

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/',async (req,res)=>{
    try {
        const products=await Product.find({});
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id',async (req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(product)
             res.json(product)
        else
             res.status(404).json({message:"Product Not Found !!"})
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports=router
