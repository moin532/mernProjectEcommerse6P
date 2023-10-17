import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import styled from 'styled-components'

const SlideBar = () => {
  return (
    <Wrapper>

<div className="sidebar">
      <Link to="/">
        {/* <img src={logo} alt="Ecommerce" /> */}
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

    <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`

.sidebar {
  background-color: rgb(255, 255, 255);
  display: flex;
  /* flex-direction: column; */
  padding: 4rem 0;
}

.sidebar > a:first-child {
  padding: 0;
}
.sidebar > a > img {
  width: 100%;
  transition: all 0.5s;
}

.sidebar > a > img:hover {
  filter: drop-shadow(0 0 10px tomato);
}
.sidebar a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.493);
  font: 200 1rem "Roboto";
  padding: 2rem;
  transition: all 0.5s;
}
.sidebar a:hover {
  color: blue;
  transform: scale(1.1);
}

.sidebar a > P {
  display: flex;
  align-items: center;
}
.sidebar a > p > svg {
  margin-right: 0.5rem;
}

.MuiTypography-root {
  background-color: #fff !important;
}


`
export default SlideBar
