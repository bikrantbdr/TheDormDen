import React from 'react'
import { useState } from 'react'

import './Location.css'

import { autocomplete_query } from '../../services/geoapify'

function Location() {
    const [ value, setValue ] = useState('')
    const [ showSuggestions, setShowSuggestions ] = useState(false)
    const [ suggestions, setSuggestions ] = useState([])

    const handleChange = (e) => {
        setValue(e.target.value)
        autocomplete_query(value).then((data) => {
            setSuggestions(data)
        })
    }

    const handleSuggestionClick = (item) => {
        setValue(item.properties.formatted)
        setShowSuggestions(false)
        // we need to set the latitude and longitude for the application
    }

  return (
    <div className='autocomplete'>
        <label htmlFor='location'>Location</label>
        <input
            value={ value }
            onChange={ handleChange }
            placeholder='Search for a location'
            onFocus={ () => setShowSuggestions(true) }
        />
        { showSuggestions && (
            <ul className='suggestions'>
                { suggestions.map((item) => (
                    <li onClick={ () => handleSuggestionClick(item) }key={ item.properties.id }>{ item.properties.formatted }</li>
                    )
                )}
            </ul>)
        }
    </div>
  ) 
}

export default Location