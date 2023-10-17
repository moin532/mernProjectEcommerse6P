import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, createProducts} from "../../actions/ProductAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetadaData from "../../MetadaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SlideBar from "./SlideBar";
import { NEW_PRODUCT_RESET } from "../../constants/ProductConstants";
import styled from "styled-components";
import {  useNavigate} from "react-router-dom";


const CreateProdut = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const Navigate = useNavigate();
  
    const { loading,error,succes } = useSelector((state) => state.newProduct);

   
    
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]); //in array


    const categories = [
      "laptop1",
      "Indus",
      "Men",
      "Women",
      "children",
      "CityFoots",
      "AeroStyle",
      ];



      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearError());
        }
    
        if (succes) {
          alert.success("Product Created Successfully");
          Navigate("/admin/dashboard");
          dispatch({ type: NEW_PRODUCT_RESET });
        }
      }, [dispatch, alert, error, Navigate,succes]);
    

      const createProductSubmitHandler =(e)=>{

        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(createProducts(myForm));
      }

      
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };


  return (
   <Wrapper>
    <Fragment>
    <MetadaData title="Create Product" />
      <div className="dashboard">
        <SlideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select  onChange={(e) => setCategory(e.target.value)}>
             
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                placeholder="size"
                required
                value={size}
                onChange={(e) => setsize(e.target.value)}
              /> */}

            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>
      
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>

    </Fragment>
   </Wrapper>
  )
}

const Wrapper = styled.section`

.newProductContainer {
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(221, 221, 221);
  border-left: 1px solid rgba(0, 0, 0, 0.158);
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.newProductContainer h1 {
  color: rgba(0, 0, 0, 0.733);
  font: 300 2rem "Roboto";
  text-align: center;
}

.createProductForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 3vmax;
  justify-content: space-evenly;
  height: 74%;
  width: 64vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);
}

.createProductForm > div {
  display: flex;
  width: 100%;
  align-items: center;
}
.createProductForm > div > input,
.createProductForm > div > select,
.createProductForm > div > textarea {
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax ;
  outline: none;
}

.createProductForm > div > svg {
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}

#createProductFormFile > input {
  display: flex;
  padding: 0%;
}

#createProductFormFile > input::file-selector-button {
  cursor: pointer;
  width: 100%;
  z-index: 2;
  height: 5vh;
  border: none;
  margin: 0%;
  font: 400 0.8vmax cursive;
  transition: all 0.5s;
  padding: 0 1vmax;
  color: rgba(0, 0, 0, 0.623);
  background-color: rgb(255, 255, 255);
}

#createProductFormFile > input::file-selector-button:hover {
  background-color: rgb(235, 235, 235);
}

#createProductFormImage {
  width: 100%;
  overflow: auto;
}

#createProductFormImage > img {
  width: 3vmax;
  margin: 0 0.5vmax;
}
#createProductBtn {
  border: none;
  background-color: tomato;
  color: white;
  font: 300 0.9vmax "Roboto";
  width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
}

#createProductBtn:hover {
  background-color: rgb(179, 66, 46);
}

@media screen and (max-width: 600px) {
  .newProductContainer {
    background-color: rgb(255, 255, 255);
  }
  .createProductForm {
    padding: 5vmax;
    width:45vh;
  }

  .createProductForm > div > input,
  .createProductForm > div > select,
  .createProductForm > div > textarea {
    padding: 2.5vmax 5vmax;
    font: 300 1.7vmax ;
  }

  .createProductForm > div > svg {
    font-size: 2.8vmax;
  }

  #createProductFormFile > img {
    width: 8vmax;
    border-radius: 100%;
  }

  #createProductFormFile > input::file-selector-button {
    height: 7vh;
    font: 400 1.8vmax ;
  }

  #createProductBtn {
    font: 300 1.9vmax "Roboto";
    padding: 1.8vmax;
  }
}


`
export default CreateProdut
