import React from 'react'
import { Rating } from "@material-ui/lab";
import styled from 'styled-components';

const ReviewCard = ({review}) => {

  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Wrapper>
       <div className="reviewCard">
      <img src="/images/Profile.png" alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
.reviewCard {
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

.reviewCard > img {
  width: 5vmax;
}
.reviewCard > p {
  color: rgba(0, 0, 0, 0.836);
  font: 600 0.9vmax "Roboto";
}

.reviewCardComment {
    font-size:22px;
    color:black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    
  }
  
  .noReviews {
    font: 400 1.3vmax "Gill Sans";
    text-align: center;
    color: rgba(0, 0, 0, 0.548);
  }
  @media screen and (max-width: 600px) {
  .submitReview {
    font: 500 1.7vmax "Roboto";
    padding: 1.5vmax;
    width: 20vmax;
    margin: 3vmax 0;
  }

  .reviewCard > p {
    font: 600 3vw "Roboto";
  }
  .reviewCardComment {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:20px;
    margin-top:15px;
  }
  

}
`
export default ReviewCard
