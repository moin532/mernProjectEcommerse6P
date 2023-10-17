import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from 'react-alert';
import { logout } from "../../actions/UserAction";

const UserOptions = ({user}) => {
  const {cartItems} = useSelector((state)=> state.cart)
  const [Open, setOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const options = [
    
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <ShoppingCartIcon style={({color:cartItems.length> 0 ?"tomato":"unset"})}/>,
                            name:`Cart(${cartItems.length})`, func: cart},
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    Navigate("/admin/dashboard");
  }

  function orders() {
    Navigate("/orders");
  }
  function account() {
    Navigate("/account");
  }
  function cart() {
    Navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  
  return (
    <Wrapper>
      <Fragment>
        <Backdrop open={Open} style={{zIndex:"8"}}/>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={Open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/images/Profile.png"}
            alt="Profile"
          />
        
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen
          />
        ))}
      </SpeedDial>
      </Fragment>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .speedDial {
    position: fixed;
    right: 3vmax;
    top: 7vmax;
  }

  .speedDialIcon {
    width: 56px;
    height: 56px;
    border-radius: 100%;
  }


  @media screen and (max-width: 600px) {
  .speedDial{
     padding-top:70px;
  }

}
`;

export default UserOptions
