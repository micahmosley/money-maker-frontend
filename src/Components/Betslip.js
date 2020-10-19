import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
class Betslip extends React.Component {

    updateWin = (e) => {
        //Update win amount in betslip
        document.querySelector('#win').value = (e.target.value * (this.props.multiplier-1)).toFixed(2)
        //Update risk state in app.js
        this.props.setRisk(e.target.value)
    }

    updateRisk = (e) => {
        document.querySelector('#risk').value = (e.target.value / (this.props.multiplier-1)).toFixed(2)
        this.props.setRisk((e.target.value / (this.props.multiplier-1)).toFixed(2))
    }

    render() {
        return (
            <Container>
                {this.props.selectedLines.length === 0 ? <h1>Add Selections to Betslip</h1> :
                    <div>
                        <Row className="odd-row">

                            {this.props.selectedLines.length === 1 ? <Col className="col">Single Bet</Col>
                                : <Col className="col">{this.props.selectedLines.length} Team Parlay</Col>}
                        </Row>

                        {this.props.selectedLines.map((line) => {
                            return (
                                <Row className="odd-row">
                                    <Col lg={5} className="betslip-col">{line.getAttribute('team')}</Col>
                                    <Col lg={3} className="betslip-col">{line.getAttribute('type')}</Col>
                                    <Col lg={3} className="betslip-col">{line.innerText}</Col>
                                    <Col lg={1} className="betslip-col"><button onClick={(e) => {line.setAttribute('select', 'false')
                                        document.querySelector('#risk').value=""
                                        document.querySelector('#win').value=""
                                        this.props.subtractFromSelectedLines(e.target.parentElement.parentElement, "fromBetslip") }}>x</button></Col>
                                </Row>)
                        })}


                        <Row className="odd-row">
                            <Col className="col">Risk: ({(this.props.multiplier.toFixed(2))})<input onChange={this.updateWin} type="text" id="risk" /></Col>
                            <Col className="col">Wins:<input onChange={this.updateRisk} type="text" id="win" /></Col>
                        </Row> </div>}

            </Container>

        )
    };


}

export default Betslip;