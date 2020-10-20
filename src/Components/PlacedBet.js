import React from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap'
class PlacedBet extends React.Component {

    state = {
        show: false,
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

    //Shows modal with more details about a particular bet and begins fetch to acquire lines involved in bet
    seeMore = () => {
        this.handleShow()
        this.props.getBetLines(this.props.bet.id)
    }


    render() {
        return (
            <>

                <Row  className="odd-row" onClick={this.seeMore}>
                    {this.props.bet.result==="won" ? 
                    <>
                    <Col lg={2} text="green" className="col">{this.props.bet.result}</Col> 
                    <Col lg={6} text="green" className="col">{`${new Date(this.props.bet.created_at)}`} <br/> {this.props.bet.bet_type}</Col>
                    <Col lg={4} text="green" className="col">risk: ${this.props.bet.risk} To Win: ${this.props.bet.wins}</Col> </> :
                    this.props.bet.result==="lost" ? 
                    <>
                    <Col lg={2} text="red" className="col">{this.props.bet.result}</Col> 
                    <Col lg={6} text="red" className="col">{`${new Date(this.props.bet.created_at)}`} <br/> {this.props.bet.bet_type}</Col>
                    <Col lg={4} text="red" className="col">risk: ${this.props.bet.risk} To Win: ${this.props.bet.wins}</Col> </>:
                    this.props.bet.result==="push" ?
                    <>
                    <Col lg={2} text="orange" className="col">{this.props.bet.result}</Col> 
                    <Col lg={6} text="orange" className="col">{`${new Date(this.props.bet.created_at)}`} <br/> {this.props.bet.bet_type}</Col>
                    <Col lg={4} text="orange" className="col">risk: ${this.props.bet.risk} To Win: ${this.props.bet.wins}</Col> </>:
                    <>
                    <Col lg={2} text="pending" className="col">{this.props.bet.result}</Col> 
                    <Col lg={6} text="pending" className="col">{`${new Date(this.props.bet.created_at)}`} <br/> {this.props.bet.bet_type}</Col>
                    <Col lg={4} text="pending" className="col">risk: ${this.props.bet.risk} To Win: ${this.props.bet.wins}</Col> </>}
                </Row>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.bet.bet_type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row >
                                <Col lg={5} >Reference Number</Col>
                                <Col lg={7} >{this.props.bet.id}</Col>
                            </Row>
                            <Row >
                                <Col lg={5} >Placed</Col>
                                <Col lg={7} >{`${new Date(this.props.bet.created_at)}`}</Col>
                            </Row>
                            <Row >
                                <Col lg={5} >Bet Type</Col>
                                <Col lg={7} >{this.props.bet.bet_type}</Col>
                            </Row>
                            <Row >
                                <Col lg={5} >Status</Col>
                                <Col lg={7} >{this.props.bet.result}</Col>
                            </Row>
                            <Row >
                                <Col lg={5} >Odds</Col>
                                <Col lg={7} >{this.props.bet.odds.toFixed(2)}</Col>
                            </Row>
                            {this.props.bet.atleast_one_push==="true" ? 
                            <Row >
                                <Col lg={5} >Current Odds</Col>
                                <Col lg={7} >{this.props.bet.current_odds.toFixed(2)}</Col>
                            </Row> : null }
                            <Row >
                                <Col lg={5} >Risk</Col>
                                <Col lg={7} >${this.props.bet.risk}</Col>
                            </Row>
                            <Row >
                                <Col lg={5} >To Win</Col>
                                <Col lg={7} >${this.props.bet.wins}</Col>
                            </Row>
                            {this.props.bet.result==="lost" ?
                            <Row >
                                <Col lg={5} >Returned</Col>
                                <Col lg={7} >$0</Col>
                            </Row> 
                            : this.props.bet.result==="won" ?
                            <Row >
                                <Col lg={5} >Returned</Col>
                                <Col lg={7} >${this.props.bet.wins+this.props.bet.risk}</Col>
                            </Row>  
                            : this.props.bet.result==="push" ?
                            <Row >
                                <Col lg={5} >Returned</Col>
                                <Col lg={7} >${this.props.bet.risk}</Col>
                            </Row>  
                            :null}
    
                            <br />
                            <br />
                            <Row className="odd-row">
                                <Col lg={3} className="col">Result</Col>
                                <Col lg={3} className="col">Selection</Col>
                                <Col lg={6} className="col">Matchup</Col>
                            </Row>
                            {this.props.showLines.map((line) => <Row className="odd-row">
                                {line.result==="won" ? 
                                <>
                                <Col lg={3} text="green" className="col">{line.result}</Col>
                                <Col lg={3} text="green" className="col">{line.team} <br/>{line.spread ? line.spread : null} ({line.odds})</Col>
                                <Col lg={6} text="green"className="col">{line.team} v {line.opponent}</Col>
                                </> : 
                                line.result==="lost" ? 
                                <>
                                <Col lg={3} text="red" className="col">{line.result}</Col>
                                <Col lg={3} text="red" className="col">{line.team} <br/>{line.spread ? line.spread : null} ({line.odds})</Col>
                                <Col lg={6} text="red"className="col">{line.team} v {line.opponent}</Col>
                                </> : 
                                 line.result==="push" ? 
                                 <>
                                 <Col lg={3} text="orange" className="col">{line.result}</Col>
                                 <Col lg={3} text="orange" className="col">{line.team} <br/>{line.spread ? line.spread : null} ({line.odds})</Col>
                                 <Col lg={6} text="orange"className="col">{line.team} v {line.opponent}</Col>
                                 </> : 
                                <>
                                <Col lg={3} text="pending" className="col">{line.result}</Col>
                                <Col lg={3} text="pending" className="col">{line.team} <br/>{line.spread ? line.spread : null} ({line.odds})</Col>
                                <Col lg={6} text="pending"className="col">{line.team} v {line.opponent}</Col>
                                </>}
                            </Row>)}
                        </Container>

                    </Modal.Body>
                </Modal>
            </>


        )
    };
}

export default PlacedBet;