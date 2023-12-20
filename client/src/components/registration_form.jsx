import React from 'react'

const RegistrationForm = () => {
  return (
    <form action="" className="registration-form">
        <input className="mb-3" type="text" name="first_name" id="first_name"  />
        <input className="mb-3" type="text" name="last_name" id="last_name"  />
        <input className="mb-3" type="text" name="username" id="username"  />
        <input className="mb-3" type="email" name="email" id="email"  />
        <input className="mb-3" type="password" name="password" id="password"  />
        <input className="mb-3" type="password" name="confirm_password" id="confirm_password"/>
        <button className="mb-3" type="submit">Register</button>

        <div className="registration-text mb-2">
            already have an account? login
        </div>
    </form>
  )
}

export default RegistrationForm