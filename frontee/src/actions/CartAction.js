import { ADD_TO_CART, REMOVE_CART_ITEM , SHIPPING_INFO} from "../constants/CartConstants";
import axios from "axios";


export const addItemsToCart = (id, quantity,size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        size,
        quantity,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
//reemoving cart
export const removeItemFromCart = (id)=> async(dispatch,getState)=>{
    dispatch({
      type:REMOVE_CART_ITEM,
      payload:id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}


export const saveShippingInfo = (data)=>async(dispatch)=>{

dispatch({
  type: SHIPPING_INFO,
  payload:data
})
localStorage.setItem("ShippingInfo", JSON.stringify(data));

}