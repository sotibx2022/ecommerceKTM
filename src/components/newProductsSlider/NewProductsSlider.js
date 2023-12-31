import React, { useEffect, useState } from "react";
import { getAllDataFromFireBase } from "../../firebase/firebaseFunctions";
import "./NewProductsSlider.css";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const NewProductsSlider = () => {
  const [newProducts, setNewProducts] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const newProducts = await getAllDataFromFireBase("Products");
    setNewProducts(newProducts);
  };
  return (
    <div className="container newProductsWrapper">
    <div className="newProductsContainer">
     
        {newProducts.slice(0,4).map((product, index) => {
          return (
            <div
              key={index}
              className="product"
              onClick={() =>
                navigate(
                  `/newProducts/newproductDetails/${product.productName}/${product.productId}`
                )
              }
            >
              <img src={product.productUrl} alt="iPhone 9 Thumbnail" />
              <div className="productContent">
                <h2 className="productTitle">{product.productName}</h2>
                <p className="productCategory">{product.productCategory}</p>
                <p className="productPrice">$ {product.productPrice}</p>
                <p className="new">new</p>
              </div>
            </div>
          );
        })}
   
      </div>
    </div>
  );
};

export default NewProductsSlider;
