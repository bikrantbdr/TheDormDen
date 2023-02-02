import React from 'react'
import Article from '../Components/Loginpage/Article';
import Header from './../Components/Homepage/Header/Header';
import LoginForm from './../Components/Loginpage/LoginForm';

import './Loginpage.css'

function Loginpage({ setUserInfo, cookies }) {
  return (
    <>
        <Header />
        <div className='loginpage__main'>
          <Article />
          <LoginForm setUserInfo={ setUserInfo } cookies={ cookies }/>
        </div>
    </>
  )
}

export default Loginpage