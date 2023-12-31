import React, {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import {
  Loader,

  Share,
  ReviewForm,
  AllReviews,
} from "../../components";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {

  getAllDataFromFireBase,
} from "../../firebase/firebaseFunctions";


const ProductDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { userEmail } = currentUser;
  const { productId } = useParams();
  const id = parseInt(productId);
  const [product, setProduct] = useState({});
  const [newImage, setNewImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [totalLikes, setTotalLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const allData = await getAllDataFromFireBase("Products");
    if (allData) {
      const selectedData = allData.find((data) => parseInt(data.productId) === id);
      setProduct(selectedData);
      setLoading(false);
    }
  };
  const updateLikes = () => {
    if (!isLiked) {
      setTotalLikes(totalLikes + 1);
      setIsLiked(true);
    } else {
      setTotalLikes(totalLikes - 1);
      setIsLiked(false);
    }
  };



  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="productCard">
            <div className="productCardLeft">
              <img
                className="productImage"
                src={newImage ? imageUrl : product.productUrl}
                alt="Product Thumbnail"
              />
              <div className="productImages"></div>
            </div>
            <div className="productCardRight">
              <div className="productTitleWrapper">
                <h2 className="productTitle">{product.productName}</h2>
                <div className="productTitleIcons">
                  <AiFillLike
                    onClick={updateLikes}
                    className={isLiked ? "coloredLike" : ""}
                  />
                  <span>{totalLikes}</span>
                  <Share />
                </div>
              </div>
              <p className="productDescription">
                Description : {product.productDescription}
              </p>

              <p className="productCategory">
                Category :{product.productCategory}
              </p>
              <p className="productPrice">$ {product.productPrice}</p>

              <div className="productActions">
              
                {currentUser ? (
                  <button className="btnatProductDetailPage"
                    onClick={() =>
                      dispatch({
                        type: "cart/addToCart",
                        payload: {
                          product: product,
                          userEmail: userEmail,
                        },
                      })
                    }
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button onClick={() => navigate("/register")} className="btnatProductDetailPage">
                    Register to Order
                  </button>
                )}
                {currentUser && <button className="btnatProductDetailPage">Add Review</button>}
              </div>
              {currentUser && <ReviewForm product={product} />}
              <AllReviews productId={productId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
