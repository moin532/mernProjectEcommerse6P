import { CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL, CREATE_ORDER_RQUEST, CLEAR_ERRORS,

MY_ORDERS_RQUEST,MY_ORDERS_FAIL,MY_ORDERS_SUCCESS,

ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL, ALL_ORDERS_RQUEST, 
ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL, UPDATE_ORDERS_RQUEST, UPDATE_ORDERS_SUCCESS, 
UPDATE_ORDERS_FAIL, UPDATE_ORDERS__RESET, DELETE_ORDERS_FAIL, DELETE_ORDERS_RQUEST,
DELETE_ORDERS__RESET, DELETE_ORDERS_SUCCESS

} from "../constants/OrderConstant";


export const newOrderReducer = (state={} , action)=>{

    switch (action.type) {

        case CREATE_ORDER_RQUEST:
            return{
                ...state,
                loading:true
            };

        case CREATE_ORDER_SUCCESS:
            return{
                loading:false,
                order:action.payload
            }  
          
        case CREATE_ORDER_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
};

export const myOrderReducer = (state= {orders:[]},action)=>{

    switch (action.type) {
        case MY_ORDERS_RQUEST:
            return{
                loading:true
            }
            
        case MY_ORDERS_SUCCESS:
            return{
                loading:false,
                orders: action.payload
            }
    
        case MY_ORDERS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
            
        default:
            return state
    }

}

export const orderDetailsReducer = (state= {order:{}},action)=>{

    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return{
                loading:true
            }
            
        case ORDER_DETAILS_SUCCESS:
            return{
                loading:false,
                order: action.payload
            }
    
        case ORDER_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
            
        default:
            return state
    }

}

//admins >>>>>>>>>>>>>>>>>>

export const allAdminOrderReducer = (state= {orders:[]},action)=>{

    switch (action.type) {
        case ALL_ORDERS_RQUEST:
            return{
                loading:true
            }
            
        case ALL_ORDERS_SUCCESS:
            return{
                loading:false,
                orders: action.payload
            }
    
        case ALL_ORDERS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
            
        default:
            return state
    }

}


export const updOrderAdminReducer = (state= { },action)=>{

    switch (action.type) {
        case UPDATE_ORDERS_RQUEST:
            case DELETE_ORDERS_RQUEST:
            return{
                loading:true,
                ...state
            }
            
        case UPDATE_ORDERS_SUCCESS:
            return{
                loading:false,
                isUpdated: action.payload,
                ...state

            }

        case DELETE_ORDERS_SUCCESS:
            return{
                ...state,
                isUpdated:false
            }
    
        case UPDATE_ORDERS_FAIL:
            case DELETE_ORDERS_FAIL:
            return{
                loading:false,
                ...state,
                error:action.payload
            }

        case UPDATE_ORDERS__RESET:
            return{
                loading:false,
               isUpdated:false
            }

        case DELETE_ORDERS__RESET:
            return{
                loading:false,
               isUpdated:false
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
            
        default:
            return state
    }

}
