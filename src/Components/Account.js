import React from 'react';


const Account = (props) => {

    return (
        <div>
            <br />
            <div className="info-account">
                <h1 className="info-header">My Account</h1>
                <h3>Username: {props.username}</h3><br/>
                <h3>Balance: ${props.balance}</h3>
                <h1 className="info-header">Edit Password</h1><br/>
                <form onSubmit={props.editPassword}>
                    <input type="password" placeholder="Password" name="password" />
                    <input type="submit" value="Edit Password" />
                </form><br/>
                <h1 className="info-header">Logout</h1>
                <button onClick={props.logout}>Logout</button>
                {props.passwordChange === true ? <h3>Password change successful!</h3> : null}

            </div>
            <br />
        </div>
    )
}

export default Account