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
            <>
            <h1>Grade Lines</h1>
               <form onSubmit={this.gradeMatchup}>
                <label>Winner</label>
                <input name="winner"></input>
                <br/>
                <label>Score</label>
                <input name="winnerScore"></input>
                <br/>
                <label>Loser</label>
                <input name="loser"></input>
                <br/>
                <label>Score</label>
                <input name="loserScore"></input>
                <input type="submit" value="Grade Matchup" />
               </form>
                <br/>
               <h3 id="grade" className="hidden" text="green">Matchup Graded Successfully!</h3>
            </>
        )
    };


}

export default Grade;