import React from 'react'
import { ModalContainer, Wrapper, CloseBtn } from './DocumentImageModal'
import { RateHostel, Rating, WriteReview} from './HostelReviewsAndComments'
import StarRating from './StarRating'

const ReviewComponentModal = ({ setShowModal, cleanlinessRating, setCleanlinessRating, foodRating, setFoodRating, staffRating, setStaffRating, amenitiesRating, setAmenitiesRating, comment, setComment}) => {
  return (
    <ModalContainer>
        <Wrapper style={{margin: "24px auto"}}>
            <RateHostel style={{width: "500px"}}>
                <h1>Review</h1>
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
                    <h2>Comment</h2>
                    <textarea rows="10" column="30" disabled={true} placeholder='Share your experience' value={ comment } onChange={ (e) => setComment(e.target.value) }/>
                </WriteReview>
            </RateHostel>
            <CloseBtn onClick={ () => setShowModal(false) }>&times;</CloseBtn>
        </Wrapper>
    </ModalContainer>
  )
}

export default ReviewComponentModal