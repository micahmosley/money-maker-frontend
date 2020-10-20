import React from 'react';

class Grade extends React.Component {

    gradeMatchup=(e)=>{
        e.preventDefault()
        this.props.gradeLines(e.target)
        let grade= document.querySelector('#grade')
        //Show success message
        grade.setAttribute('class', "show")
        //Empty all grading inputs
        e.target.winner.value=""
        e.target.loser.value=""
        e.target.winnerScore.value=""
        e.target.loserScore.value=""
        //Hide success message
        setTimeout(()=>{
            grade.setAttribute('class', "hidden")
        }, 1500)
    }
    

    render() {
        return (
            <div>
            <br/>
            <div className="info-account">
            <h1 className="info-header">Grade Lines</h1><br/><br/>
               <form onSubmit={this.gradeMatchup}>
                <h3 className="info-header">Winner</h3><br/>
                <input name="winner"></input>
                <br/><br/>
                <h3 className="info-header">Winner Score</h3><br/>
                <input name="winnerScore"></input>
                <br/><br/>
                <h3 className="info-header">Loser</h3><br/>
                <input name="loser"></input>
                <br/><br/>
                <h3 className="info-header">Loser Score</h3><br/>
                <input name="loserScore"></input><br/><br/>
                <input type="submit" value="Grade Matchup" />
               </form>
                <br/>
               <h3 id="grade" className="hidden" text="green">Matchup Graded Successfully!</h3>
               </div>
               </div>
            
        )
    };


}

export default Grade;