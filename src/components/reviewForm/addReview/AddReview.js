import React, { useState } from 'react'

const AddReview = (props) => {
    const [selectedStars, setSelectedStars] = useState(0);
    const handleStarClick = (num) => {
        setSelectedStars(num);
        props.sendSelectedStars(num)
      };
  return (
    <div>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((num, index) => {
            return (
              <div
                key={index}
                onClick={() => handleStarClick(num)}
                className={
                  num <= selectedStars ? "filledStar" : "notFilledStar"
                }
                value={selectedStars}
                onChange={(e) => setSelectedStars(e.target.value)}
              >
                ☆
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default AddReview