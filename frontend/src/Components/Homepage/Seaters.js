import React from 'react'
import { useState } from 'react'

import './Seaters.css'

function Seaters({ setSeaters }) {
    const [ value, setValue ] = useState('any')
    setSeaters(value)
    const handleChange = (e) => {
        setValue(e.target.value)
        setSeaters(e.target.value)
    }
  return (
    <div className="select-seater">
        <label htmlFor="seaters">Seater</label>
        <select value={ value } name='seater' onChange={ handleChange }>
            <option value="any">Any</option>
            <option value="one_seater">One Seater</option>
            <option value="two_seater">Two Seater</option>
            <option value="three_seater">Three Seater</option>
            <option value="four_seater">Four Seater</option>
        </select>
    </div>
  )
}

export default Seaters