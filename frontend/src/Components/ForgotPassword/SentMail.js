import React from 'react'
import Mail from '../../images/mail.svg'
import { Link } from 'react-router-dom'

import './SentMail.css'

function SentMail() {
  return (
    <div className='sent-mail-container'>
        <img src={ Mail } alt='send-mail' />
        <div className='sent-mail__title'>
            Forgot Password?
        </div>
        <div className='sent-mail__to'>
            We've sent a password reset link to<br />
            {/* need to have here useState hook for dynamic mail */}
            pong32btl@gmail.com
        </div>
        <button className='sent-mail__open-mail'>Open email app</button>
        <div className='sent-mail_didnt-receive'>Didn't recieve the mail? <span>Click to resend</span></div>
        {/* add svg icon for back button */}
        <Link to='/login'>Back to log in</Link>
    </div>
  )
}

export default SentMail