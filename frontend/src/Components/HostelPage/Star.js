import React from 'react'
import {FaStar, FaStarHalfAlt} from 'react-icons/fa'
import {AiOutlineStar} from 'react-icons/ai'
 
const Star = ({star,reviews}) => {
   const ratingStar = Array.from({length: 5}, (_, index) => {
    let number = index + 0.5;
 
    const StarColor = {
      color: '#FFCB47',
    }
 
    return <span key =  {index}>
    {
        reviews >= index + 1 
        ? <FaStar style = {StarColor}/> 
        : reviews >= number 
        ? <FaStarHalfAlt style = {StarColor}/> 
        : <AiOutlineStar style= {StarColor}/>
    }
    </span>
   });
  return (
    <div>
        <div className="icon-style">
            {ratingStar}
        </div>
    </div>
  )
};
 
export default Star;