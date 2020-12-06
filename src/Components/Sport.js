import React from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import Line from './Line.js'
import Betslip from './Betslip.js'
import { Circle } from 'react-awesome-spinners'
import Unavailable from './Unavailable.js'

class Sport extends React.Component {

    state = {
        show: false,
        insufficient: false,
        exceedMax: false,
        showSuccess: false,

    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

     handleBetslip = (e) => {
        //If the wager risk is not greater than the user's balance, close modal and submit bets 
        if (this.props.balance >= this.props.risk) {
            this.setState({
                insufficient: false
            })
            //If the wager risk causes win amount to be greater than max
            if (Math.floor(this.props.risk * (this.props.multiplier - 1)) > 1000) {

                this.setState({
                    exceedMax: true
                })
                //If the user's balance is sufficient and the risk is not above the max amount
            } else {
                this.setState({
                    exceedMax: false,
                    showSuccess: true,
                })
                //call submitBets function in app.js
                this.props.submitBets()
                setTimeout(() => {
                    //Close modal containing betslip component after 1 seconds
                    this.handleClose()
                    this.setState({
                        showSuccess: false
                    })
                }, 1500)


            }

        } else {
            this.setState({
                insufficient: true
            })
        }



    }

    maxBet = () => {
        //Set value of risk input in betslip to the max allowable
        document.querySelector('#risk').value = (1000 / (this.props.multiplier - 1)).toFixed(2)
        //Set max risk to risk state in app.js
        this.props.setRisk((1000 / (this.props.multiplier - 1)).toFixed(2))
        //Set the value of win input in betslip to max allowable
        document.querySelector('#win').value = 1000
    }



    render() {
        return (
            <>
            {/* until currentData is fully loaded show a loading spinner */}
            {this.props.sportUnavailable===true ? <Unavailable /> : 
            this.props.currentData.length===0 ? <div><Circle/><Circle/> <Circle/> <Circle/></div>  : 
            <div>
                <Container>
                    <Row className="odd-row">
                        <Col id="sport-name" className="col" lg={10}>{this.props.currentSport}</Col>
                        <Col className="col" lg={2}><Button buttontype="line" variant="secondary" onClick={this.handleShow}>Betslip: {this.props.selectedLines.length}</Button></Col>
                    </Row>
                    {this.props.currentData.map((game) => <Line key={game.home_team} game={game} handleLineSelection={this.props.handleLineSelection} />)}
                </Container>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Betslip</Modal.Title>
                    </Modal.Header>
                    {this.state.showSuccess === false ?
                        <Modal.Body>
                            <Betslip setRisk={this.props.setRisk} subtractFromSelectedLines={this.props.subtractFromSelectedLines} multiplier={this.props.multiplier} selectedLines={this.props.selectedLines} />
                            {this.props.selectedLines.length!==0 ?
                            <Button variant="dark" onClick={this.maxBet}>
                                Max Bet
                            </Button> : null}
                            {this.state.insufficient === true ? <h3 id="insufficient">Insufficient Funds</h3> : null}
                            {this.state.exceedMax === true ? <h3 id="exceedsMax">Risk exceeds max allowable bet</h3> : null}
                        </Modal.Body> :
                        <Modal.Body>
                            <h1 text="green">Bet was successfully placed!</h1>
                        </Modal.Body> }
                        <Modal.Footer>
                            {this.props.selectedLines.length!==0 ? 
                            <Button variant="danger" onClick={this.handleBetslip}>
                                Submit Betslip
                            </Button> : null}
                        </Modal.Footer>
                </Modal>
                </div>}
            </>


        )
    };


}

export default Sport;