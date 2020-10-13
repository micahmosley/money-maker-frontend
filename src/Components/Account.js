import React from 'react';


const Account = (props) => {

    return (
        <div >
            <h1>My Account</h1>
            <h3>Username: {props.username}</h3>
            <h3>Balance: {props.balance}</h3>
            <form onSubmit={props.editPassword}>
                <input type="password" placeholder="Password" name="password" /><br />
                <input type="submit" value="Edit Password" />
            </form>
            <button onClick={props.logout}>Logout</button>
            {props.passwordChange=== true ? <h3>Password change successful!</h3> : null}

        </div>
    )
}

export default Account