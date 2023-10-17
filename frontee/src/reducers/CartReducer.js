import {ADD_TO_CART, REMOVE_CART_ITEM, SHIPPING_INFO} from "../constants/CartConstants";


export const cartReducer = (state = {cartItems:[], shippingInfo:{} }, action)=>{

    switch(action.type){
        case ADD_TO_CART:

            const item = action.payload;
      
            const isItemExist = state.cartItems.find(
              (id) => id.product === item.product
            );
      
            if(isItemExist) {
              return {
                ...state,
                cartItems: state.cartItems.map((id) =>
                id.product === isItemExist.product ? item : id,item.size
                ),
              };
            }
           else {
              return {
                ...state,
                cartItems: [...state.cartItems, item],
              };
            }

          case  REMOVE_CART_ITEM:
            return{
              ...state,
              cartItems: state.cartItems.filter((item)=>item.product !== action.payload)
            }

           case  SHIPPING_INFO:
            return{
              ...state,
              shippingInfo: action.payload
            }

          default:
                return state;
    }
    
};
