import React from 'react'

import './ImagesSection.css'

function ImagesSection({ hostel }) {
  return (
    <div className='images__section'>
        <div className='images__hero'>
            <img src={ hostel.images[0] } width="400px" alt='Hostel Image' />
        </div>
        <div className='images__gallery'>
            <img src={ hostel.images[1] } width="200px" alt='Hostel Image' />
            <img src={ hostel.images[2] } width="200px" alt='Hostel Image' />
        </div>
    </div>
  )
}

export default ImagesSection