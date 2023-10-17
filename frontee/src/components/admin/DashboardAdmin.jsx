import styled from "styled-components";
import MetadaData from "../../MetadaData";
import SlideBar from "./SlideBar";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut,Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../actions/ProductAction";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import {allOrders} from "../../actions/OrderAction"
import { getAllusers } from "../../actions/UserAction";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);



const DashboardAdmin = () => {



  
    const dispatch = useDispatch();
  
    const { products } = useSelector((state) => state.products);
    
    const { orders } = useSelector((state) => state.alladminsOrders);
  
    const { users } = useSelector((state) => state.allUsers);
  
    let outOfStock = 0;
  
    products &&
      products.forEach((item) => {
        if (item.Stock === 0) {
          outOfStock += 1;
        }
      });
  
    useEffect(() => {
      dispatch(getAdminProducts());
      dispatch(allOrders());
      dispatch(getAllusers());
    }, [dispatch]);
  
    let totalAmount = 0;
    orders &&
      orders.forEach((item) => {
        totalAmount += item.totalPrice;
      });
  
    const lineState = {
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          backgroundColor: ["tomato"],
          hoverBackgroundColor: ["rgb(197, 72, 49)"],
          data: [0, 0],
        },
      ],
    };
  
    const doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, products.length - outOfStock],
        },
      ],
    };
  
    return (
      <Wrapper>

    
      <div className="dashboard">
        <MetadaData title="Dashboard - Admin Panel" />
        <SlideBar />
  
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
  
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹0
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
  
      <div className="graphs">

          <div className="lineChart">
            <Line data={lineState} />
          </div>
  
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
      </div>
        </div>
      </div>
      </Wrapper>
    );
  };
  

const Wrapper = styled.section`

.dashboard {
  width: 100vw;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;

  
}

.dashboardContainer {
  border-left: 1px solid rgba(0, 0, 0, 0.13);
  background-color: rgb(255, 255, 255);
  padding: 3rem 0;
  padding-left:35vh;

}

.dashboardContainer > h1 {
  color: rgba(0, 0, 0, 0.733);
  font: 300 2rem "Roboto";
  text-align: center;
  width: 50%;
  padding: 1.5rem;
  margin: auto;
}

.dashboardSummary {
  margin: 2rem 0;
}

.dashboardSummary > div {
  display: flex;
  background-color: white;
  justify-content: center;
}
.dashboardSummary > div > p {
  background-color: rgba(70, 117, 218, 0.932);
  color: white;
  font: 300 1.3rem "Roboto";
  text-align: center;
  padding: 1.5rem;
  width: 100%;
  margin: 0 2rem;
}
.dashboardSummaryBox2 > a {
  color: rgb(0, 0, 0);
  font: 300 2rem "Roboto";
  text-align: center;
  background-color: rgb(255, 233, 174);
  text-decoration: none;
  padding: 1.5rem;
  width: 10vmax;
  height: 10vmax;
  margin: 2rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dashboardSummaryBox2 > a:first-child {
  background-color: rgb(255, 110, 110);
  color: rgb(255, 255, 255);
}

.dashboardSummaryBox2 > a:last-child {
  background-color: rgb(197, 108, 108);
  color: rgb(255, 255, 255);
}

.lineChart {
  width: 80%;
  margin: auto;
}

.doughnutChart {
  width: 30vmax;
  margin: auto;
}



@media screen and (max-width: 600px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .dashboardContainer {
    border-left: none;
    padding-left: 0px;
  }

  .graphs{
    margin-left: 74px;
    padding-top: 30px;
    width: 32vmax;
  }

  .doughnutChart {
    margin-top:30px;
  }

  .dashboardSummary > div > p {
    margin: 0;
  }

  .dashboardSummaryBox2 > a {
    padding: 0.5rem;
    margin: 1rem;
    font: 300 0.9rem "Roboto";
  }
}



`;
export default DashboardAdmin;
