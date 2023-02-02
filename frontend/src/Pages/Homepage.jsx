import React, { useState } from 'react'
import Header from '../Components/Homepage/Header/Header'
import SubHeader from '../Components/Homepage/SubHeader/SubHeader'
import HostelName from '../Components/Homepage/HostelName'
import Seaters from '../Components/Homepage/Seaters'
import Location from '../Components/Homepage/Location'

import './Homepage.css'

function Homepage() {
  const [ hostelName, setHostelName ] = useState('')
  const [ seaters, setSeaters ] = useState('')
  const [ latitude, setLatitude ] = useState('')
  const [ longitude, setLongitude ] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(hostelName, seaters, ' lat ', latitude, ' long ', longitude)
  }
  return (
    <>
        <Header />
        <SubHeader />
        <form onSubmit={ (e) => e.preventDefault() } className='search-bar'>
            <HostelName setHostelName={ setHostelName }/>
            <Seaters setSeaters={ setSeaters }/>
            <Location setLatitude={ setLatitude} setLongitude={ setLongitude }/>
            <button type='button' onClick={ onSubmit }>Search</button>
        </form>
    </>
  )
}

export default Homepage