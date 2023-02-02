import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';

import { loginUser_backend } from '../../services/user'

import './LoginForm.css'

const LoginForm = ({ cookies, setUserInfo }) => {
    const [username, setUsername] = useState('')
    const [ password, setPassword ] =useState('')

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!username || !password) {
            alert('Please fill all the fields')
        } else {
            const option = {
                username,
                password
            }
            const response = await loginUser_backend(option)
            if (response.data.token) {
                const decoded = await jwt(response.data.token)
                setUserInfo(decoded)
                cookies.set('jwt_token', response.data.token, { path: '/' })
                navigate('/')
            } else {
                alert(response.message)
            }
        }
    }

  return (
    <form onSubmit={ () => console.log() } className='login-form'>
        <h1>Login👋</h1>
        <div className='form__email'>
            <label htmlFor='email'>Username</label>
            <input type='text' name='email' id='email' value={ username } onChange={ (e) => setUsername(e.target.value)} required='true' />
        </div>
        <div className='form__password'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' value={ password } onChange={ (e) => setPassword(e.target.value) } required='true' />
        </div>

        <div className='form__accessories'>
            <div className='form__accessories__remember'>
                <input type='checkbox' name='remember' id='remember' />
                <label htmlFor='remember'>Remember me</label>
            </div>
            <div className='form__accessories__forgot'>
                <Link to='/forgot_password'>Forgot password?</Link>
            </div>
        </div>

        <button className='login' onClick={ onSubmit }>
            Login
        </button>

        <hr className='horizontal-line-login' />

        <div className='form__signup'>
            <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
        </div>
    </form>
  )
}

export default LoginForm