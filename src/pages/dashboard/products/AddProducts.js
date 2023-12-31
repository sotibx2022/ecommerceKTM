import React, { useEffect, useState } from "react";
import { UploadImage } from "../../../components";
import toast from "react-hot-toast";
import {
  fetchSingleDataFromFireBase,
  setDataToFireBase,
  updateSingleDataToFireBase,
} from "../../../firebase/firebaseFunctions";
import { uniqueID } from "../../../functions/Functions";
import { useParams } from "react-router-dom";

const AddProducts = () => {
  const { productId } = useParams();
  useEffect(() => {
    if (productId) {
  
      fetchSingleDataFromFireBase("Products", productId).then((data) => {
        setProductDetails(data);
        setProductUrl(data.productUrl);
      });
    }
  }, [productId]);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productPrice: "",
  });
  const { productName, productCategory, productDescription, productPrice } =
    productDetails;
  const [productUrl, setProductUrl] = useState("");
  const receiveUrlFromChild = (url) => {
    setProductUrl(url);
  };
  const chnageHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (productUrl === "") {
      toast.error("Please upload the image First...");
    } else {
      const productId = uniqueID();
      await setDataToFireBase("Products", productId, {
        productName,
        productCategory,
        productDescription,
        productPrice,
        productUrl,
        productId,
      });
    }
  };

  const UpdateHandler = (e) => {
    e.preventDefault();
    const updatedData = {
      productId: productId,
      productCategory: productCategory,
      productDescription: productDescription,
      productName: productName,
      productPrice: productPrice,
      productUrl: productUrl,
    };
    updateSingleDataToFireBase("Products", productId, updatedData);
  };
  return (
    <div className="container productsContainer">
      <div className="uploadImageArea">
        <UploadImage
          sendUrlToParent={receiveUrlFromChild}
          imageFolder="Products/"
          imageUrlFromDb={productUrl}
        />
      </div>
      <div className="addProductDetailsArea">
        <form className="addProductForm">
          <input
            type="text"
            placeholder="Product Name"
            name="productName"
            value={productDetails.productName}
            onChange={chnageHandler}
          />
          <input
            type="text"
            placeholder="Product Category"
            name="productCategory"
            value={productDetails.productCategory}
            onChange={chnageHandler}
          />
          <textarea
            type="text"
            placeholder="Product Description"
            name="productDescription"
            value={productDetails.productDescription}
            onChange={chnageHandler}
          />
          <input
            type="number"
            placeholder="price"
            name="productPrice"
            value={productDetails.productPrice}
            onChange={chnageHandler}
          />
          {productId ? (
            <button onClick={UpdateHandler}>Update</button>
          ) : (
            <button onClick={submitHandler}>submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
