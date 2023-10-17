import { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import styled from "styled-components";
import { Button } from "../../Styles/Button";
import Product from "./Product";
import MetadaData from "../../MetadaData";
import { getProduct } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearError } from "../../actions/ProductAction";
import Loader from "../../Styles/Loader";
import Service from "../Service";
import Adss from "../../Adss";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  window.addEventListener("contextmenu", (e)=>e.preventDefault())

  return (
    <Wrapper>
      {loading ?    <Loader/>:
      <Fragment>
      <MetadaData title="MM ENTERPRICES" />

      <div className="banner">
        <p>Welcome to Ecommerse</p>
        <h1>Find Amazing Products Below</h1>

        <a href="#container">
          <Button>
            scroll <CgMouse />
          </Button>
        </a>
      </div>

      <h2 className="homeHeading"> Feauterd Product </h2>

      <div className="container1" id="container">
        {products &&
          products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
      </div>
      <Service/>
      <Adss/>
    </Fragment>
      }
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .banner {
    background-image: url("/images/girl.jpg");
    height: 100vmin;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: #efffff;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.bg};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    animation: slideAnimation 23s step-end infinite;
    scroll-behavior: smooth;
    
    
  }

  
@keyframes slideAnimation {
    0%,100% {
        transform: translateX(0);
        background-image: url("/images/red.avif");
    }
    20% {
        transform: translateX(0);
        background-image: url("/images/girl.jpg");
      }
      45% {
        transform: translateX(0%);
        background-image: url("/images/white.avif");
      }
      70% {
        transform: translateX(0%);
        background-image: url("/images/b4.jpg");
      }

    83%{
      background-image: url("/images/sneaaker4.jpg");
      transform: translateX(0%);
    }
}
  .banner,
  h1 {
    margin: 2vmax;
    font: 600 2.5vmax;
    background-color: #F6F8FA;
  }

  .banner > p {
    font: 300 1.4vmax;
    background-color: #F6F8FA;;
  }

  .banner > a > Button {
    margin-bottom: 5vmax;
    cursor: pointer;
    padding: 1vmax;
    transition: all 0.5s;
    width: 9vmax;
    font: 500 1vmax;
  }
  .homeHeading {
    text-align: center;
    font-size: 2vmax;
    border-bottom: 1px solid rgba(21, 21, 21, 0.5);
    width: 30vmax;
    padding: 1vmax;
    margin: 5vmax auto;
  }

  .container1 {
    display: flex;
    margin: 2vmax auto;
    width: 80vw;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
  }

  @media screen and (max-width: 600px) {
    .banner{
      margin:0px;  
      margin-top: 10px;
   
    }

    .banner ,h1{
      margin:0px;
      font-size:43px;
    }

    .banner,p{
      font-size:20px;
      color:black;
      margin-bottom: 12px;
    }

    .banner>a>Button {
        
      width: 80px;
    font-size: 15px;
    margin-top: 15px;
        
    }

  }
`;

export default Home;
