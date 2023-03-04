import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './../Components/Navbar';
import LoginForm from './../Components/LoginForm';
import NotificationBar from '../Components/NotificationBar';
import { AuthContext } from './../context/AuthContext';

const LoginPage = () => {
    const { user_id } = useContext(AuthContext);
    const navigate = useNavigate();
    if (user_id) {
      navigate("/");
    }
    
  return (
    <>
      <NotificationBar message="This is a notification bar" status={"success"}/>
      <Navbar />
      <LoginForm />
    </>
  )
}

export default LoginPage