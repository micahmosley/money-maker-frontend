import React from 'react';


class SportUnavailable extends React.Component {

render(){
  return (
    <div className="unavailable">
        <h1>Sorry there are currently no lines for this sport.</h1>
        <img className="sad-face" src="./images/sad.jpg" alt="sad-face"/>
        <h1>Please try again at a later time.</h1>
    </div>
  )}
}

export default SportUnavailable