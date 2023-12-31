import React, { useEffect, useState } from "react";
import {deleteDataFromFireBase,getAllDataFromFireBase} from "../../../firebase/firebaseFunctions";
import { useSelector } from "react-redux";
import "./Reviews.css";
import Rating from "../../rating/Rating";

import { MdDelete } from "react-icons/md";

const Reviews = () => {
  useEffect(() => {
    fetchData();
  }, []);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userReviews, setUserReviews] = useState([]);

  const fetchData = async () => {
    const allReviews = await getAllDataFromFireBase("Reviews");
    if (allReviews) {
      const selectedReviews = allReviews.filter((userReviews) => {
        return userReviews.userEmail === currentUser.userEmail;
      });
      setUserReviews(selectedReviews);
    }
  };

  const deleteHandler = (id) => {
    deleteDataFromFireBase("Reviews", id);
    fetchData();
  };
  return (
    <div className="container reviewsListContainer">
      <table className="container">
        <thead>
          <tr>
            <th>SN.</th>
            <th>Title</th>
            <th>Image</th>
            <th className="reviewCategoryTitle">Category</th>
            <th className="reviewPriceTitle">Price</th>
            <th className="ratingTitle">Rating</th>
            <th>Subject</th>
            <th>Review Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userReviews.map((singleReview, index) => {
            return (
              <tr className="singleReview" key={index}>
                <td>{index + 1}</td>
                <td>{singleReview.title}</td>
                <td>
                  <img
                    src={singleReview.thumbnail}
                    alt="Thumbnail"
                    className="imageInReview"
                  />
                </td>
                <td className="reviewCategoryInfo">{singleReview.category}</td>
                <td className="reviewPriceInfo">{singleReview.price}</td>
                <td className="ratingInfo">
                  <Rating rating={singleReview.selectedStars} />
                </td>
                <td>{singleReview.subject}</td>
                <td>{singleReview.description}</td>
                <td className="reviewButtons">
                  <button onClick={() => deleteHandler(singleReview.reviewId)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;
