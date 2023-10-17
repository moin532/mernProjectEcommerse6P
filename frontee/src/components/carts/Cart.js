import styled from "styled-components";
import CartItemCard from "./CartItemCard";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux"  ;
import {addItemsToCart, removeItemFromCart} from "../../actions/CartAction"
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";



const Cart = () => {
  
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
  

    const increaseQuantity = (id, quantity, stock) => {
      const newQty = quantity + 1;
      if (stock <= quantity) {
        return;
      }
      dispatch(addItemsToCart(id, newQty));
    };
  
    const decreaseQuantity = (id, quantity) => {
      const newQty = quantity - 1;
      if (1 >= quantity) {
        return;
      }
      dispatch(addItemsToCart(id, newQty));
    };
  
    const deleteCartItems = (id) => {
      dispatch( removeItemFromCart(id));
    };
  
    const checkoutHandler = () => {
      Navigate("/login?redirect=shipping");
    };
  
    return (
      <Wrapper>
      <Fragment>
        {cartItems.length === 0 ? (
          <div className="emptyCart">
            <RemoveShoppingCartIcon />
  
            <Typography>No Product in Your Cart</Typography>
            <Link to="/products">View Products</Link>
          </div>
        ) : (
          <Fragment>
            <div className="cartPage">
              <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
         
              </div>
              <hr></hr>
  
  
              {cartItems &&
                cartItems.map((item) => (
                  <div className="cartContainer" key={item.product}>
                    <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
                   
                 
              
                   
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">{`₹${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                ))}
  
              <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                  <p>Gross Total</p>
                  <p>{`₹${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>Check Out</button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
      </Wrapper>
    );
  };
  
  const Wrapper = styled.section `
  .cartHeader {
    background-color: white;
    width: 90%;
    box-sizing: border-box;
    margin: auto;
    color: white;
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    font: 300 0.7vmax ;
    font-display:black;
  }
  .cartHeader > p {
    margin: 10px;
    font-size: 3.5vh;
  }
  .cartHeader > p:last-child {
    text-align: end;
  }
  
  
  .emptyCart > a {
    background-color: rgb(51, 51, 51);
    color: white;
    border: none;
    padding: 1vmax 3vmax;
    cursor: pointer;
    font: 400 1vmax "Roboto";
    text-decoration: none;
    display: center;
  
  }
  .emptyCart {
    margin: auto;
    text-align: center;
    padding: 10vmax;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .emptyCart > svg {
    font-size: 5vmax;
    color: tomato;
  }
  .emptyCart > p {
    font-size: 2vmax;
  }
  .cartPage {
    padding: 5vmax;
  }
  
  
  .cartContainer {
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
  }
  
  .cartInput {
    display: flex;
    align-items: center;
    height: 8vmax;
  }
  
  .cartInput > button {
    border: none;
    background-color: rgba(0, 0, 0, 0.616);
    padding: 0.5vmax;
    cursor: pointer;
    color: white;
    transition: all 0.5s;
  }
  .cartInput > button:hover {
    background-color: rgba(0, 0, 0, 0.767);
  }
  
  .cartInput > input {
    border: none;
    padding: 0.5vmax;
    width: 2vmax;
    text-align: center;
    outline: none;
    font: 400 1vmax ;
    color: rgba(0, 0, 0, 0.74);
  }
  
  .cartSubtotal {
    display: flex;
    padding: 0.5vmax;
    height: 8vmax;
    align-items: center;
    box-sizing: border-box;
    font: 300 1vmax cursive;
    justify-content: flex-end;
    color: rgba(0, 0, 0, 0.753);
  }
  
  .cartGrossProfit {
    display: grid;
    grid-template-columns: 2fr 1.2fr;
  }
  
  .cartGrossProfitBox {
    border-top: 3px solid tomato;
    margin: 1vmax 4vmax;
    box-sizing: border-box;
    padding: 2vmax 0;
    font: 300 1vmax "Roboto";
    display: flex;
    justify-content: space-between;
  }
  
  .checkOutBtn {
    display: flex;
    justify-content: flex-end;
  }
  .checkOutBtn > button {
    background-color: tomato;
    color: white;
    border: none;
    padding: 0.8vmax 4vmax;
    width: 50%;
    font: 300 0.8vmax "Roboto";
    margin: 1vmax 4vmax;
    cursor: pointer;
    border-radius: 30px;
  }
  
  @media screen and (max-width: 600px) {
    .cartPage {
      padding: 0;
      min-height: 60vh;
    }
  
    .cartHeader {
      width: 100%;
      font: 300 1.7vmax "Roboto";
      grid-template-columns: 3fr 1fr 1fr;
    }
  
    .cartContainer {
      width: 100%;
      grid-template-columns: 3fr 1fr 1fr;
    }
  
    .cartInput {
      height: 20vmax;
    }
  
    .cartInput > button {
      padding: 1.5vmax;
    }
  
    .cartInput > input {
      width: 5vmax;
      padding: 1.5vmax;
      font: 400 1.8vmax "Roboto";
    }
  
    .cartSubtotal {
      padding: 1.5vmax;
      height: 20vmax;
      font: 300 2vmax "Roboto";
    }
  
    .cartGrossProfit {
      display: grid;
      grid-template-columns: 0fr 2fr;
    }
  
    .cartGrossProfitBox {
      padding: 2vmax;
      font: 300 2vmax "Roboto";
    }
  
    .checkOutBtn > button {
      padding: 2vmax 4vmax;
      width: 100%;
      font: 300 2vmax "Roboto";
    }
  }
  
  `


export default Cart
