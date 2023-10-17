import React, { Fragment, useEffect, useState } from "react";
import MetadaData from "../../MetadaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SlideBar from "./SlideBar";
import {
  getOrdersDetails,
  clearError,
  updateOrder,
} from "../../actions/OrderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Styles/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "../../Styles/Button";
import styled from "styled-components";
import { UPDATE_ORDERS__RESET } from "../../constants/OrderConstant";
import { useParams } from "react-router-dom";

const ProcessOrder = () => {
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updOrders
  );
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { cartItems } = useSelector((state) => state.cart);


  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDERS__RESET });
    }

    dispatch(getOrdersDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Wrapper>
      <Fragment>
        <MetadaData title="Process Order" />

        <div className="dashboard">
          <SlideBar />
          <div className="newProductContainer">
            {loading ? (
              <Loader />
            ) : (
              <div
                className="confirmOrderPage"
                style={{
                  display: order.orderStatus === "Delivered" ? "block" : "grid",
                }}
              >
                <div>
                  <div className="confirmshippingArea">
                    <Typography>Shipping Info</Typography>

                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Name:</p>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div>
                        <p>Phone:</p>
                        <span>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>

                      <div>
                        <h3>size:</h3>
                        {cartItems &&
                          cartItems.map((item) => <p>{item.size}</p>)}
                      </div>
                    </div>

                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>

                      <div>
                        <p>Amount:</p>
                        <span>{order.totalPrice && order.totalPrice}</span>
                      </div>
                    </div>

                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            order.orderStatus &&
                            order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item.product}>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>{" "}
                            <span>
                              {item.quantity} X ₹{item.price} ={" "}
                              <b>₹{item.price * item.quantity}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/*  */}
                <div
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .updateOrderForm {
    margin: 5vmax 0;
    padding: 3vmax;
    background-color: white;
  }

  .updateOrderForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .updateOrderForm > div > select {
    padding: 1vmax 4vmax;
    margin: 2rem 0;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax cursive;
    outline: none;
  }

  .updateOrderForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  /* ssssssssssssssssss */

  .orderDetailsContainer > h1 {
    font: 300 3vmax "Roboto";
    margin: 4vmax 0;
    color: tomato;
  }

  .orderDetailsContainer {
    padding: 5vmax;
    padding-bottom: 0%;
  }

  .orderDetailsContainer > p {
    font: 400 1.8vmax "Roboto";
  }

  .orderDetailsContainerBox,
  .orderDetailsCartItemsContainer {
    margin: 2vmax;
  }

  .orderDetailsContainerBox > div {
    display: flex;
    margin: 1vmax 0;
  }

  .orderDetailsContainerBox > div > p {
    font: 400 1vmax "Roboto";
    color: black;
  }
  .orderDetailsContainerBox > div > span {
    margin: 0 1vmax;
    font: 100 1vmax "Roboto";
    color: #575757;
  }

  .orderDetailsCartItems > p {
    font: 400 1.8vmax "Roboto";
  }

  .orderDetailsCartItems {
    padding: 2vmax 5vmax;
    border-top: 1px solid rgba(0, 0, 0, 0.164);
  }

  .confirmCartItemsContainer > div {
    display: flex;
    font: 400 1vmax "Roboto";
    align-items: center;
    margin: 2vmax 0;
  }

  .confirmCartItemsContainer > div > img {
    width: 3vmax;
  }

  .confirmCartItemsContainer > div > a {
    color: #575757;
    margin: 0 2vmax;
    width: 60%;
    text-decoration: none;
  }

  .confirmCartItemsContainer > div > span {
    font: 100 1vmax "Roboto";
    color: #5e5e5e;
  }

  @media screen and (max-width: 600px) {
    .updateOrderForm {
      padding: 5vmax;
    }

    .updateOrderForm > div > select {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax cursive;
    }

    .updateOrderForm > div > svg {
      font-size: 2.8vmax;
    }
  }

  .newProductContainer {
    margin-left: 25px;
  }
`;
export default ProcessOrder;
