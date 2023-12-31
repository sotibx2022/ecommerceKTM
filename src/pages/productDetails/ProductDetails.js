import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import "./ProductDetails.css";
import {
  Loader,
  Rating,
  Share,
  ReviewForm,
  AllReviews,
} from "../../components";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProductsfromServer } from "../../functions/Functions";


const ProductDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { userEmail } = currentUser;


  const { productId } = useParams();
  const id = parseInt(productId);
  const [product, setProduct] = useState([]);
  const [newImage, setNewImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [share, setShare] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await getProductsfromServer();
        if (allProducts) {
          setLoading(false);
          findSelectedProduct(allProducts);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts()
  }, []);

  const dispatch = useDispatch();
 
  const findSelectedProduct = (products) => {
    const selectedProduct = products.filter((product) => {
      return product.id === id;
    });

    setProduct(selectedProduct);
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

  const changeImage = (url, index) => {
    setNewImage(true);
    setImageUrl(url);
    setImageIndex(index);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          {product.map((product) => {
            const {
              title,
              description,
              brand,
              category,
              price,
              rating,
              stock,
              id,
              discountPercentage
            } = product;
            return (
              <div className="productCard" key={id}>
                <div className="productCardLeft">
                  <img
                    className="productImage"
                    src={newImage ? imageUrl : product.thumbnail}
                    alt="Product Thumbnail"
                  />
                  <div className="productImages">
                    {product.images.map((image, index) => {
                      return (
                        <img
                          src={image}
                          alt="images"
                          className={
                            index === imageIndex
                              ? "activeProductThumbnail"
                              : "productThumbnail"
                          }
                          onClick={() => changeImage(image, index)}
                          key={index}
                        ></img>
                      );
                    })}
                  </div>
                </div>
                <div className="productCardRight">
                  <div className="productTitleWrapper">
                    <h2 className="productTitle">{title}</h2>
                    <div className="productTitleIcons">
                      <AiFillLike
                        onClick={updateLikes}
                        className={isLiked ? "coloredLike" : ""}
                      />
                      <span> {totalLikes}</span>

                      <Share />
                    </div>
                  </div>
                  <p className="productDescription">
                    Description : {description}
                  </p>
                  <p className="productBrand">Brand : {brand}</p>
                  <p className="productCategory">Category :{category}</p>
                  <p className="">Price : <span className="productPrice">$ {price}</span></p>
                  <p className="productDiscount">Discount : <span>{discountPercentage} %</span></p>
                  <Rating rating={rating} />
                  <p className="productStock">Stock : {stock}</p>
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
                    {currentUser && (
                      <button onClick={() => setShowForm(true)} className="btnatProductDetailPage">
                        Add Review
                      </button>
                    )}
                  </div>
                  {showForm && <ReviewForm product={product} />}
                  <AllReviews productId={id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
