import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import SentMail from './SentMail'
import { send_reset_password_email_backend } from '../../services/user'

import Key from '../../images/key.svg'
import './SendMail.css'

function SendMail() {
  const [ renderSendMail, setRenderSendMail ] = useState(true)
  const [ mailAddress, setMailAddress ] = useState('')
  
  const submitMail = async (e) => {
    e.preventDefault()

    if (mailAddress) {
      const response = await send_reset_password_email_backend({email: mailAddress})
      setRenderSendMail(false)
      console.log(response.data)
    } else {
      alert('Please enter your email address')
    }
  }

  return (
    <>
    { renderSendMail && <div className='send-mail-container'>
        <img src={ Key } alt='send-mail' />
        <div className='send-mail__title'>
            Forgot Password?
        </div>
        <div className='send-mail__subtitle'>
            No worries, we'll send you reset instruction
        </div>
        <div className='send-mail__input'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' value={ mailAddress } onChange={ (e) => setMailAddress(e.target.value) } required={true} placeholder='Enter your email' />
        </div>
        <button className='send-mail__reset-btn' onClick={ submitMail } >Reset password</button>
        {/* add svg icon for back button */}
        <Link to='/login'>Back to log in</Link>
    </div> }
    {!renderSendMail && (<SentMail />) }
    </>
  )
}

export default SendMail