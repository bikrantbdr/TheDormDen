import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import SentMail from './SentMail'

import Key from '../../images/key.svg'
import './SendMail.css'

function SendMail() {
  const [ renderSendMail, setRenderSendMail ] = useState(true)
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
            <input type='email' name='email' placeholder='Enter your email' />
        </div>
        <button className='send-mail__reset-btn' onClick={() => setRenderSendMail(false) } >Reset password</button>
        {/* add svg icon for back button */}
        <Link to='/login'>Back to log in</Link>
    </div> }
    {!renderSendMail && (<SentMail />) }
    </>
  )
}

export default SendMail