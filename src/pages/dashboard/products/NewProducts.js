import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDataFromFireBase, getAllDataFromFireBase } from "../../../firebase/firebaseFunctions";
import "./NewProducts.css"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const NewProducts = () => {
 
  
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    
    fetchData();
  }, []);
  const fetchData = async () => {
    const allProducts = await getAllDataFromFireBase("Products");
    setProducts(allProducts);
  };
const deleteHandler =(id) =>{
  deleteDataFromFireBase("Products", id);
  fetchData()
}
  return (
    <div className="container">
        <div className="productsPageHeader">
        <h1>Add Product</h1>
        <button onClick={() => navigate("/dashboard/addproduct")}>Add</button>
      </div>
      <div className="allProducts">
        <table className="productsListTable">
          <thead>
            <tr>
              <td>SN</td>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr key={product.productId}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={product.productUrl} alt="product-item" className="dashboardProductImage"/>
                  </td>
                  <td>
                    <h2>{product.productName}</h2>
                  </td>
                  <td>
                    <h5>{product.productCategory}</h5>
                  </td>
                  <td>
                    <p>{product.productDescription}</p>
                  </td>
                 
                  <td>
                    <span>{product.productPrice}</span>
                  </td>
                  <td>
                    <div className="productsListActions">
                      <button onClick={()=>navigate(`edit/${product.productId}`)}><CiEdit /></button>
                      <button onClick={()=>deleteHandler(product.productId)}><MdDelete /></button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  
  );
      

};

export default NewProducts;
