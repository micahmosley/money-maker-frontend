import React from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Account from './Components/Account';
import Sport from './Components/Sport';
import Sports from './Containers/Sports';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {

  state = {
    userId: 0,
    balance: 0,
    username: "",
    passwordChange: false,
    currentData: [],
    betCounter: 0,
    currentSport: "",
    selectedLines: [],
    multiplier: 1,

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
      .then(user => this.signUpLoginResponse(user))
  }

  signUpLoginResponse = (user) => {
    /*If the login/signup was unsuccessful*/
    if (user.error) {





    } else {
      this.setState({
        userId: user.id,
        balance: user.balance,
        username: user.username
      })
    }
  }

  editPassword = (e) => {
    e.preventDefault()
    let password = e.target.password.value
    e.target.password.value = ''
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        password: password,
        userId: this.state.userId
      })
    }
    fetch(`http://localhost:3001/users/${this.state.userId}`, configObj)
      .then(resp => resp.json())
      .then(user => {
        this.setState({
          passwordChange: true
        })
        setTimeout(() => {
          this.setState({
            passwordChange: false
          })
        }, 1500)
      })
  }

  logout = () => {
    this.setState({
      userId: 0
    })
  }

  getSportOdds = (sport, region, league) => {

    let odds = []
    // get spread odds
    fetch(`https://api.the-odds-api.com/v3/odds/?apiKey=a4fac94d5002d00c1e909c3aef0b09bd&sport=${sport}&region=${region}&mkt=spreads&dateFormat=iso`)
      .then(resp => resp.json())
      .then(data => {
        odds = data.data

        //get moneyline odds and combine them with the spread odds 
        fetch(`https://api.the-odds-api.com/v3/odds/?apiKey=a4fac94d5002d00c1e909c3aef0b09bd&sport=${sport}&region=${region}&mkt=h2h&dateFormat=iso`)
          .then(resp => resp.json())
          .then(data => {
            data.data.forEach((game) => {
              odds.forEach((matchup) => {
                if (matchup.home_team === game.home_team) {
                  matchup.moneyline = game.sites[0].odds.h2h

                }
              })
            })
            
            setTimeout(() => {
              this.setState({
                currentData: odds,
                currentSport: league
              })
            }, 100)
          })



      })


  }

  //handle a line selection from the sport page
  handleLineSelection=(e)=>{
    if (e.target.getAttribute('select')==="false"){
        this.addToSelectedLines(e.target)
    }else {
        this.subtractFromSelectedLines(e.target, "fromSport")
    }
}


  //Add bet selections to state to be passed to betslip
  addToSelectedLines = (selection) => {
    console.log(selection)
    let lines = [...this.state.selectedLines]
    //check to see if current selection is from the same game as any of the other selections in Betslip if so do not add it
    let duplicates = lines.filter((line) => line.home_team === selection.getAttribute('class'))
    if (duplicates.length === 0) {
      lines.push({ team: selection.getAttribute('team'), type: selection.getAttribute('type'), odds: selection.innerText, home_team: selection.getAttribute('class') })
      this.setState({
        selectedLines: lines
      })
      //Light up line selection red
      selection.setAttribute('select', "true")
      //Update the multipler
      this.currentMultiplier(lines)
    }

  }

  subtractFromSelectedLines = (selection, location) => {
    console.log(selection)
    //Un-highlight the clicked on line selection
    selection.setAttribute('select', "false")
    //Remove the selected line from the selectedLines array
    let lines = [...this.state.selectedLines]
    if (location==="fromSport"){
      lines = lines.filter((line) => line.team !== selection.getAttribute('team'))
    } else {
      console.log(selection.querySelector('div').innerText)
      lines = lines.filter((line) => line.team !== selection.querySelector('div').innerText)
    }
    
    this.setState({
      selectedLines: lines
    })
    //Update the multipler
    this.currentMultiplier(lines)
  }

  currentMultiplier = (lines) => {
    let multiplier = 1
    lines.forEach((line) => {
      if (line.type === 'moneyline') {
        multiplier *= line.odds
      } else {
        multiplier *= line.odds.split(" ")[1]
      }
    })
    this.setState({
      multiplier: multiplier
    })
  }



  render() {
    return (
      <React.Fragment>
        <Router>
          <Navigation logout={this.logout} userId={this.state.userId} />
          <Switch>
            <div className="main">
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" render={(props) => (
                <SignUp userCreateOrLogin={this.userCreateOrLogin} />
              )} />
              <Route exact path="/login" render={(props) => (
                <Login userCreateOrLogin={this.userCreateOrLogin} />
              )} />
              <Route exact path="/account" render={(props) => (
                <Account logout={this.logout} passwordChange={this.state.passwordChange} editPassword={this.editPassword} balance={this.state.balance} username={this.state.username} />
              )} />
              <Route exact path="/menu" render={(props) => (this.state.userId === 0 ?
                <Login userCreateOrLogin={this.userCreateOrLogin} /> :
                null
              )} />
              <Route exact path="/sports" render={(props) => (
                <Sports getSportOdds={this.getSportOdds} />
              )} />
              <Route exact path="/sport" render={(props) => (
                <Sport subtractFromSelectedLines={this.subtractFromSelectedLines} handleLineSelection={this.handleLineSelection} selectedLines={this.state.selectedLines} multiplier={this.state.multiplier} currentSport={this.state.currentSport} currentData={this.state.currentData} betCounter={this.state.betCounter} />

              )} />
            </div>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
