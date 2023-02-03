import React from 'react'
import { Map, Marker } from "pigeon-maps";
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
        <div className='images__map'>
          {console.log([hostel.location.coordinates[1],hostel.location.coordinates[0]])}
        <Map height={300} defaultCenter={[hostel.location.coordinates[1],hostel.location.coordinates[0]]} defaultZoom={14} >
            <Marker width={50} anchor={[hostel.location.coordinates[1],hostel.location.coordinates[0]]} />
        </Map>
        </div>
    </div>
  )
}

export default ImagesSection