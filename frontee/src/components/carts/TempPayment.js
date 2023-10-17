import React, { useEffect } from 'react'
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "../../Styles/Button";
import { NavLink } from 'react-router-dom';
import {clearError, craeteOrder} from "../../actions/OrderAction"
import {useAlert} from "react-alert"

const TempPayment = () => {

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

  const dispatch = useDispatch();
  const  alert = useAlert();

  const {error}  = useSelector((state)=>state.newOrder)
  const { user } = useSelector((state) => state.user);
  const {shippingInfo,cartItems} = useSelector((state)=> state.cart)

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }

    if(error){
      alert.error(error);
      dispatch(clearError)
    }

    useEffect(()=>{
      dispatch(craeteOrder(order));
      alert.success("caert saved succesfully")
    },[dispatch ,error,alert])
    
  
return (
<Wrapper>

<div className="emptyCart">
        <CreditCardOffIcon/>
      <h2>Hello {user.name}</h2>
        <p>some security issue so currently Credit card is not using...</p>

        <p>
            pay on after  Deleivery
        </p>

          <div className='btn'>

          <NavLink to="/orders">
            <Button >Go TO Order</Button>
          </NavLink>

          <p className='ptag'>Note:
            your Item  Wll be Saved Sucessfully...
          </p>
          </div>

        </div>
</Wrapper>
  )
}

const Wrapper = styled.section`


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
    color: black;
  }
  .emptyCart > p {
    font-size: 2vmax;
  }
  h3{
    margin-left: 15px;
  }

  .btn{
    margin-top:35px;
  }

.ptag{
  margin-top: 25px;
}
`
export default TempPayment
