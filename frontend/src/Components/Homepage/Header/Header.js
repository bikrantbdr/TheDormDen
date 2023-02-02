import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

import Logo from '../../../images/Logo.svg'
import UserIcon from '../../../images/User_Icon.svg'

function Header() {
  return (
    <div className='header'>
        <picture>
            <img src={Logo} alt="logo for thedormden" />
        </picture>
        <div className='links'>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <button className='primary-btn'>
              <img src={UserIcon} alt="user icon" />
              <span>Profile</span>
            </button>
        </div>
    </div>
  )
}

export default Header