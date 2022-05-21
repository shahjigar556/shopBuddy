import React from 'react'
import { Link,useHistory } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { listProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch()
  const {product,loading,error} = useSelector((state) => state.product)
  console.log(product)
  useEffect(()=>{
     dispatch(listProduct(match.params.id))
  },[])

  return (
    <>
    <div style={{display:'flex'}}>
        <Button className='btn btn-light my-3' style={{marginLeft:"10px",backgroundColor:'#343A40',color:'white'}} onClick={history.goBack}>
            Go Back
        </Button>
    </div>
    {loading?<Loader/>:error?<Message>{error}</Message>:
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    }
    </>
  )
}

export default ProductScreen;