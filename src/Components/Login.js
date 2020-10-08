import React from 'react';

const Login = (props) => {
  return (
    <div className="home-container">
      <div className="login">
        <h2 className="formTitle">Log In</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          props.userCreateOrLogin(e, "Log In")
        }}>
          <input placeholder="Username" name="username" /><br />
          <input type="password" placeholder="Password" name="password" /><br />
          <input type="submit" value="Log In" />
        </form>
      </div>
    </div>
  )
}

export default Login