import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { AccountDetails, Search } from "../../components/index";

import "./Header.css";
import { getAllDataFromFireBase } from "../../firebase/firebaseFunctions";

import { FaBars } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";
import DashboardLayout from "../dashboard/dashboardLayout/DashboardLayout";
import { CiShoppingCart } from "react-icons/ci";

import ResponsiveMenu from "./responsiveMenu/ResponsiveMenu";

import Logo from "./logo/Logo";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);

  const [hovertoBar, setHoverToBar] = useState(false);
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);

  const fetchData = async () => {
    const allCarts = await getAllDataFromFireBase("Carts");

    if (allCarts) {
      const selectedCarts = allCarts.filter((cart) => {
        return cart.userEmail === currentUser.userEmail;
      });
      if (selectedCarts) {
        dispatch({ type: "cart/setItemsToCartFromDB", payload: selectedCarts });
      } else {
        dispatch({ type: "cart/setItemsToCartFromDb", payload: [] });
      }
    }
  };

  // Call fetchData directly after defining it
  fetchData();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cartArray = useSelector((state) => state.cart.cartArray);

  const receiveResponsiveValue = (value) => {
    setShowResponsiveMenu(value);
  };

  return (
    <div>
      {currentUser.userEmail === "sbinayaraj@gmail.com" ? (
        <DashboardLayout />
      ) : (
        <header>
          <div className="headerContainer container">
            <Logo />
            <div className="headerSearchArea">
              <Search />
            </div>

            <nav className="headerNavigation">
              <ul>
                <NavLink
                  to="/allproducts"
                  className={({ isActive }) => (isActive ? "activeHover" : "")}
                >
                  <li className="hoverNav">Products</li>
                </NavLink>
                <NavLink
                  to="/allnewproducts"
                  className={({ isActive }) => (isActive ? "activeHover" : "")}
                >
                  <li className="hoverNav">New Products</li>
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) => (isActive ? "activeHover" : "")}
                >
                  {currentUser !== "" && (
                    <li className="cartNav">
                      Cart <CiShoppingCart className="cartIcon" />
                      {cartArray.length}
                    </li>
                  )}
                </NavLink>
                {currentUser === "" && (
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "activeHover" : ""
                    }
                  >
                    <li className="hoverNav">Register</li>
                  </NavLink>
                )}

                {currentUser === "" ? (
                  <li className="account"></li>
                ) : (
                  <>
                    <li className="account">
                      <AccountDetails />
                    </li>
                  </>
                )}
              </ul>
            </nav>
            <div
              className="responsiveIcon"
              onMouseEnter={() => setHoverToBar(true)}
              onMouseLeave={() => setHoverToBar(false)}
            >
              {hovertoBar ? (
                <span
                  onClick={() => setShowResponsiveMenu(true)}
                  className="responsiveMenuIcon"
                >
                  <FaBarsStaggered className="responsiveMenuIcon" />
                </span>
              ) : (
                <span>
                  <FaBars className="responsiveMenuIcon" />
                </span>
              )}
              <div>
                {showResponsiveMenu && (
                  <ResponsiveMenu
                    sendResponsiveValue={receiveResponsiveValue}
                  />
                )}
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
