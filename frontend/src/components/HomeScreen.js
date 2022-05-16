import React from 'react'
import '../products';
import products from '../products';
import Product from './Product';
import {Row,Col} from 'react-bootstrap'

function HomeScreen() {
  return (
    <React.Fragment>
        <h1 style={{marginTop:"20px"}}>Latest Products</h1>
        <Row>
            {products.map((product,idx)=>{
                return <Col sm={12} md={6} lg={4} xl={3} >
                    <Product product={product} key={idx} />
                </Col>
            })}
        </Row>
    </React.Fragment>
  )
}

export default HomeScreen