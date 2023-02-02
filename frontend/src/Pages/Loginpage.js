import React from 'react'
import Article from '../Components/Loginpage/Article';
import Header from './../Components/Homepage/Header/Header';
import LoginForm from './../Components/Loginpage/LoginForm';

import './Loginpage.css'

function Loginpage() {
  return (
    <>
        <Header />
        <div className='loginpage__main'>
          <Article />
          <LoginForm />
        </div>
    </>
  )
}

export default Loginpage