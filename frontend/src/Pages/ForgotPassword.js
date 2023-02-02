import React, {useState} from 'react'
import SendMail from './../Components/ForgotPassword/SendMail';
import SentMail from './../Components/ForgotPassword/SentMail';

import './ForgotPassword.css'

function ForgotPassword() {
  return (
    <div class='forgot-password-container'>
      <SendMail />
      {/* <SentMail /> */}
    </div>
  )
}

export default ForgotPassword