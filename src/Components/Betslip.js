import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
class Betslip extends React.Component {

    updateWin = (e) => {
        document.querySelector('#win').value = (e.target.value * this.props.multiplier).toFixed(2)
    }

    updateRisk = (e) => {
        document.querySelector('#risk').value = (e.target.value / this.props.multiplier).toFixed(2)
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
                                    <Col className="col">{line.team}</Col>
                                    <Col className="col">{line.type}</Col>
                                    <Col className="col">{line.odds}</Col>
                                    <Col className="col"><button onClick={(e) => { this.props.subtractFromSelectedLines(e.target.parentElement.parentElement, "fromBetslip") }}>X</button></Col>
                                </Row>)
                        })}


                        <Row className="odd-row">
                            <Col className="col">Risk: (+{(this.props.multiplier * 100).toFixed(0)})<input onChange={this.updateWin} type="text" id="risk" /></Col>
                            <Col className="col">Win:<input onChange={this.updateRisk} type="text" id="win" /></Col>
                        </Row> </div>}

            </Container>

        )
    };


}

export default Betslip;