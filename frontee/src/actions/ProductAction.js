import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  ALL_PRODUCTS_DETAIL_REQUEST,
  ALL_PRODUCTS_DETAIL_SUCESS,
  ALL_PRODUCTS_DETAIL_FAIL,
  NEW_REVIEW_REQUEST_FAIL,
  NEW_REVIEW_REQUEST_REQUEST,
  NEW_REVIEW_REQUEST_SUCESS,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_SUCESS,
  NEW_PRODUCT_REQUEST,NEW_PRODUCT_REQUEST_SUCESS,NEW_PRODUCT_REQUEST_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST_SUCESS,
  DELETE_PRODUCT_REQUEST_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from "../constants/ProductConstants";

import axios from "axios";

export const getProduct =(keyword = "", currentPage = 1, price = [0, 10000], category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }

      const { data } = await axios.get(link);
      

      dispatch({
        type: ALL_PRODUCTS_SUCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: ALL_PRODUCTS_DETAIL_SUCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//reviews
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST_REQUEST });

    const { config } = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_REQUEST_SUCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Admin products
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCTS_SUCESS,
      payload: data.products,
    });

  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};


//admin create products

export const createProducts = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const { config } = {
      headers: { "Content-Type": "application/json" },
    };


    const { data } = await axios.post("/api/v1/admin/products/new",productData,config);

    dispatch({
      type: NEW_PRODUCT_REQUEST_SUCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const DeleteProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT_REQUEST_SUCESS,
      payload: data.success,
    });

  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/products/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
