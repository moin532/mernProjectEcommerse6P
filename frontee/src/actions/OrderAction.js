import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_RQUEST,
  CLEAR_ERRORS,
  MY_ORDERS_RQUEST,
  MY_ORDERS_FAIL,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_RQUEST, 
ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL, UPDATE_ORDERS_RQUEST, UPDATE_ORDERS_SUCCESS, 
UPDATE_ORDERS_FAIL, DELETE_ORDERS_FAIL, DELETE_ORDERS_RQUEST
, DELETE_ORDERS_SUCCESS

} from "../constants/OrderConstant";

import axios from "axios";


export const craeteOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_RQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_RQUEST });

    const { data } = await axios.get("/api/v1/orders/me");

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOrdersDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//admin Oreders
export const allOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_RQUEST });

    const { data } = await axios.get("/api/v1/admin/orders");

    dispatch({
      type:  ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type:  ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update Orders
export const updateOrder = (id,orders) => async (dispatch) => {
  
  try {
    dispatch({ type:UPDATE_ORDERS_RQUEST});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      orders,
      config
    );

    dispatch({ type: UPDATE_ORDERS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }

};


//dlt order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDERS_RQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDERS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
