import React ,{Fragment,useState}from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MetadaData from '../MetadaData';

const Search = () => {

    const navigate = useNavigate(); 
    const [keyword, setkeyword] = useState("");

    const SearchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate("/products")
        }
    }
  return (
   <Wrapper>
     <Fragment>
            <MetadaData title=" products and Search  ---MM"/>
        <form className="searchBox" onSubmit={SearchSubmitHandler}>
            <input type="text"
            placeholder='search a product...'
            onChange={(e)=>  setkeyword(e.target.value)}
            />
      <input type="submit" value="search"/>
        </form>
        </Fragment>


   </Wrapper>
  )
}

const Wrapper = styled.section`
.searchBox{
  
  display:flex;
  justify-content: center;
  align-items:center;
  position: relative;

}
.searchBox > input[type="text"]{
    /* height: 8%; */
    width: 50%;

}

.searchBox > input[type="submit"]{
    width: 9%;
    height: 6%;
    margin-top: 2px;
    
}


`
export default Search