import React from 'react'
import Header from '../Components/Homepage/Header/Header'
import SubHeader from '../Components/Homepage/SubHeader/SubHeader'
import HostelName from '../Components/Homepage/HostelName'
import Seaters from '../Components/Homepage/Seaters'
import Location from '../Components/Homepage/Location'

import './Homepage.css'

function Homepage() {
  return (
    <>
        <Header />
        <SubHeader />
        <form onSubmit={ () => console.log() } className='search-bar'>
            <HostelName />
            <Seaters />
            <Location />
        </form>
    </>
  )
}

export default Homepage