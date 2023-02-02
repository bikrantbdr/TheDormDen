import React from 'react'
import { Link } from 'react-router-dom'

import './ChangePassword.css'
import Key from '../../images/key.svg'

function ChangePassword() {
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
                <input type='password' name='password' />
            </div>
            <div className='form__change-password'>
                <label htmlFor='change-password'>Confirm Password</label>
                <input type='password' name='change-password' />
            </div>
        </div>
        <button className='change-password__reset-btn'>Reset password</button>
        {/* add svg icon for back button */}
        <Link to='/login'>Back to log in</Link>
    </div>
  )
}

export default ChangePassword