import React, { useState } from 'react'
import { IoIosStar } from 'react-icons/io'

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);

  return (
    <div>
        {[ ...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
                <label key={i}>
                    <input 
                        type="radio" 
                        name="rating" 
                        value={ratingValue} 
                        onClick={() => setRating(ratingValue)}
                        style={{display: "none"}}/>
                    <IoIosStar 
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        size={30}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}/>
                </label>
            )
            } 
        )}
    </div>
  )
}

export default StarRating