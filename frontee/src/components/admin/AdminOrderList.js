import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import styled from "styled-components"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SlideBar from "../../components/admin/SlideBar"
import { deleteOrder,allOrders,clearError } from "../../actions/OrderAction";
import { DELETE_ORDERS__RESET} from "../../constants/OrderConstant";
import MetadaData from "../../MetadaData"
import {useNavigate } from "react-router-dom";



const AdminOrderList = () => {

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.alladminsOrders);

  const { error: deleteError, isDeleted,loading } = useSelector((state) => state.updOrders);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      Navigate("/admin/orders");
      dispatch({ type: DELETE_ORDERS__RESET });
    }

    dispatch(allOrders());
  }, [dispatch, alert, error, deleteError,Navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
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
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
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

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
   <Wrapper>
    <Fragment>
    
     <Fragment>
      <MetadaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SlideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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
     
   
      </Fragment>
   </Wrapper>
  )
}

const Wrapper = styled.section`

#productListHeading{
  text-align: center;
  margin-bottom:25px ;
}

.productListTable{
  font-size:20px;
}
`
export default AdminOrderList
