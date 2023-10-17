import React from 'react'
import { Fragment ,useEffect} from 'react'
import styled from "styled-components"
import { clearError, getAdminProducts,DeleteProducts } from '../../actions/ProductAction'
import {DataGrid} from "@material-ui/data-grid"
import {useSelector, useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import SlideBar from './SlideBar'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link ,useNavigate,useParams} from 'react-router-dom'
import { DELETE_PRODUCT_RESET } from '../../constants/ProductConstants'

const ProductList = () => {

  const dispatch = useDispatch();
  const  alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();


  const { error, products } = useSelector((state) => state.products);
  const { error:deleteError, isDeleted} = useSelector((state) => state.deleteProduct);


  const deleteProductHandler =(id)=>{
    dispatch(DeleteProducts(id))

  }


  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearError)
    }

    if(deleteError){
      alert.error(error)
      dispatch(clearError)
    }

    if(isDeleted){
      alert.success("Product Deleted succesfully");
      Navigate("/admin/dashboard");
      dispatch({type:DELETE_PRODUCT_RESET})
    }

    dispatch(getAdminProducts());

  }, [error,alert,deleteError,isDeleted,dispatch,Navigate]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  products &&
  products.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.Stock,
      price: item.price,
      name: item.name,
    });
  });

  return (
    <Wrapper>
      <Fragment>
             <div className="dashboard">
        <SlideBar/>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
      </Fragment>
    </Wrapper>
  )
}

const Wrapper = styled.section`
.productListContainer {
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border-left: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#productListHeading {
  font: 400 2rem "Roboto" ;
  padding: 0.5vmax;
  box-sizing: border-box;
  color:black;
  transition: all 0.5s;
  margin: 2rem;
  text-align: center;
}

.productListTable {
  background-color: lightyellow;
  border: none !important;
}

.productListTable div {
  font: 300 1vmax "Roboto";
  color: rgba(0, 0, 0, 0.678);
  border: none !important;
}

.productListTable a,
.productListTable button {
  color: rgba(0, 0, 0, 0.527);
  transition: all 0.5s;
}

.productListTable a:hover {
  color: tomato;
}

.productListTable button:hover {
  color: rgb(236, 30, 30);
}

.MuiDataGrid-columnHeader div {
  color: black;
  font-size: 25px;
}

@media screen and (max-width: 600px) {
  .productListTable div {
    font: 300 4vw "Roboto";
  }
}


`
export default ProductList
