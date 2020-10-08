import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import SignUp from './Components/SignUp';
import Login from './Components/Login';

class App extends React.Component {

  state={userId: 0,
  
  }

  userCreateOrLogin = (e, type) => {
    let endpoint = ""
    if (type === "Sign Up") {
      endpoint = 'users'
    } else if (type === "Log In") {
      endpoint = 'login'
    }
    let username = e.target.username.value
    let password = e.target.password.value
    e.target.username.value = ''
    e.target.password.value = ''
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }
    fetch(`http://localhost:3001/${endpoint}`, configObj)
      .then(resp => resp.json())
      .then(user => this.userResponse(user))
  }




  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar userId={this.state.userId}/>
          <Switch>
            <div className="grid-container">
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/account" />
              <Route exact path="/menu" />
            </div>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
