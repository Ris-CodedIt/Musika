import React from 'react'

const ForgotPasswordForm = () => {
  return (
    <form action="" className="forgot-password-form">
        <input className="mb-3" type="email" name="email" id="email"/>
        <button className="mb-3" type="submit">Reset</button>
    </form>
  )
}

export default ForgotPasswordForm