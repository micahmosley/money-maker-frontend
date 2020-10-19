import React from 'react';

const Home = (props) => (
  <div className="rules">
   <h1>Sports Betting Rules</h1>
   <br/>
   <br/>
   <h2>General</h2>
   <p>The max allowable bet is one where the amount won is $1000.</p>
   <br/>
   <h2>Football</h2>
   <p>Games do not have to go full regulation play for wagers to have action.</p>
   <p>All wagers placed on the full game include overtime.</p>
   <br/>
   <h2>Basketball</h2>
   <p>All wagers placed on the full game include overtime.</p>
   <br/>
   <h2>Baseball</h2>
   <p>Moneyline wagers are official after 5 innings of play (4.5 innings if the home team is winning).</p>
   <p>Runline wagers are official after 9 innings of play (8.5 innings if the home team is winning). If a game is called before 9 innings have been played, runline wagers are settled as 'No Action'.</p>
   <br/>
   <h2>Soccer</h2>
   <p>All soccer matches are based on results at the end of 90 minutes of play, unless otherwise stated. This includes any added injury or stoppage time. However, it does not include extra time, time allocated for a penalty shootout or a golden goal.</p>
   
  </div>
)

export default Home