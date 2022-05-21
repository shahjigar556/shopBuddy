import React from 'react'
import '../products';
import Product from './Product';
import {Row,Col} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import axios from 'axios'


function HomeScreen() {
  const [products,setProducts]=useState([]);
  const fetchProducts=async ()=>{
    const {data}=await axios.get('/api/products')
    setProducts(data);
  }
  useEffect(()=>{
    fetchProducts();
  },[])
  return (
    <React.Fragment>
        <h1 style={{marginTop:"20px"}}>Latest Products</h1>
        <Row>
            {products.map((product,idx)=>{
                return <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                    <Product product={product} key={idx} />
                </Col>
            })}
        </Row>
    </React.Fragment>
  )
}

export default HomeScreen