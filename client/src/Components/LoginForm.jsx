import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { proxy } from '../assets/proxy';

import InputComponent from './InputComponent';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';

export const Container = styled.div`
    margin-top: 74px;
    width: 100%;
    display: flex;
    justify-content: center;
`

export const FormContainer = styled.form`
    width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    &>a {
        font-weight: bold;
        color: #b7bac6;
        font-size: 0.75rem;
        text-decoration: none;
    }
    &>p {
        font-weight: bold;
        color: #6e6e70;
        font-size: 0.9rem;
    }
`

export const Button = styled.button`
    width: 100%;
    font-weight: bold;
    padding: 8px 12px;
    border-radius: 4px;
    letter-spacing: 0.05rem;
    color: #fff;
    background-color: #d179ff;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

    &>a {
        text-decoration: none;
        color: #fff;
    }
`

const RegistrationButtonLink = styled(Link)`
    display: flex;
    justify-content: center;
    
    width: 100%;    
    letter-spacing: 0.05rem;
    padding: 8px 12px;
    border-radius: 4px;
    background-color: #fff;
    border: 1.5px solid #c5bec6;
    cursor: pointer;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
`

const LoginForm = () => {
    console.log(proxy)
    const [values, setValues] = useState({
        username: "",
        password: ""
    })

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage:"Username cannot be empty",
            label: "Username",
            required: true
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:"Password cannot be empty",
            label: "Password",
            required: true
        }
    ]

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const { loading, error, dispatch } = useContext(AuthContext)
    const { dispatch: notificationDispatch } = useContext(NotificationContext)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const response = await axios.post(`${proxy}/api/users/login`, values)
            const userObject = {
                username: response.data.username,
                user_id: response.data.id,
                token: response.data.token
            }
            dispatch({ type: "LOGIN_SUCCESS", payload: userObject })
            navigate("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
            notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: `${error.response.data.error}`, status: "error" } })
        }
    }

  return (
    <Container>
        <FormContainer>
            <h1>Sign in</h1>
            <InputComponent key={ inputs[0].id } { ...inputs[0] } value={ values[inputs[0].name] } onChange={ onChange } />
            <InputComponent key={ inputs[1].id } { ...inputs[1] } value={ values[inputs[1].name] } onChange={ onChange } />
            <Button onClick={ handleSubmit } disabled={loading || (values.username ==='' && values.password ==='') }>Login</Button>
            <Link to="/forgotpassword">Forgot your password?</Link>
            <p>Don't have an account?</p>
            <RegistrationButtonLink to="/register/user" style={{color: "#6e6e70", fontWeight: 'bold', fontSize: '0.9rem'}}>Create new account</RegistrationButtonLink>
        </FormContainer>
    </Container>
  )
}

export default LoginForm