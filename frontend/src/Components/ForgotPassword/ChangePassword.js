import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { reset_password_backend } from '../../services/user'

import './ChangePassword.css'
import Key from '../../images/key.svg'

function ChangePassword() {
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const { resetToken } = useParams();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            const option = {
                new_password: password
            }
            navigate('/login')
            const response = await reset_password_backend(option, resetToken)
        } else {
            alert('Password not match')
        }
    }

  return (
    <div className='change-password-container'>
        <img src={ Key } alt='send-mail' />
        <div className='change-password__title'>
            Set new password
        </div>
        <div className='change-password__subtitle'>
            Your new password must be different to<br />
            previously used passwords.
        </div>
        <div className='change-password__input'>
            <div className='form__password'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={ password } onChange={ (e) => setPassword(e.target.value) } />
            </div>
            <div className='form__change-password'>
                <label htmlFor='change-password'>Confirm Password</label>
                <input type='password' name='change-password' value={ confirmPassword } onChange={ (e) => setConfirmPassword(e.target.value)}/>
            </div>
        </div>
        <button className='change-password__reset-btn' onClick={ onSubmit }>Reset password</button>
        {/* add svg icon for back button */}
        <Link to='/login'>Back to log in</Link>
    </div>
  )
}

export default ChangePassword