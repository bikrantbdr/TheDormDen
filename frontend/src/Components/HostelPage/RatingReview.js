import React, { useState } from 'react'
import Star from './Star';
import {PercentBar, YellowLine,ReviewComponent, ReviewOverallRating, ReviewContainer, StarBar} from './RatingReviewStyle';
 
 
function Review() {
  //Hardcoding values of reviews cause I don't know how to access the backend data yet
  //The total number of reviews and the reviews on each categorycneed tto be fetched for
  //the real result 
  const total = 100;
  const one = 2;
  const two = 4;
  const three = 5;
  const four = 20;
  const five = 70;
 
  //calculating the rating in percentage to fill the yellow bar in the review section
  const [rating] = useState({overall_rating: 4.5})
  const [fiveStarRating] = useState({ width: `calc(${five}/${total}*100%)`})
  const [fourStarRating] = useState({ width: `calc(${four}/${total}*100%)`})
  const [threeStarRating] = useState({ width: `calc(${three}/${total}*100%)`})
  const [twoStarRating] = useState({ width: `calc(${two}/${total}*100%)`})
  const [oneStarRating] = useState({ width: `calc(${one}/${total}*100%)`})
 
  return (
  <ReviewContainer>
   <div></div>
    <ReviewComponent>
            <h2>Customer reviews</h2> 
            <div className="review__rating">
 
                <ReviewOverallRating>                 
                 {/* Rendering the star component to display the overall rating */}
                  <Star  reviews = {rating.overall_rating}/> { rating.overall_rating } out of 5
                </ReviewOverallRating>
                <br/>
 
                {/* Rendering the percentage of reviews in the form of bars */}
              <StarBar>
                5 star <PercentBar><YellowLine style={fiveStarRating}> {} </YellowLine></PercentBar>
              </StarBar>
              <br/>
              <StarBar>
                4 star<PercentBar><YellowLine style = {fourStarRating}>{}</YellowLine></PercentBar>
              </StarBar>
              <br/>
              <StarBar>             
                3 star<PercentBar><YellowLine style = {threeStarRating}>{}</YellowLine></PercentBar>
              </StarBar>
              <br/>
              <StarBar>
                2 star<PercentBar><YellowLine style = {twoStarRating}>{}</YellowLine></PercentBar>
              </StarBar>
              <br/>
              <StarBar>
                1 star<PercentBar><YellowLine style = {oneStarRating}>{}</YellowLine></PercentBar>
              </StarBar>
            </div>
            <br/>
            <p id = "write_a_review">
              {/* Link this with the Review Page  */ }
            Write a review?
            </p>
    </ReviewComponent>
      <div></div>
   </ReviewContainer>
  )
}
 
export default Review