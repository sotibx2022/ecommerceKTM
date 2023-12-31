import React, { useEffect, useState } from "react";
import {
  fetchSingleDataFromFireBase,
  getAllDataFromFireBase,
} from "../../firebase/firebaseFunctions";
import Rating from "../rating/Rating";
import "./AllReviews.css";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";

const AllReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const[selectedReviews, setSelectedReviews] = useState([]);
 
  const [userData, setUserData] = useState({});
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const allReviews = await getAllDataFromFireBase("Reviews");
    console.log(allReviews)
if(allReviews){
  const reviewsForProduct = allReviews.filter((review)=>{
    return review.id ===productId
  })
  setReviews(reviewsForProduct);
}
    

    const userId = currentUser.parentId;
    const allUsers = await getAllDataFromFireBase("USERS");
    const userDetails = allUsers.filter((user, index) => {
      return user.id === userId;
    });

    if (userDetails) {
      setUserData(userDetails);
    }
  };

  return (
    <div>
      {reviews &&
        reviews
          .filter((review) => review.id === productId)
          .map((review, index) => (
            <div className="reviewItem" key={index}>
              <h2>{review.subject}</h2>
              <Rating rating={review.selectedStars} />
              <p>{review.description}</p>
              <p className="reviewedBy">
                <span>Reviewed By: </span>
                {review.displayName}
              </p>
             
            </div>
          ))}
    </div>
  );
};

export default AllReviews;
