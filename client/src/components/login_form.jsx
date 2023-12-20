import React from 'react'

const LoginForm = () => {
  return (
    <form action="" className="login-form">
        <input className="mb-3" type="text" name="username" id="username"  />
        <input className="mb-3" type="password" name="password" id="password" />
        <button className="mb-3" type="submit">Login</button>

        <div className="login-text mb-2">
           <div className="sub-text">don't have an account? Register.</div> 
           <div className="sub-text">Forgot password?</div> 
        </div>
    </form>
  )
}

export default LoginForm