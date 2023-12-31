import { useContext, useState } from "react";
import Loader from "../loader/Loader";
import MyContext from "../../context/myContext";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../functions/Functions";
const Products = () => {
  const { products, loading } = useContext(MyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsperPage = 12;
  const totalPages = products.length / productsperPage;
  const navigate = useNavigate();
 
  return (
    <div>
      <div className="productsContainer">
        {loading && <Loader />}
        {products &&
          products
            .slice(
              (currentPage - 1) * productsperPage,
              currentPage * productsperPage
            )
            .map((product) => {
              return (
                <div
                  className="product"
                  key={product.id}
                  onClick={() =>
                    navigate(
                      `/allproducts/productdetails/${product.title}/${product.id}`
                    )
                  }
                >
                  <img src={product.thumbnail} alt="iPhone 9 Thumbnail" />
                  <div className="productContent">
                    <h2 className="productTitle"> {truncateText("title",product.title)}</h2>
                    <p className="productCategory">{product.category}</p>
                  
                    <p className="productPrice"> $ {product.price}</p>
                 
                  </div>
                </div>
              );
            })}
      </div>
      <div className="navigations">
        {Array.from({ length: totalPages }, (page, index) => {
          return (
            <div
              key={index}
              className={
                index + 1 === currentPage
                  ? "activeNavigation navigation"
                  : "navigation"
              }
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
