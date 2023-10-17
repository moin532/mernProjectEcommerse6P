import React from 'react'
import styled from 'styled-components'

const Adss = () => {
  return (
   <Wrapper>
      <section id="sm-banner" className="section-p1">
    <div className="banner-box">
      <h4>crazy deals</h4>
      <h2>quality prodoucts</h2>
      <span>the best sale in MM Enterprices</span>
      <button className="white">learn more</button>
    </div>
    <div className="banner-box banner-box2">
      <h4>Spring/Summer</h4>
      <h2>Upcoming Season</h2>
      <span>the best classic sale in MM Enterprices</span>
      <button className="white">Collection</button>
    </div>
  </section>
  <section id="banner3">
    <div className="banner-box">
      <h2>SEASONAL SALE</h2>
      <h3>Collection -22% off</h3>
    </div>
    <div className="banner-box banner-box2">
      <h2>NEW COLLECTION</h2>
      <h3>Spring / summer</h3>
    </div>
    <div className="banner-box banner-box3">
      <h2>Traditional</h2>
      <h3>New Trendy prints</h3>
    </div>
  </section>
   </Wrapper>
  )
}

const Wrapper =styled.section`

#sm-banner .banner-box{
    padding: 225px 135px;
    background-size: cover;
    text-align: center;
    background-image: url("/images/bag.jpg");
    min-width: 420px;
    height: 24vh;
    margin-left: 125px;
    margin: 11px 5px;
    
}
#sm-banner .banner-box2{
    background-image: url("/images/sn3.jpg");
 
}
#sm-banner .banner-box2 h4{
    color: #37B9f1;

}
#sm-banner .banner-box2 h2{
    color: green;
}
#sm-banner .banner-box2 span{
    color: black;
}


#sm-banner{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 67px;
}

.banner-box{
    margin-left: 54px;
    margin-right: 39px;
}


#sm-banner h4 {
    height: 0px;
    color: white;
    font-size: 58px;
    margin: 45px;
}

#sm-banner h2{
    color: white;
    font-size: 53px;
    padding: 5px;
    margin: 2px;
}

#sm-banner span{
    color: #fff;
    font-size: 14px;
    padding-bottom: 15px;
}

button.white{
    font-size: 13px;
    padding: 11px 18px;;
    font-weight: 600;
    background-color: transparent;
    cursor: pointer;
    border: 1px solid;
    outline: none;
    transition: 0.2s;
    color: #fff;
}

#sm-banner .banner-box:hover button{
    background: #088178;
    border: 1px solid #088178;
}

#banner3 .banner-box{
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: flex-start;
    background-image: url("/images/b7.jpg");
    background-size:cover ;
    min-width: 24%;
    height: 30vh;
    background-position: center;
    background-size: cover;
    margin-top: 20px;
    padding: 20px;
    
}

#banner3 .banner-box2{
    background-image: url("/images/b4.jpg");
}
#banner3 .banner-box3{
    background-image: url("/images/b18.jpg");
}
#banner3 .banner-box2 h2{
    color:black
}
#banner3 .banner-box2 h3{
    color:whitesmoke;
    margin-top:15px;
}
#banner3 .banner-box3 h3{
    color:black;
    font-size:40px;
    font-weight:800;

}




#banner3{
    display: flex;
    justify-content: space-between;
    padding: 0 80px;
}


#banner3 h2{
    color: #fff;
    font-weight: 900;
    font-size: 60px;
  


}
#banner3 h3{
    color:#dcfe48;
    font-weight: 800;
    font-size: 35px;
    margin-top: -41px;

}

@media screen and (max-width: 600px) {

#banner3{
  padding-left: 0vh;
    width: 132vh;
}
}
`
export default Adss
