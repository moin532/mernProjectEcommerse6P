import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import Footer from "./components/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/home/ProductDetails";
import Productsss from "./Productsss";
import Search from "./components/Search";
import LoginSignup from "./components/users/LoginSignup";
import { loadUser } from "./actions/UserAction";
import UserOptions from "./components/users/UserOptions";
import { useSelector } from "react-redux";
import StoreRedux from "./Store"
import AccountUser from "./components/users/AccountUser";
import UpdateProfile from "./components/userProfileAction/UpdateProfile";
import UpdatePasssword from "./components/userProfileAction/UpdatePasssword";
import ForgotPassword from "./components/users/ForgotPassword";
import ResetPassword from "./components/users/ResetPassword";
import Cart from "./components/carts/Cart";
import Shipping from "./components/carts/Shipping";
import ConfirmOrder from "./components/carts/ConfirmOrder";
import TempPayment from "./components/carts/TempPayment";
import Orders from "./components/carts/Orders";
import OrdersDetail from "./components/carts/OrdersDetail";
import DashboardAdmin from "./components/admin/DashboardAdmin"
import ProductList from "./components/admin/ProductList";
import CreateProdut from "./components/admin/CreateProdut";
import UpdateProduct from "./components/admin/UpdateProduct";
import AdminOrderList from "./components/admin/AdminOrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import AdminUserList from "./components/admin/AdminUserList";
import UpdateUser from "./components/admin/UpdateUser";
import ErrorPage from "./components/ErrorPage";
import Contact from "./components/Conatct";
import Gotop from "./components/Gotop"
import About from "./components/About";

const App = () => {

  const {isAuthenticated,user} = useSelector((state)=>state.user)


  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29,29,29,0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      footer_bg: "0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  React.useEffect(()=>{
    StoreRedux.dispatch(loadUser());
  },[]);

  const {  products } = useSelector((state) => state.products);
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Gotop/>
          {isAuthenticated && <UserOptions user={user}/>}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/product/:id" element={<ProductDetails products={products}/>}></Route>
            <Route path="/products" element={<Productsss />}></Route>
            <Route path="/products/:keyword" element={<Productsss />}></Route>
            {/* <Route path="/search" element={<Search/>}></Route> */}
            <Route path="/login" element={<LoginSignup/>}></Route>
            <Route path="/account" element={isAuthenticated && <AccountUser />}></Route>
            <Route path="/me/update" element={isAuthenticated && <UpdateProfile />}></Route>
            <Route path="/password/update" element={isAuthenticated && <UpdatePasssword />}></Route>
            <Route path="/shipping" element={isAuthenticated && <Shipping/>}></Route>
            <Route path="/order/confirm" element={isAuthenticated && <ConfirmOrder/>}></Route>
            <Route path="/process/payment" element={isAuthenticated && <TempPayment/>}></Route>
            <Route path="/orders" element={isAuthenticated && <Orders/>}></Route>
            <Route path="/order/:id" element={isAuthenticated && <OrdersDetail/>}></Route>
            
            {/* amins */}
            <Route path="/admin/dashboard" isAdmin={true} element={isAuthenticated &&  <DashboardAdmin/>}></Route>
            <Route path="/admin/products" isAdmin={true} element={isAuthenticated &&  <ProductList/>}></Route>
            <Route path="/admin/product" isAdmin={true} element={isAuthenticated &&  <CreateProdut/>}></Route>
            <Route path="/admin/product/:id" isAdmin={true} element={isAuthenticated &&  <UpdateProduct/>}></Route>
            <Route path="/admin/orders" isAdmin={true} element={isAuthenticated &&  <AdminOrderList/>}></Route>
            <Route path="/admin/order/:id" isAdmin={true} element={isAuthenticated &&  <ProcessOrder/>}></Route>
            <Route path="/admin/users" isAdmin={true} element={isAuthenticated &&  <AdminUserList/>}></Route>
            <Route path="/admin/user/:id" isAdmin={true} element={isAuthenticated &&  <UpdateUser/>}></Route>


            <Route path="/password/forgot" element={ <ForgotPassword />}></Route>
            <Route path="/password/reset/:token" element={ <ResetPassword/>}></Route>
            <Route path="/cart" element={ <Cart/>}></Route>
            <Route path="/contact" element={ <Contact/>}></Route>
            <Route path="/about" element={ <About/>}></Route>
            <Route path="/*" element={<ErrorPage/>}></Route>  
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
