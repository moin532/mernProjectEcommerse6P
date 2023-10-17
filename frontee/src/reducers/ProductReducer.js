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
  NEW_REVIEW_REQUEST_RESET,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_SUCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_REQUEST_SUCESS,
  NEW_PRODUCT_REQUEST_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST_SUCESS,
  DELETE_PRODUCT_REQUEST_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
} from "../constants/ProductConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCTS_SUCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filtersProductCount: action.payload.filtersProductCount,
      };

    case ADMIN_PRODUCTS_SUCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_DETAIL_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ALL_PRODUCTS_DETAIL_SUCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case ALL_PRODUCTS_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newproductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case NEW_PRODUCT_REQUEST_SUCESS:
      return {
        loading: false,
        succes: action.payload.succes,
        product: action.payload.product,
      };
    case NEW_PRODUCT_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        succes: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const DeleteproductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case DELETE_PRODUCT_REQUEST_SUCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

      case UPDATE_PRODUCT_SUCCESS:
        return{
          ...state,
          loading: false,
          isUpdated: action.payload,
        }

    case DELETE_PRODUCT_REQUEST_FAIL:
      case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

      case UPDATE_PRODUCT_RESET:
        return {
          ...state,
          isUpdated: false,
      };
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_REQUEST_SUCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_REQUEST_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
