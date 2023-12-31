import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Filter.css";
import toast from "react-hot-toast";
import MyContext from "../../context/myContext";
import { CiSearch } from "react-icons/ci";

import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

 

  const { dispatch } = useContext(MyContext);

  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [min2max, setMin2Max] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getProductsfromServer();
   
  }, []);
  useEffect(() => {
    getCategories();
  }, [products]);

  const getProductsfromServer = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((data) => {
        setProducts(data.data.products);
        
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleLiClick = (category) => {
    dispatch({ type: "filterProductsByCategory", category });
    navigate(`/allProducts/search?${category}`);
    setSelectedCategory(category);
  };
  const min2MaxHandler =() =>{
    dispatch({
      type: "filterProductByMinandMaxPrice",
      minPrice,
      maxPrice,
    })
    navigate(`/allProducts/search?minPrice : ${minPrice} and maxPrice:${maxPrice}`);
  }
  let uniqueCatagoreis = [];
  const getCategories = () => {
    for (let i = 0; i < products.length; i++) {
      let category = products[i].category;

      if (!uniqueCatagoreis.includes(category)) {
        uniqueCatagoreis.push(category);
      }
    }
    
    setCategories(uniqueCatagoreis);
  };
  const resetHandler =() =>{
    dispatch({ type: "reset" });
    navigate(`/allProducts`);
  }

  return (
    <div className="filterArea">
      <ul className="categories">
        <h6>Filter by categories</h6>
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

      <div className="filterByPrice">
        <h6>Filter by Price</h6>
        <div className="priceInputs">
          <input
            type="number"
            placeholder="Min. Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="Max. Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          ></input>
          <button onClick={min2MaxHandler}>
            <CiSearch />
          </button>
        </div>
      </div>
      <div className="resetSearch">
        {min2max ? (
          <button
            onClick={() => {
              dispatch({ type: "filterProductsFromMinToMax" });
              setMin2Max(!min2max);
            }}
          >
            <IoFilterSharp className="rotateIcon" />
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch({ type: "filterProductsFromMaxToMin" });
              setMin2Max(!min2max);
            }}
          >
            <IoFilterSharp />
          </button>
        )}
        <button onClick={resetHandler}>Reset</button>
      </div>
    </div>
  );
};

export default Filter;
