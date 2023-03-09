import React from 'react'
import { RateHostel, Rating, WriteReview, ReviewFooter } from './HostelReviewsAndComments'
import StarRating from './StarRating'

const UserReviewComponent = ({ existingReview, cleanlinessRating, setCleanlinessRating, foodRating, setFoodRating, staffRating, setStaffRating, amenitiesRating, setAmenitiesRating, comment, setComment, handleSubmitReview }) => {
  return (
    <RateHostel>
        <h1>{existingReview.length > 0 ? "Edit your": "Write a"} Review</h1>
        <h2>Rating</h2>
        <Rating>
            <h3>Cleanliness</h3>
            <StarRating rating={ cleanlinessRating } setRating={ setCleanlinessRating } />
            <h3>Food</h3>
            <StarRating rating={ foodRating } setRating={ setFoodRating } />
            <h3>Staff</h3>
            <StarRating rating={ staffRating } setRating={ setStaffRating }/>
            <h3>Amenities</h3>
            <StarRating rating={ amenitiesRating } setRating={ setAmenitiesRating }/>
        </Rating>
        <WriteReview>
            <h2>{existingReview.length > 0 ? "Edit your": "Write a"} Comment</h2>
            <textarea rows="10" column="30" placeholder='Share your experience' value={ comment } onChange={ (e) => setComment(e.target.value) }/>
        </WriteReview>
        <ReviewFooter>
            <p>Your review must be atleast {(50 - (comment.length || 0) > 0) ? (50 - (comment.length || 0)) : 0} characters long</p>
            <button onClick={ handleSubmitReview }>Submit review</button>
        </ReviewFooter>
    </RateHostel>
  )
}

export default UserReviewComponent