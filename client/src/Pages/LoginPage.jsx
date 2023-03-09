import React from 'react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './../Components/Navbar';
import LoginForm from './../Components/LoginForm';
import NotificationBar from '../Components/NotificationBar';
import { AuthContext } from './../context/AuthContext';

const LoginPage = () => {
    const { user_id } = useContext(AuthContext);
    const navigate = useNavigate();
    
  return (
    <>
      <NotificationBar />
      <Navbar />
      <LoginForm />
    </>
  )
}

export default LoginPage