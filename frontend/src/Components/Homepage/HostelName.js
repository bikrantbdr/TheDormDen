import React from 'react'
import { useState } from 'react'

import './HostelName.css'

function HostelName() {
    const [ value, setValue ] = useState('')

  return (
    <div className='hostel-name'>
        <label htmlFor="hostel-name">Hostel Name</label>
        <input 
            value={ value }
            type="text"
            name="hostel-name"
            onChange={ (e) => setValue(e.target.value) }
        />
    </div>
  )
}

export default HostelName