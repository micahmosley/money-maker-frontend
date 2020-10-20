import React from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Account from './Components/Account';
import Sport from './Components/Sport';
import Sports from './Containers/Sports';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rules from './Components/Rules';
import Cashier from './Components/Cashier';
import ShowBets from './Components/ShowBets';
import Grade from './Components/Grade';
import Unavailable from './Components/Unavailable';


class App extends React.Component {

  state = {
    userId: 0,
    balance: 0,
    username: "",
    passwordChange: false,
    currentData: [],
    currentSport: "",
    selectedLines: [],
    multiplier: 1,
    risk: 0,
    showLines: [],
    showBets: [],
    winnerLinesToGrade: [],
    loserLinesToGrade: [],
    showBetsType: "",
    error: "",
    showError:false,

  }

  hideError=()=>{
    this.setState({
      showError:false
    })
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
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
      this.setState({
        error:user.error,
        showError:true,
      })
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
    fetch(`https://api.the-odds-api.com/v3/odds/?apiKey=73b6f6a8bb620ed0f86db00d45b8341c&sport=${sport}&region=${region}&mkt=spreads`)
      .then(resp => resp.json())
      .then(data => {
        odds = data.data

        //get moneyline odds and combine them with the spread odds 
        fetch(`https://api.the-odds-api.com/v3/odds/?apiKey=73b6f6a8bb620ed0f86db00d45b8341c&sport=${sport}&region=${region}&mkt=h2h`)
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
  handleLineSelection = (e) => {
    if (e.target.getAttribute('select') === "false") {
      this.addToSelectedLines(e.target)
    } else {
      this.subtractFromSelectedLines(e.target, "fromSport")
    }
  }


  //Add bet selections to state to be passed to betslip
  addToSelectedLines = (selection) => {
    let lines = [...this.state.selectedLines]
    //check to see if current selection is from the same game as any of the other selections in Betslip if so do not add it
    let duplicates = lines.filter((line) => line.getAttribute('class') === selection.getAttribute('class'))
    if (duplicates.length === 0) {
      lines.push(selection)
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
    //Remove the selected line from the selectedLines array
    let lines = [...this.state.selectedLines]
    if (location === "fromSport") {
      //Un-highlight the clicked on line selection
      selection.setAttribute('select', "false")
      lines = lines.filter((line) => line.getAttribute('team') !== selection.getAttribute('team'))
    } else {
      lines = lines.filter((line) => line.getAttribute('team') !== selection.querySelector('div').innerText)
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
      if (line.getAttribute('type') === 'moneyline') {
        multiplier *= line.innerText
      } else {
        multiplier *= line.getAttribute('odds')
      }
    })
    this.setState({
      multiplier: multiplier
    })
  }

  makeDeposit = (amount) => {

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        deposit: parseInt(amount),
        userId: this.state.userId
      })
    }
    fetch(`http://localhost:3001/users/${this.state.userId}`, configObj)
      .then(resp => resp.json())
      .then(user => {
        this.setState({
          balance: user.balance
        })
      })
  }

  makeWithdraw = (amount) => {

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        withdraw: parseInt(amount),
        userId: this.state.userId
      })
    }
    fetch(`http://localhost:3001/users/${this.state.userId}`, configObj)
      .then(resp => resp.json())
      .then(user => {
        this.setState({
          balance: user.balance
        })
      })
  }

  setRisk = (risk) => {
    this.setState({
      risk: risk
    })
  }

  submitBets = () => {
    let lines = [...this.state.selectedLines]
    let length = lines.length
    let betType = "Single Bet"
    //Clear betslip and un-highlight any line selections
    lines.forEach((line) => {
      this.subtractFromSelectedLines(line, "fromSport")
    })
    this.setState({
      selectedLines: [],
      balance: this.state.balance - this.state.risk
    })

    if (length > 1) {
      betType = `${length} Team Parlay`
    }

    // For each line in bet slip on submission, create the line instance on backend if it doesnt already exist
    let configObj = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
      },
      body: JSON.stringify({
        user_id: this.state.userId,
        risk: this.state.risk,
        bet_type: betType,
        odds: this.state.multiplier,
        wins: this.state.risk * (this.state.multiplier - 1).toFixed(2)

      })
    }

    fetch(`http://localhost:3001/bets`, configObj)
      .then(resp => resp.json())
      .then(bet => {
        lines.forEach((line) => {
          let bodyHash
          if (line.getAttribute('type') === 'moneyline') {
            bodyHash = {
              bet_id: bet.id,
              team: line.getAttribute('team'),
              line_type: line.getAttribute('type'),
              odds: line.innerText,
              opponent: line.getAttribute('opponent')
            }
          } else {
            bodyHash = {
              bet_id: bet.id,
              team: line.getAttribute('team'),
              line_type: line.getAttribute('type'),
              odds: line.getAttribute('odds'),
              opponent: line.getAttribute('opponent'),
              spread: line.getAttribute('spread')

            }
          }
          let obj = {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000"
            },
            body: JSON.stringify(bodyHash)
          }
          fetch(`http://localhost:3001/lines`, obj)

        })
      })


  }

  getPlacedBets = (type) => {
    let endpoint
    if (type === "Pending") {
      endpoint = "pending_bets"
    } else {
      endpoint = "past_bets"
    }
    fetch(`http://localhost:3001/users/${this.state.userId}/${endpoint}`)
      .then(resp => resp.json())
      .then(bets => {
        this.setState({
          showBets: bets,
          showBetsType: type,
        })
      })
  }

  getBetLines = (betId) => {
    //Get lines associated with this bet instance
    fetch(`http://localhost:3001/bets/${betId}/lines`)
      .then(resp => resp.json())
      .then(lines => {
        this.setState({
          showLines: lines
        })
      })
  }

  //For Administrator only to grade lines and bets
  gradeLines = (matchup) => {

    //Get winning margin
    let winningMargin = parseInt(matchup.winnerScore.value) - parseInt(matchup.loserScore.value)
    fetch(`http://localhost:3001/lines/specific_team/${matchup.winner.value}`)
      .then(resp => resp.json())
      .then(data => {
        //Grade winning team's lines
        let lines = [...data]
        lines.forEach((line) => {
          if (line.result === "pending") {
            if (line.line_type === "moneyline") {
              line.result = "won"
              //If line_type is spread
            } else {
              let spread = line.spread
              if (spread >= 0) {
                line.result = "won"
              } else if (spread < 0 && Math.abs(spread) > winningMargin) {
                line.result = "lost"
              } else if (spread < 0 && Math.abs(spread) < winningMargin) {
                line.result = "won"
              } else {
                line.result = "push"
              }
            }
            let configObj = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                result: line.result
              })
            }
            //Update line on backend with new result then grade bets if applicable
            fetch(`http://localhost:3001/lines/${line.id}`, configObj)
              .then(resp => resp.json())
              .then(data => {
                data.bets.forEach((bet) => {
                  //Need to slow this down
                  this.gradeBets(data.line, bet)
                })
              })
          }
        })
      })
        //Grade losing team's lines
        fetch(`http://localhost:3001/lines/specific_team/${matchup.loser.value}`)
          .then(resp => resp.json())
          .then(loserLines => {
            loserLines.forEach((line) => {
              if (line.result === "pending") {
                if (line.line_type === "moneyline") {
                  line.result = "lost"

                  //If line_type is spread
                } else {
                  let spread = line.spread
                  if (spread <= 0) {
                    line.result = "lost"
                  } else if (spread > 0 && spread > winningMargin) {
                    line.result = "won"
                  } else if (spread > 0 && spread < winningMargin) {
                    line.result = "lost"
                  } else {
                    line.result = "push"
                  }
                }
                let obj = {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  body: JSON.stringify({
                    result: line.result
                  })
                }
                //Update line on backend with new result
                fetch(`http://localhost:3001/lines/${line.id}`, obj)
                  .then(resp => resp.json())
                  .then(data => {
                    data.bets.forEach((bet) => {
                      this.gradeBets(data.line, bet)
                    })
                  })
                }
              })
          
          })
  
}

gradeBets = async (line, bet) => {
  let wonAmount = 0
  if (line.result === "won") {
    bet.legs_left -= 1
    bet.atleast_one_winner = "true"
    if (bet.legs_left === 0) {
      bet.result = "won"
      wonAmount = bet.risk + bet.wins
    }
  } else if (line.result === "push") {
    bet.legs_left -= 1
    //If the only line left in a bet is a spread that pushes then check to see if there is any leg of bet that has won
    if (bet.legs_left === 0) {
      //If there is atleast one winning line in the bet
      if (bet.atleast_one_winner === "true") {
        bet.current_odds = bet.current_odds / line.odds
        bet.result = "won"
        bet.wins = (bet.current_odds - 1) * bet.risk
        wonAmount = bet.risk + bet.wins
        //If there have been no winners and only pushes
      } else {
        bet.result = "push"
        wonAmount = bet.risk
      }
      //If there are still more lines left to be settled
    } else {
      bet.atleast_one_push="true"
      bet.current_odds = bet.current_odds / line.odds
      bet.wins = (bet.current_odds - 1) * bet.risk
    }
    //If bet is a loss
  } else {
    bet.result = "lost"
    wonAmount = 0
  }

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      result: bet.result,
      legs_left: bet.legs_left,
      return: wonAmount,
      wins: bet.wins,
      atleast_one_winner: bet.atleast_one_winner,
      odds: bet.odds,
      current_odds: bet.current_odds,
      atleast_one_push: bet.atleast_one_push

    })
  }
  //Wait for each bet to be updated on backend before returning to process next bet
  await fetch(`http://localhost:3001/bets/${bet.id}`, configObj)
}

setLoadingScreen=()=>{
  console.log('entered')
  this.setState({
    currentData:[]
  })
}


render() {
  // document.body.style = 'background: gray;';
  return (
    <React.Fragment>
      <Router>
        <Navigation setLoadingScreen={this.setLoadingScreen} userCreateOrLogin={this.userCreateOrLogin} getPlacedBets={this.getPlacedBets} username={this.state.username} balance={this.state.balance} logout={this.logout} userId={this.state.userId} />
        <Switch>
          <div className="main">
            <Route exact path="/" render={(props) => (
              <Home error={this.state.error} showError={this.state.showError} hideError={this.hideError}/>
            )} />
            <Route exact path="/account" render={(props) => (
              this.state.userId!==0 ? <Account logout={this.logout} passwordChange={this.state.passwordChange} editPassword={this.editPassword} balance={this.state.balance} username={this.state.username} /> :
              <Home error={this.state.error} showError={this.state.showError} hideError={this.hideError}/>
            )} />
          
            <Route exact path="/sports" render={(props) => (
              this.state.userId!==0 ? <Sports getSportOdds={this.getSportOdds} /> :
              <Home error={this.state.error} showError={this.state.showError} hideError={this.hideError}/>
            )} />
            <Route exact path="/sport" render={(props) => (
              this.state.userId!==0 ? <Sport balance={this.state.balance} risk={this.state.risk} setRisk={this.setRisk} submitBets={this.submitBets} subtractFromSelectedLines={this.subtractFromSelectedLines} handleLineSelection={this.handleLineSelection} selectedLines={this.state.selectedLines} multiplier={this.state.multiplier} currentSport={this.state.currentSport} currentData={this.state.currentData} /> :
              <Home error={this.state.error} showError={this.state.showError} hideError={this.hideError}/>
            )} />
            <Route exact path="/rules" component={Rules} />
            <Route exact path="/cashier" render={(props) => (
              this.state.userId!==0 ? <Cashier userId={this.state.userId} makeWithdraw={this.makeWithdraw} makeDeposit={this.makeDeposit} balance={this.state.balance} /> :
              <Home error={this.state.error} showError={this.state.showError} hideError={this.hideError}/>
            )} />
            <Route exact path="/showBets" render={(props) => (
              this.state.userId!==0 ? <ShowBets showBetsType={this.state.showBetsType} getBetLines={this.getBetLines} showLines={this.state.showLines} showBets={this.state.showBets} /> :
              <Home error={this.state.error} showError={this.state.showError} hideError={this.hideError}/>
            )} />
            <Route exact path="/grade" render={(props) => (
              this.state.userId!==0 ? <Grade gradeLines={this.gradeLines} /> :
              <Home error={this.state.error} showError={this.state.showError} hideError={this.hideError}/>
            )} />
            <Route exact path="/unavailable" render={(props) => (
              this.state.userId!==0 ? <Unavailable  /> :
              <Home error={this.state.error} showError={this.state.showError} hideError={this.hideError}/>
            )} />
          </div>
        </Switch>
      </Router>
    </React.Fragment>
  );
}
}

export default App;
