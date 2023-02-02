import React, { useState } from 'react'
import Header from '../Components/Homepage/Header/Header'
import SubHeader from '../Components/Homepage/SubHeader/SubHeader'
import HostelName from '../Components/Homepage/HostelName'
import Seaters from '../Components/Homepage/Seaters'
import Location from '../Components/Homepage/Location'

import { searchHostels } from '../services/hostel'
import { Navigate } from 'react-router-dom'

import './Homepage.css'

function Homepage({ hostels, setHostels}) {
  const [ hostelName, setHostelName ] = useState('')
  const [ seaters, setSeaters ] = useState('')
  const [ latitude, setLatitude ] = useState('')
  const [ longitude, setLongitude ] = useState('')
  // const [ hostels, setHostels ] = useState([])

  const onSubmit = async(e) => {
    e.preventDefault()
    console.log(hostelName, seaters, ' lat ', latitude, ' long ', longitude)
    const options = {
      hostelName: hostelName,
      seaters: seaters,
      latitude: latitude,
      longitude: longitude
    }
    const response = await searchHostels(options)
    console.log(response)
    setHostels(response.data)
  }
  return (
    <>
    { hostels.length===0 && 
         <>
        <Header />
        <SubHeader />
        <form className='search-bar'>
            <HostelName setHostelName={ setHostelName }/>
            <Seaters setSeaters={ setSeaters }/>
            <Location setLatitude={ setLatitude} setLongitude={ setLongitude }/>
            <button type='button' onClick={ onSubmit }>Search</button>
        </form>
        </>
}
        { hostels.length>0 && <Navigate to='/search_results' />        }
    </>
  )
}

export default Homepage