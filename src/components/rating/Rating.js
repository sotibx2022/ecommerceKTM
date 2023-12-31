import React from 'react'
import "./Rating.css";

const Rating = ({rating}) => {
  return (
    <div className="stars">
                  {[...Array(Math.floor(rating))].map((star,index)=>(
                    <div key={index} className="star filledStar">☆</div>
                  ))}
                  {[...Array(5 - Math.floor(rating))].map((star,index)=>(
                    <div key={index} className="star notFilledStar">☆</div>
                  ))}
                </div>
  )
}

export default Rating