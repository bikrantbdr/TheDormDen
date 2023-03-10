import React from 'react'
import { useContext } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Container, FormContainer, Button } from '../Components/LoginForm'
import { NotificationContext } from '../context/NotificationContext'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackOutline } from 'react-icons/io5'

import InputComponent from '../Components/InputComponent'
import NotificationBar from '../Components/NotificationBar'
import { Helmet } from "react-helmet";
import { proxy } from '../assets/proxy'

export const BackButton = styled.p`
    font-weight: bold;
    font-size: 0.9rem;
    
    &>a {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        color: #6e6e70;
        text-decoration: none;
    }
`

const ForgotPasswordPage = () => {
    const [values, setValues] = React.useState({
        email: ""
    })

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage:"Email Address cannot be empty",
            label: "Email",
            required: true
        }
    ]
    const navigate = useNavigate()
    const { dispatch } = useContext(NotificationContext);
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (values.email !== "") {
                const data = {
                    email: values.email
                }
                const response = await axios.put(`${proxy}/api/users/update/password/forgot`, data)
                dispatch({ type: "NOTIFICATION_START", payload: { message: "Reset token sent successfully!", status: "success" } })
                navigate("/forgotpassword/success", { state: { email: values.email } })
            }
        } catch (error) {
            dispatch({ type: "NOTIFICATION_START", payload: { message: "Email not found!", status: "error" } })
        }
    }
  return (
    <>
    <Helmet>
        <title>Dorm den | Forgot password</title>
        <meta name="description" content="Forogt you password? wory not you can easily reset you password via your registered email" />
    </Helmet>
        <NotificationBar />
        <Container>
            <FormContainer>
                {/* style={{width: "fit-content"}} */}
                <h1>Forgot Password?</h1>
                <p style={{margin: "0px 0px 20px 0px"}}>No worries, we'll send you reset instructions.</p>
                <InputComponent key={ inputs[0].id } { ...inputs[0] } value={ values[inputs[0].name] } onChange={ onChange } />
                <Button onClick={ handleSubmit }>Reset Password</Button>
                <BackButton><Link to="/login"><IoArrowBackOutline />Back to log in</Link></BackButton>
            </FormContainer>
        </Container>
    </>
  )
}

export default ForgotPasswordPage