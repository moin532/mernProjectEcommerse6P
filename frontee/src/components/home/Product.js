import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components";


const Product = ({ product }) => {

    const options = {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "orange",
      value: product.ratings,
      isHalf: true,
      size: window.innerWidth < 600 ? 20 : 25,
      };
    

  return (
    <Wrapper>
    <div>
      <Link className="product-card" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>

        <div className="stars"> 
          <ReactStars {...options} />{""}
          <span>({product.numOfReviews} Reviews)</span>
        </div>

        <div className="desc">
          <p>{product.description.slice(0,28)}...</p>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`

    .product-card{
        width: 14vmax;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color:rgb(48,48,48);
        margin: 2vmax;
        transition: all 0.5s;
        padding-bottom: 0.5vmax;
    }

    .product-card > img{
        width: 14vmax;
       
    }

     .product-card:hover {
      transform: scale(0.96);
      box-shadow:0 0 15px rgba(109, 3, 105, 0.26);

    }
    &:hover::after {
      width: 100%;
    }
    .product-card > div{
        margin: 0.5vmax;
        display: flex;
        justify-content: flex-start;
    }

    .product-card>div>span{
        margin: 0.5vmax;
        font:300 0.7vmax;
    }

    .product-card>p{
        font-size: 1.2vmax;
        margin: 1vmax 0.5vmax;
        margin-bottom: 0;
    }
    .product-card>span {
        margin: 0.5vmax;
        color: green;
        font-size: 20px;
        font-weight  :bold ;
      };

    .desc,p{
     color:black;
     font-weight:100;
    }

    p:first-letter {
    text-transform: uppercase;
}

    @media screen and (max-width:600px) {

      .product-card>p{
        font-size:2.7vmax;
      }

      .product-card>div{
        margin: 0vmax;
        display: block;
      }
      
      .product-card>span{
        font-size: 1.5vmax;
      }

      .product-card>div>span{
        margin: 0 0.5vmax;
        font-size: 300 1vmax;
      }

   

    }

`
export default Product;
