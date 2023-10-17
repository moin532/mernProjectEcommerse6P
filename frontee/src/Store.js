import {legacy_createStore, combineReducers,applyMiddleware} from "redux";

import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension"
import { DeleteproductReducer, newReviewReducer, newproductReducer, productDetailReducer, productReducer } from "./reducers/ProductReducer";
import { userReducer ,profileReducer,  forgotPasswordReducer,allUsersReducer, userDetailsReducer} from "./reducers/UserReducer";
import { cartReducer } from "./reducers/CartReducer";
import { allAdminOrderReducer, myOrderReducer, newOrderReducer, orderDetailsReducer ,updOrderAdminReducer} from "./reducers/OrderReducer";


const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrderReducer,
    orderDetails:orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct:newproductReducer,
    deleteProduct:DeleteproductReducer,
    alladminsOrders:allAdminOrderReducer,
    updOrders : updOrderAdminReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer
});

let initialState={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
      },
}



const middleware = [thunk]

const store = legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;