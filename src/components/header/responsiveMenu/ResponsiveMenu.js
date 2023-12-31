import React, { useState } from "react";
import "./ResponsiveMenu.css";

import Search from "../../search/Search";
import { useNavigate } from "react-router-dom";

import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { FaLuggageCart } from "react-icons/fa";

import { GoDotFill } from "react-icons/go";
import { removeUser } from "../../../redux/userSlice";
const ResponsiveMenu = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
    dispatch(removeUser());
  };
  const cartArray = useSelector((state) => state.cart.cartArray);

  const hideResponsiveMenu = () => {
    props.sendResponsiveValue(false);
  };
  const clickHandlerForCartIcon = () => {
    navigate("/cart");
    hideResponsiveMenu();
  };
  return (
    <div className="responsiveMenu">
      <div className="responsiveMenuLeft" onClick={hideResponsiveMenu}></div>
      <div className="responsiveMenuRight">
        <ul>
          <li>
            <Search />
          </li>
          <li
            className="hoverableResponsiveLi"
            onClick={() => {
              navigate("/allProducts");
              hideResponsiveMenu();
            }}
          >
            <h2>Products</h2>
            <h2>Products</h2>
          </li>

          <li
            className="hoverableResponsiveLi"
            onClick={() => {
              navigate("/allnewproducts");
              hideResponsiveMenu();
            }}
          >
            <h2>New Products</h2>
            <h2>New Products</h2>
          </li>

          <li
            className="hoverableResponsiveLi"
            onClick={() => {
              navigate("/about");
              hideResponsiveMenu();
            }}
          >
            <h2>About</h2>
            <h2>About</h2>
          </li>

          <li
            className="hoverableResponsiveLi"
            onClick={() => {
              navigate("/contact");
              hideResponsiveMenu();
            }}
          >
            <h2>Contact</h2>
            <h2>Contact</h2>
          </li>

          <li
            className="hoverableResponsiveLi"
            onClick={() => {
              navigate("/profile");
              hideResponsiveMenu();
            }}
          >
            <h2>Profile</h2>
            <h2>Profile</h2>
          </li>
          {currentUser === "" ? (
            <ul>
              <li
                onClick={() => {
                  navigate("/login");
                  hideResponsiveMenu();
                }}
              >
                <h3>
                  <GoDotFill />
                  Login
                </h3>
              </li>
              <li
                onClick={() => {
                  navigate("/register");
                  hideResponsiveMenu();
                }}
              >
                <h3>
                  <GoDotFill /> Register
                </h3>
              </li>
            </ul>
          ) : (
            <li onClick={logOut}>
              <h3
                onClick={() => {
                  navigate("/profile");
                  hideResponsiveMenu();
                }}
              >
                <GoDotFill /> Logout
              </h3>
            </li>
          )}
        </ul>
        <div className="closeIcon" onClick={hideResponsiveMenu}>
          <RiCloseCircleFill />
        </div>
        <div
          className="cartIconForResponsiveMenu"
          onClick={clickHandlerForCartIcon}
        >
          <FaLuggageCart />
          <span className="cartCounter">{cartArray.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
