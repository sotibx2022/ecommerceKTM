import React from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../redux/userSlice";
import "./ProfileOptions.css";
import { useNavigate } from "react-router-dom";
const ProfileOptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    navigate("/");
    dispatch(removeUser());
  };
  return (
    <div className="profileSummary">
      <ul className="profileOptions">
        <li onClick={() => navigate("/profile")}>View and Edit Profile</li>
        <li onClick={logOut} className="logout">
          Logout
        </li>
        <li onClick={() => navigate("/orders")}>Orders</li>

        <li onClick={() => navigate("/reviews")}>Reviews</li>
      </ul>
    </div>
  );
};

export default ProfileOptions;
