import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader, Rating } from "../../components/index";
import "./ReviewForm.css";
import {uniqueID,} from "../../functions/Functions";
import {getAllDataFromFireBase,setDataToFireBase,
} from "../../firebase/firebaseFunctions";
import toast from "react-hot-toast";
import AddReview from "./addReview/AddReview";
const ReviewForm = ({ product }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { displayName, userEmail, } = currentUser;
  const [loading, setLoading] = useState(false);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  const [userData, setUserData] = useState({});
  const reviewId = uniqueID();
  useEffect(() => {
    fetchData();
  }, [product.productId]);
  const fetchData = async () => {
    setLoading(true)
    const allUserDetails = await getAllDataFromFireBase("USERS");
    if (allUserDetails) {
      const userDetails = allUserDetails.find((singleUserDetails) => {
        return singleUserDetails.userEmail === userEmail;
      });
      setUserData(userDetails);
      setLoading(false)
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
   if(subject ==="" || description ===""){
    toast.error("Please enter all the fields")
   }
   else if(selectedStars === 0){
    toast.error("Please Select the Rating")
   }
    else if(product) {
      await setDataToFireBase("Reviews", reviewId, {
        subject,
        description,
        displayName,
        userEmail,
        selectedStars,
        title: product.title || product.productName,
        productDescription: product.description || product.productDescription,
        category: product.category || product.productCategory,
        price: product.price || product.productPrice,
        id: product.id||product.productId,
        thumbnail: product.thumbnail || product.productUrl,
        reviewId,
      });
      setSubject("");
      setDescription("")
    } else {
     
      toast.error("Product is not defined !!");
    }
  };
  const receiveSelectedStars = (num) => {
    setSelectedStars(num);
 
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <form className="reviewForm" onSubmit={submitHandler}>
          <h2>Submit Your Rating</h2>
          <img
            src={userData.userImageUrl}
            alt="Review Profile"
            className="reviewProfile"
          />
          <input type="text" value={currentUser.displayName} readOnly />
          <input type="text" value={currentUser.userEmail} readOnly />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <AddReview sendSelectedStars={receiveSelectedStars} />
          <button type="submit" className="submitReviewButton">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
