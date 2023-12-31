import React, { useEffect, useState } from "react";
import { getAllDataFromFireBase } from "../../../firebase/firebaseFunctions";
import { Loader, Rating } from "../../../components";
import { MdDelete } from "react-icons/md";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async() => {
    setLoading(true);
    const allReviews = await getAllDataFromFireBase("Reviews");
    if (allReviews) {
      setReviews(allReviews);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>Reviewed By</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Description</th>
                <th>ReviewedFor</th>
                <th>Selected Rating</th>
                <th>Action</th>

              </tr>
              </thead>
              <tbody>
                {reviews.map((review,index)=>{
                    return <tr key={index}>
                        <td>{index+1}</td>
                        <td>{review.displayName}</td>
                        <td>{review.userEmail}</td>
                        <td>{review.subject}</td>
                        <td>{review.description}</td>
                        <td>{review.title}</td>
                        <td><Rating rating={review.selectedStars}/></td>
                        <td><button><MdDelete className="deleteBtn"/></button></td>
                    </tr>
                })}
              </tbody>
            
          </table>
        </div>
      )}
    </div>
  );
};

export default Reviews;
