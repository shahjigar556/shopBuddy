const express=require('express')
const products=require('./data/products')
const connectDB=require('./config/db');
const colors=require('colors')
const dotenv=require('dotenv')
const productRoutes=require('./routes/productRoutes')
const userRoutes=require('./routes/userRoutes')
var cors = require('cors')

dotenv.config()
connectDB()

const app=express();
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes);

const PORT=process.env.PORT || 5000

app.listen(PORT, console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  ))