import React from 'react'

function Offerings({ amenities }) {
  return (
    <div className='offerings__container'>
        <ul>
            {amenities.map(amenity => {
                return <li key={ amenity }>{ amenity }</li>
            })}
        </ul>
    </div>
  )
}

export default Offerings