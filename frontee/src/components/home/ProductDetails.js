import styled from "styled-components";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../actions/ProductAction";
import ReviewCard from "./ReviewCard";
import Loader from "../../Styles/Loader";
import { Fragment, useEffect, useState } from "react";
import MetadaData from "../../MetadaData";
import { addItemsToCart } from "../../actions/CartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_REQUEST_RESET } from "../../constants/ProductConstants";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { TbReplace } from "react-icons/tb";
import Product from "./Product";

const ProductDetails = ({ products }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [size, setsize] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity, size));
    alert.success("Item Added To Cart");
  };

  // reviews
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_REQUEST_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetadaData title={`🌟..${product.name} ...MM`} />

          <div className="ProductDetails" id="ProductDetails1">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  <p>({product.numOfReviews} Reviews)</p>
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="selector">
                  <h3 className="box-h3"> size:</h3>
                  <select
                    required
                    class="box"
                    value={size}
                    onChange={(e) => setsize(e.target.value) }
                  >
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              {/*  */}

              <div className="product-data-warranty">
                <div className="product-warranty-data">
                  <TbTruckDelivery className="warranty-icon" />
                  <p>Fast Delivery</p>
                </div>

                <div className="product-warranty-data">
                  <TbReplace className="warranty-icon" />
                  <p>Recycle</p>
                </div>

                <div className="product-warranty-data">
                  <TbTruckDelivery className="warranty-icon" />
                  <p>MM Delivered </p>
                </div>

                <div className="product-warranty-data">
                  <MdSecurity className="warranty-icon" />
                  <p>quality Product</p>
                </div>
              </div>

              {/*  */}

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

          <h1 className="homeHeading">Similiar Products</h1>
          <div className="container1" id="container">
            {products &&
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
          </div>
        </Fragment>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .ProductDetails {
    background-color: rgb(246, 248, 250);
    width: 100vw;
    max-width: 100%;
    padding: 6vmax;
    box-sizing: border-box;
    display: flex;
  }

  .ProductDetails > div {
    width: 100%;
    /* display: flex; */
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 2vmax;
    box-sizing: border-box;
    border: 1px solid white;
  }

  .ProductDetails > div:last-child {
    align-items: flex-start;
  }

  .CarouselImage {
    width: 20vmax;
    margin-left: 138px;
  }

  .detailsBlock-1 {
    margin-top: -20px;
  }
  .detailsBlock-1 > h2 {
    font-size: 50px;
    font-family: "Times New Roman", Times, serif;
  }

  .detailsBlock-1 > p {
    font: 200 0.6vmax;
  }

  .detailsBlock-2 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.205);
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    width: 70%;
    padding: 1vmax 0;
  }

  .detailsBlock-2-span {
    font: 200 0.8vmax;
  }

  .detailsBlock-3 {
    width: 70%;
  }

  .detailsBlock-3 > h1 {
    color: green;
    font-size: 43px;
    margin: 1vmax 0;
  }
  .detailsBlock-3-1 {
    display: flex;
    align-items: center;
  }

  .detailsBlock-3-1-1 > button {
    border: none;
    background-color: rgba(0, 0, 0, 0.616);
    padding: 0.5vmax;
    cursor: pointer;
    color: white;
    transition: all 0.5s;
    font-size: 15px;
  }
  .detailsBlock-3-1-1 > button:hover {
    background-color: rgba(0, 0, 0, 0.767);
  }

  .detailsBlock-3-1-1 > input {
    border: none;
    padding: 0.5vmax;
    width: 2vmax;
    text-align: center;
    outline: none;
    font: 400 0.8vmax "Roboto";
    color: black;
  }

  .detailsBlock-3-1 > button:last-child {
    border: none;
    cursor: pointer;
    color: white;
    transition: all 0.5s;
    background-color: tomato;
    font-size: 15px;
    border-radius: 20px;
    padding: 0.5vmax 2vmax;
    margin: 1vmax;
    outline: none;
    width: 20vh;
    height: 40px;
  }

  .detailsBlock-3-1 > button:last-child:hover {
    background-color: rgb(214, 84, 61);
  }

  .detailsBlock-3 > p {
    border-top: 1px solid rgba(0, 0, 0, 0.205);
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    padding: 1vmax 0;
    color: rgba(0, 0, 0, 0.651);
    font: 400 1vmax "Roboto";
    margin: 1vmax 0;
  }

  .detailsBlock-4 {
    color: rgba(0, 0, 0, 0.897);
    font: 500 1.2vmax sans-serif;
  }

  .detailsBlock-4 > p {
   font-family: 'Times New Roman', Times, serif;
   font-size: 28px;
  }

  .box {
    width: 100px;
    height: 30px;
    border: 1px solid #999;
    font-size: 20px;
    color: #1c87c9;
    background-color: rgb(246, 248, 250);
    border-radius: 5px;
    text-align: center;
  }
  .box-h3 {
    margin-top: 28px;
    font-size: 33px;
  }

  .submitReview {
    border: none;
    background-color: tomato;
    font: 500 0.7vmax "Roboto";
    border-radius: 20px;
    padding: 0.6vmax 2vmax;
    margin: 1vmax 0;
    color: white;
    cursor: pointer;
    transition: all 0.5s;
    outline: none;
  }

  .submitReview:hover {
    background-color: rgb(197, 68, 45);
    transform: scale(1.1);
  }

  .submitDialog {
    display: flex;
    flex-direction: column;
  }
  .submitDialogTextArea {
    border: 1px solid rgba(0, 0, 0, 0.082);
    margin: 1vmax 0;
    outline: none;
    padding: 1rem;
    font: 300 1rem "Roboto";
  }

  .reviewsHeading {
    color: #000000be;
    font: 500 2.4vmax "Roboto";
    text-align: center;
    border-bottom: 1px solid;
    padding: 1vmax;
    width: 20vmax;
    margin: auto;
    margin-bottom: 4vmax;
  }
  .reviews {
    display: flex;
    overflow: auto;
  }

  .ReviewCard {
    flex: none;

    box-shadow: 0 0 5px rgba(0, 0, 0, 0.226);
    border: 1px solid rgba(56, 56, 56, 0.116);
    width: 30vmax;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1vmax;
    padding: 3vmax;
  }

  .noReviews {
    font: 400 1.3vmax "Gill Sans";
    text-align: center;
    color: rgba(0, 0, 0, 0.548);
  }

  /*  */

  .product-data-warranty {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;

    .product-warranty-data {
      text-align: center;

      .warranty-icon {
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        padding: 0.6rem;
      }
      p {
        font-size: 1.4rem;
        padding-top: 0.4rem;
      }
    }
  }
  .homeHeading {
    text-align: center;
    font-size: 2vmax;
    border-bottom: 1px solid rgba(21, 21, 21, 0.5);
    width: 30vmax;
    padding: 1vmax;
    margin: 3vmax auto;
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
    .ProductDetails {
      flex-direction: column;
      height: unset;
    }

    .ProductDetails > div:last-child {
      align-items: center;
    }

    .detailsBlock-1 > h2 {
      font-size: 2.8vmax;
      text-align: center;
    }

    .detailsBlock-1 > p {
      margin-top: 21px;
      text-align: center;
      font-size: 13px;
    }

    .detailsBlock-2 {
      justify-content: center;
      margin: 17px;
    }
    .detailsBlock-2 > span {
      font-size: 2.5vmax;
    }
    .detailsBlock-2 > p {
      font-size: 2vmax;
    }

    .detailsBlock-3 > h1 {
      font-size: 38px;

      text-align: center;
      color: green;
    }

    .detailsBlock-3-1 {
      flex-direction: column;
    }

    .detailsBlock-3-1-1 {
      padding: 2vmax 0;
    }
    .detailsBlock-3-1-1 > button {
      padding: 1.2vmax;
      width: 4vmax;
      text-align: center;
    }

    .detailsBlock-3-1-1 > input {
      padding: 11px;
      width: 6vmax;
      font-size: 14px;
    }

    .detailsBlock-3-1 > button:last-child {
      padding: 0.5vmax;
      width: 23vmax;
      margin: 3vmax 0;
      margin-left: 13px;
      font-size: 19px;
    }

    .detailsBlock-3 > p {
      padding: 2.5vmax 0;
      text-align: center;
      font-size: 31px;
    }

    .selector {
      margin-bottom: 23px;
      margin-left: 69px;
      font-size: 20px;
    }

    .detailsBlock-4 {
      font-size: 28px;
      height: 29px;
      margin-top: 22px;
    }

    .detailsBlock-4 > p {
      font-size: 15px;
      font-family: "Times New Roman", Times, serif;
      color: black;
    }
    .detailsBlock-3 {
      width: 85%;
    }

    .submitReview {
      height: 44px;
      margin: 7vmax 0;
      font-size: 19px;
      padding: 0.5vmax;
      width: 25vmax;
      margin-left: 13px;
      margin-top:197px;
      
    }

    .reviewsHeading{
      margin-top:-68px;
      font-size:31px;
    }

    .CarouselImage {
      margin: 17px;
      width: 91%;
    }
  }
`;
export default ProductDetails;
