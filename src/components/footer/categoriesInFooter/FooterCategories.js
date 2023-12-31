import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyContext from "../../../context/myContext";
import "./FooterCategories.css";

const FooterCategories = () => {
  
  const [categories, setCategories] = useState();
  const { dispatch } = useContext(MyContext);
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    getProductsfromServer();
  }, []);
  const getProductsfromServer = () => {
    axios.get("https://dummyjson.com/products").then((data) => {
      getCategories(data.data.products)
    });
  };
  let uniqueCatagoreis = [];
  const getCategories = (products) => {
    for (let i = 0; i < products.length; i++) {
      let category = products[i].category;

      if (!uniqueCatagoreis.includes(category)) {
        uniqueCatagoreis.push(category);
      }
    }

    setCategories(uniqueCatagoreis);
  };
  const handleLiClick = (category) => {
    dispatch({ type: "filterProductsByCategory", category });
    navigate(`/allProducts/search?${category}`);
    setSelectedCategory(category);
  };
  return <div>
     <ul className="footerCategories">
       
        {categories &&
          categories.map((category, index) => {
            return (
              <li
                key={index}
                onClick={() => handleLiClick(category)}
                className={
                  selectedCategory === category ? "activeCategory" : ""
                }
              >
                {category}
              </li>
            );
          })}
      </ul>
  </div>;
};

export default FooterCategories;
