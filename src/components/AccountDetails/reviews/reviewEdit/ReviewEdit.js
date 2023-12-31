import React, { useEffect, useState } from "react";
import "./ReviewEdit.css";
import AddReview from "../../../reviewForm/addReview/AddReview";
import { useNavigate } from "react-router-dom";
import { updateSingleDataToFireBase } from "../../../../firebase/firebaseFunctions";
const ReviewEdit = (props) => {
  const navigate = useNavigate();

  const {
    price,
    description,
    subject,
    title,
    category,
    reviewId,
  } = props.review;
  const [reviewSubject, setReviewSubject] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  useEffect(() => {
    setReviewSubject(subject);
    setReviewDescription(description);
  }, []);

  const [selectedStars, setSelectedStars] = useState(0);
  const receiveSelectedStars = (num) => {
    setSelectedStars(num);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    navigate("/reviews");
    props.sendValueToTheParent(false);
    const updatedData = {
      subject: reviewSubject,
      description: reviewDescription,
      selectedStars: selectedStars,
    };
    await updateSingleDataToFireBase("Reviews", reviewId, updatedData);
  };
  return (
    <div className="reviewEdit">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="Title"
          placeholder="Title"
          value={title}
          readOnly
        />

        <input
          type="text"
          name="Category"
          placeholder="Category"
          value={category}
          readOnly
        />
        <input
          type="text"
          name="Price"
          placeholder="Price"
          value={price}
          readOnly
        />
        <AddReview sendSelectedStars={receiveSelectedStars} />
        <input
          type="text"
          name="Subject"
          placeholder="Subject"
          value={reviewSubject}
          onChange={(e) => setReviewSubject(e.target.value)}
        />
        <textarea
          type="text"
          name="Review Description"
          placeholder="Review Description"
          value={reviewDescription}
          onChange={(e) => setReviewDescription(e.target.value)}
        />

        <button>Update</button>
      </form>
    </div>
  );
};

export default ReviewEdit;
