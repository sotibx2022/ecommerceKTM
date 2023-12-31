import React, { useContext, useState } from "react";
import "./Search.css";
import { CiSearch } from "react-icons/ci";
import MyContext from "../../context/myContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { dispatch } = useContext(MyContext);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const searchProducts = (searchText) => {

    navigate(`/allProducts/search?${searchText}`);
    dispatch({type:'reset'})
    dispatch({ type: "filterProductsBySearch", searchText });
  };
  return (
    <div className="headerSearch">
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search"
          className="searchInput"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="searchButton"
          onClick={() => searchProducts(searchText)}
        >
          <CiSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
