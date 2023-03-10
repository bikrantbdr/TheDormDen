import React from 'react'
import { Container, FormContainer, Button } from '../Components/LoginForm'
import { BackButton } from './ForgotPasswordPage'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5'
import axios from 'axios'
import styled from 'styled-components'
import NotificationBar from '../Components/NotificationBar';
import { Helmet } from "react-helmet";
import { proxy } from '../assets/proxy';
const Subtitle = styled.p`
    font-weight: bold;
    color: #6e6e70;
    font-size: 0.9rem;
    line-height: 1.2rem;
`

const ResendMail = styled.div`
    font-weight: bold;
    color: #6e6e70;
    font-size: 0.8rem;
`

const ResendLink = styled.span`
    color: #d179ff;
    cursor: pointer;
`

function openMailapp(e) {
    e.preventDefault();
    const email = 'example@example.com';
    const subject = 'Hello from React';
    const body = 'This is a test email sent from a React application.';
  
    return (
      <a href={`mailto:${email}?subject=${subject}&body=${body}`}>Click here to open the default mail application</a>
    );
  }

const ForgotPasswordSentSuccess = () => {
    const location = useLocation();
    const { email } = location.state;
    const navigate = useNavigate()
    const resendMail = async() => {
        try {
            if (email !== "") {
                const data = {
                    email: email
                }
                const response = await axios.put(`${proxy}/api/users/update/password/forgot`, data)
                alert("Email sent")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <Helmet>
        <title>DOrm den | Token sent</title>
        <meta name="description" content="Password reset token was sent sucessfully" />
    </Helmet>
        <NotificationBar />
        <Container>
            <FormContainer style={{width: "240px", gap: "24px"}}>
                <h1>Check your email</h1>
                <Subtitle style={{ marginTop: "-16px"}}>We have sent you an email with a link to {email}</Subtitle>
                <Button><a href={`mailto:${email}?subject=${"Check your mail"}&body=${"Reset Password Link was sent to you"}`}>Open email app</a></Button>
                <ResendMail>Didn't recieve the email? <ResendLink onClick={ resendMail }>Click to resend</ResendLink></ResendMail>
                <BackButton><Link to="/login"><IoArrowBackOutline />Back to log in</Link></BackButton>
            </FormContainer>
        </Container>
    </>
    
  )
}

export default ForgotPasswordSentSuccess