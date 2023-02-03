import React from 'react'
import { useState } from 'react';

import DescriptionDetail from './DescriptionDetail';
import Offerings from './Offerings';
import Review from './Review';

import './Description.css'

function Description({ hostel }) {
    const [ all, setAll ] = useState(true);
    const [ offerings, setOfferings ] = useState(false);
    const [ reviews, setReviews ] = useState(false);
    const updatedAt = new Date(hostel.updatedAt).toDateString();

    const allVisible = () => {
        setAll(true);
        setOfferings(false);
        setReviews(false);
    }
    const offeringsVisible = () => {
        setAll(false);
        setOfferings(true);
        setReviews(false);
    }
    const reviewsVisible = () => {
        setAll(false);
        setOfferings(false);
        setReviews(true);
    }

  return (
    <div className='description__container'>
        <div className='description__heading'>{ hostel.name }</div>
        <div className='description__address'>Thapathali, Kathmandu</div>
        <div className='description__links'>
            <div className='all_links'>
                <button className='description__all' onClick={ allVisible }>Description</button>
                <button className='description__offerings' onClick={ offeringsVisible }>What we offer</button>
                <button className='description__reviews' onClick={ reviewsVisible }>Reviews</button>
            </div>
            <div className='description__published'>
                Published on { updatedAt }
            </div>
        </div>
        <div className='description__content'>
            { all && <DescriptionDetail detail={ hostel.description } /> }
            { offerings && <Offerings amenities={ hostel.amenities } /> }
            { reviews && <Review /> }
        </div>
    </div>
  )
}

export default Description