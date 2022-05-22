import axios from "axios"
import { CART_ADD_ITEM,CART_REMOVE_ITEM } from "../constants/cartConstants"

export const addToCart=(id,qty)=>async (dispatch,getState)=>{
    const {data}=await axios.get(`/api/products/${id}`)
    
    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            product:data._id,
            price:data.price,
            name:data.name,
            image:data.image,
            countInStock:data.countInStock,
            qty,
        }
    })
    localStorage.setItem('cartItem',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }