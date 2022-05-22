import React from 'react'
import { Link,useHistory } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem ,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { listProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'


const ProductScreen = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [qty,setQty]=useState(1);
  const {product,loading,error} = useSelector((state) => state.productDetails)
  useEffect(()=>{
     dispatch(listProduct(match.params.id))
  },[])

  const addCartHandler=()=>{
    dispatch(addToCart(match.params.id,qty))
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

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
              {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>
                          <div style={{marginTop:"10px"}}>Qty</div>
                      </Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}

                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                  onClick={addCartHandler}
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