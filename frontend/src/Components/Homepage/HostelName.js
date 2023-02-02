import React from 'react'
import { useState } from 'react'

import './HostelName.css'

function HostelName({ setHostelName }) {
    const [ value, setValue ] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
        setHostelName(e.target.value)
    }
  return (
    <div className='hostel-name'>
        <label htmlFor="hostel-name">Hostel Name</label>
        <input 
            value={ value }
            type="text"
            name="hostel-name"
            onChange={ handleChange }
        />
    </div>
  )
}

export default HostelName