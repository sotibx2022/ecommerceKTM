import React, { useEffect, useReducer, useState } from "react";
import MyContext from "./myContext";
import { getProductsfromServer } from "../functions/Functions";

const MyState = ({ children }) => {
 
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false)
 
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
      await getProductsfromServer().then((data) => {
        setLoading(false)
    
        setAllProducts(data);
        
      });
    };
    fetchData();
  }, []);
  const initialState = {
    products: [],
  };
  getProductsfromServer().then((data)=>{
    initialState.products = [...data]
  })
  
 
  const filterReducer = (state, action) => {
    switch (action.type) {
      

      case "filterProductsByCategory": 
        const filteredProductsByCategory = allProducts.filter(
          (product) => {
            return product.category === action.category;
          }
        );
        return {
          ...state,
          products: filteredProductsByCategory,
        };
      case "filterProductsBySearch":
        const enteredText = action.searchText.toLowerCase();
        const filteredProductsBySearch = state.products.filter((product) => {
          if (enteredText === product.title.toLowerCase().includes(enteredText)) {
            return true;
          } else if (product.description.toLowerCase().includes(enteredText)) {
            return true;
          }else if(product.category.toLowerCase().includes(enteredText)){
            return true;
          }
          return false;
        });

        return {
          ...state,
          products: filteredProductsBySearch,
        };
      case "filterProductByMinandMaxPrice":
        const{minPrice, maxPrice} = action
       
        const filteredProducts = state.products.filter((product) => {
          return product.price >= minPrice && product.price <= maxPrice;
        });
        return {
          ...state,
          products: filteredProducts,
        };
      case "filterProductsFromMinToMax":
        const sortedProducts = state.products.sort((a, b) => {
          return a.price - b.price;
        });
        return {
          ...state,
          products: sortedProducts,
        };
      case "filterProductsFromMaxToMin":
        const anotherSortedProducts = state.products.sort((a, b) => {
          return b.price - a.price;
        });
        return {
          ...state,
          products: anotherSortedProducts,
        };
     
      case "reset":
        return {
          products: allProducts,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(filterReducer, initialState);
  return (
    <MyContext.Provider value={{ products: state.products, dispatch,loading, setLoading }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
