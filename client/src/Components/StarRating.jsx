<<<<<<< HEAD
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

=======
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

>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
export default StarRating