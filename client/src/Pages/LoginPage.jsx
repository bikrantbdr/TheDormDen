import React from 'react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavAndSidebar from './../Components/NavAndSidebar';
import LoginForm from './../Components/LoginForm';
import NotificationBar from '../Components/NotificationBar';
import { AuthContext } from './../context/AuthContext';

import {Helmet} from "react-helmet";

const LoginPage = () => {
    
  return (
    <>
    <Helmet>
        <title>My Title</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <NotificationBar />
      <NavAndSidebar />
      <LoginForm />
    </>
  )
}

export default LoginPage