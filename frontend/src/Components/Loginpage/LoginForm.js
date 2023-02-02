import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import './LoginForm.css'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [ password, setPassword ] =useState('')

  return (
    <form onSubmit={ () => console.log() } className='login-form'>
        <h1>Login👋</h1>
        <div className='form__email'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' value={ email } onChange={ (e) => setEmail(e.target.value)}/>
        </div>
        <div className='form__password'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' value={ password } onChange={ (e) => setPassword(e.target.value) }/>
        </div>

        <div className='form__accessories'>
            <div className='form__accessories__remember'>
                <input type='checkbox' name='remember' id='remember' />
                <label htmlFor='remember'>Remember me</label>
            </div>
            <div className='form__accessories__forgot'>
                <Link to='/forgot-password'>Forgot password?</Link>
            </div>
        </div>

        <button className='login'>
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