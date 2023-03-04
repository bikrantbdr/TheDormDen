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

    useEffect(() => {
        if (user_id) {
            console.log("humara jalwa hai yeha", user_id)
            navigate('/')
        }
    }, [user_id])
    
  return (
    <>
      <NotificationBar />
      <Navbar />
      <LoginForm />
    </>
  )
}

export default LoginPage