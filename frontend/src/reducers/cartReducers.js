import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

const initialState={
    cartItems:[],
} // this state is local for this reducer

export const cartReducer=(state=initialState,action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item=action.payload
            const existItem=state.cartItems.find(p=>p.product==item.product)
            if(existItem){
                return{
                    ...state,
                    cartItems:state.cartItems.map(x=>x.product==item.product?item:x)
                }
            }
            return{
                ...state,
                cartItems:[...state.cartItems,item]
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems:state.cartItems.filter(x=>x.product!=action.payload)
            }
        default:
            return state;
    }
}