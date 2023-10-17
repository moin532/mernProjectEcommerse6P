import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "../../Styles/Button";
import MetadaData from "../../MetadaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SlideBar from "./SlideBar";
import { UPDATE_USER_RESET } from "../../constants/UserConstant";
import {
  updateUser,
  clearErrors,
  getusersDetails,
} from "../../actions/UserAction";
import Loader from "../../Styles/Loader";
import {useParams,useNavigate} from "react-router-dom";
import styled from "styled-components";


const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
   const Navigate = useNavigate();
   const {id} = useParams();

    const { loading, error, user } = useSelector((state) => state.userDetails);
  
    const {
      loading: updateLoading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.profile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
  
    const userId = id;
  
    useEffect(() => {
      if (user && user._id !== userId) {
        dispatch(getusersDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("User Updated Successfully");
        Navigate("/admin/users");
        dispatch({ type: UPDATE_USER_RESET });
      }
    }, [dispatch, alert, error, Navigate, isUpdated, updateError, user, userId]);
  
    const updateUserSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("role", role);
  
      dispatch(updateUser(userId, myForm));
    };


  return (
   <Wrapper>
    <Fragment>
      <MetadaData title="Update User" />
      <div className="dashboard">
        <SlideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>
              

              <div className="textArea">
              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>

   </Wrapper>
  )
}

const Wrapper = styled.section`

.createProductForm{
  justify-content: center;
  margin: auto;
  width: 25%;
  border: 3px solid green;
  padding: 10px;

}
h1{
  font-size:5rem;
}

input, textarea {

  margin-left: 9px;
    margin-top: 14px;

}
select {
    
    margin: 9px;
    font-size: 22px;
    height: 4vh;
    width: 27vh;
}

@media screen and (max-width: 600px) {

  .createProductForm{
  
  margin: auto;
  width: 80%;
  border: 3px solid green;
  padding: 10px;

}
select {
    
    margin: 9px;
    font-size: 22px;
    height: 4vh;
    width: 23vh;
}

}
`
export default UpdateUser
