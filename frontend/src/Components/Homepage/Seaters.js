import React from 'react'
import { useState } from 'react'

import './Seaters.css'

function Seaters({ setSeaters }) {
    const [ value, setValue ] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
        setSeaters(e.target.value)
    }
  return (
    <div className="select-seater">
        <label htmlFor="seaters">Seater</label>
        <select value={ value } name='seater' onChange={ handleChange }>
            <option value="0">Any</option>
            <option value="1">One Seater</option>
            <option value="2">Two Seater</option>
            <option value="3">Three Seater</option>
            <option value="4">Four Seater</option>
        </select>
    </div>
  )
}

export default Seaters