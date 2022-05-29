const Product=require('../models/ProductModel')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts=async (req,res)=>{
    try {
        const products=await Product.find({});
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: `Internal server error:${err}` })
    }
}

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById=async (req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(product)
             res.json(product)
        else
             res.status(404).json({message:"Product Not Found !!"})
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports={getProducts,getProductById}