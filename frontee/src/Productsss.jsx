import styled from "styled-components";
import Loader from "./Styles/Loader";
import {  useDispatch, useSelector } from "react-redux";
import Product from "./components/home/Product";
import { clearError, getProduct } from "./actions/ProductAction";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Search from "./components/Search";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";



const categories = [
  "Men",
  "Women",
  "laptop1",
  "Indus",
  "children",
  "CityFoots",
  "AeroStyle",
  "another"
 
];


const Productsss = () => {

  const  dispatch = useDispatch();
  const  alert = useAlert();
  const  { keyword } = useParams();


  const [currentPage, setCurrentpage] = useState(1);
  const [price, setprice] = useState([0,10000]);
  const [category, setCategory] = useState();

  const { products, loading, error,resultPerPage , filtersProductCount} = useSelector((state) => state.products);

  useEffect(() => {  

    if(error){
      alert.error(error)
      dispatch(clearError());
    };

    dispatch(getProduct(keyword,currentPage,price,category));
  }, [dispatch,keyword,alert,error,currentPage,price,category]);


  

  const setCurrentPageNo=(e)=>{
    setCurrentpage(e)
  }

  const priceHandler = ( newprice)=>{
    setprice(newprice)
  }

  let count = filtersProductCount;

return <Wrapper>
    {loading ? <Loader /> :
    <Fragment>
    
        <h2 className="productsHeading">Products</h2>
       <Search/>
        <div className="products">
            {
                products && products.map((product)=>(
                    <Product key={product._id} product={product}/>
                ))
            }
        </div>
        <div className="filterBox">
              <Typography><h3 className="one">price:-</h3></Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-label="auto"
                min={0}
                max={6000}
             
              />

              <Typography><p className="tag">Category:</p></Typography>
              <ul className="categryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
    </ul>
    </div>
       
        {resultPerPage < count && (
              <div className="paginationBox">
              <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={ count}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
             )}

    
    
    </Fragment>
    }
    </Wrapper>;
};

const Wrapper = styled.section`
.products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 5vmax;
    min-height: 40vh;
  }
  .productsHeading {
    margin: 2vmax auto;
    width: 15vw;
    padding: 1.8vmax;
    font: 500 1.5vmax;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.678);
  }

  .paginationBox {
    display: flex;
    justify-content: center;
    margin: 6vmax;
  }

  .pagination {
    display: flex;
    justify-content: center;
    padding: 0;
  }
  .one{
    font-size:19px;
    color:black;
    
  }

  .page-item {
    background-color: rgb(255, 255, 255);
    list-style: none;
    border: 1px solid rgba(0, 0, 0, 0.178);
    padding: 1vmax 1.5vmax;
    transition: all 0.3s;
    cursor: pointer;
  }
  .page-item:first-child {
    border-radius: 5px 0 0 5px;
  }

  .page-item:last-child {
    border-radius: 0 5px 5px 0;
  }
  .page-link {
    text-decoration: none;
    font: 300 0.7vmax "Roboto";
    color: rgb(0, 0, 0);
    transition: all 0.3s;
  }

  .page-item:hover {
    background-color: rgb(190, 174, 174);
  }

  .page-item:hover .page-link {
    color: rgb(0, 0, 0);
  }

  .pageItemActive {
    background-color: rgb(98 84 243);
  }

  .pageLinkActive {
    color: white;
  }

  .filterBox {
    width: 10vmax;
    position: absolute;
    top: 21vmax;
    left: 3vmax;
  }

  .categryBox {
    padding: 5%;
    
    font-size: 166%;
  }
  .category-link {
    list-style: none;
    color: rgba(0, 0, 0, 0.61);
    font: 400 0.8vmax;
    margin: 0.4vmax;
    cursor: pointer;
    transition: all 0.5s;
    padding: 15%;
  }

  .category-link:hover {
    color: rgb(98 84 243);
  }

  .filterBox >fieldset{
    border: 1px solid black;
    margin:50%;
  }

  @media screen and (max-width: 600px) {
    .filterBox {
      width: 20vmax;
      position: static;
      margin: auto;
    }
    .page-link {
      font: 300 1.7vmax;
    }
    .searchBox > input[type="submit"] {
      padding-left: 4px;
    width: 67px;
    margin-top: 0px
    }
    .searchBox {
      padding-top: 23px;
      margin: 17px;
   
    }

    .page-link {
    font: 300 1.7vmax "Roboto";
  }
  .category-link {
    margin-left: -25px;
    font-size: 20px;
  }
  .categryBox{
    padding: 47px;
    margin-bottom: 120px;
  }
  .productsHeading {
    font-size: 7.5vmax;
    margin-right: 272px;
}

.tag{
  margin-bottom: -56px;
    margin-top: 31px;
    font-size: 37px;
    text-decoration: underline;
}
  
  }
`;

export default Productsss;
