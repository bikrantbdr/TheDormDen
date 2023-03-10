import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, FormContainer, Button } from '../Components/LoginForm'
import NotificationBar from './NotificationBar'
import { NotificationContext } from '../context/NotificationContext'
import { BackButton } from '../Pages/ForgotPasswordPage'
import InputComponent from '../Components/InputComponent'
import { IoArrowBackOutline } from 'react-icons/io5'
import { proxy } from '../assets/proxy'

const SetNewPassword = () => {
    const { tokenId } = useParams()
    const [values, setValues] = React.useState({
        password: "",
        confirmPassword: ""
    })

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const inputs = [
        {
            id: 1,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:"Password field cannot be empty",
            label: "Password",
            required: true
        },
        {
            id: 2,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage:"Confirm Password field cannot be empty",
            label: "Confirm Password",
            required: true
        }
    ]

    const navigate = useNavigate()
    const { dispatch } = useContext(NotificationContext);
    const handlePasswordReset = async (e) => {
        e.preventDefault()
        if (values.password !== values.confirmPassword) {
            dispatch({ type: "NOTIFICATION_START", payload: { message: "Passwords do not match!", status: "error" } })
            return
        }
        try {
            if (values.password !== "" && values.confirmPassword !== "") {
                const data = {
                    new_password: values.password
                }
                const response = await axios.put(`${proxy}/api/users/update/password/reset/${tokenId}`, data)
                dispatch({ type: "NOTIFICATION_START", payload: { message: "Password was successfully reset!", status: "success" } })
                navigate("/login")
            }
        } catch (error) {
            dispatch({ type: "NOTIFICATION_START", payload: { message: "Password reset failed. Please try again later.", status: "error" } })
        }
    }

  return (
    <>
        <NotificationBar />
        <Container>
            <FormContainer>
                <h1>Set New Password</h1>
                <p>Your new password must be different to previously used password</p>
                <InputComponent key={ inputs[0].id } { ...inputs[0] } value={ values[inputs[0].name] } onChange={ onChange } />
                <InputComponent key={ inputs[1].id } { ...inputs[1] } value={ values[inputs[1].name] } onChange={ onChange } />
                <Button onClick={ handlePasswordReset }>Reset Password</Button>
                <BackButton><Link to="/login"><IoArrowBackOutline />Back to log in</Link></BackButton>
            </FormContainer>
        </Container>
    </>
  )
}

export default SetNewPassword