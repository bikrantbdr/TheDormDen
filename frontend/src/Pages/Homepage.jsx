import React from 'react'
import Header from '../components/Homepage/Header/Header'
import SubHeader from '../components/Homepage/SubHeader/SubHeader'
import HostelName from '../components/Homepage/HostelName'
import Seaters from '../components/Homepage/Seaters'
import Location from '../components/Homepage/Location'

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