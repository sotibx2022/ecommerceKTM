import {
  MdAccountBalance,
  MdAppSettingsAlt,
  MdDashboard,
  MdOutlinePsychology,
} from "react-icons/md";
import "./DashboardSideBar.css";

import { useNavigate } from "react-router-dom";
import { FaRegCreditCard, FaShippingFast, FaStore } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../redux/userSlice";

const DashboardSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    navigate("/");
    dispatch(removeUser());
  };
  return (
    <div className="sidebar">
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <MdDashboard className="icon" />
            <span>Dashboard</span>
          </li>

          <li onClick={() => navigate("/dashboard/products")}>
            <FaStore className="icon" />
            <span>Products</span>
          </li>

          <li
            onClick={() => {
              navigate("/dashboard/orders");
            }}
          >
            <FaRegCreditCard className="icon" />
            <span>Orders</span>
          </li>
          <li onClick={() => navigate("/dashboard/slider")}>
            <FaShippingFast className="icon" />
            <span>Sliders</span>
          </li>

          <li
            onClick={() => {
              navigate("/dashboard/reviews");
            }}
          >
            <CiSettings className="icon" />
            <span>Reviews</span>
          </li>
          <li
            onClick={() => {
              navigate("/dashboard/notifications");
            }}
          >
            <CiSettings className="icon" />
            <span>Messages</span>
          </li>
          <li
            onClick={() => {
              navigate("/dashboard/users");
            }}
          >
            <MdOutlinePsychology className="icon" />
            <span>Users</span>
          </li>
          <p className="title">ADMIN</p>
          <li>
            <MdAppSettingsAlt className="icon" />
            <span>Settings</span>
          </li>

          <li>
            <MdAccountBalance className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <MdAccountBalance className="icon" />
            <span>Add Admin</span>
          </li>
          <li>
            <IoMdExit className="icon" />
            <span onClick={logOut}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSideBar;
