import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import PlacedBet from './PlacedBet.js'
class ShowBets extends React.Component {

    

    render() {
        return (
            <>
            <h1 className="placed">{this.props.showBetsType} Bets</h1>
            <br/>
                <Container>
                    <Row className="odd-row">
                        <Col className="col" lg={2}>Outcome</Col>
                        <Col className="col" lg={10}>Wager</Col>
                    </Row>
                    {this.props.showBets.map((bet) => <PlacedBet key={bet.id} showLines={this.props.showLines} getBetLines={this.props.getBetLines} bet={bet}/>)}
                </Container>

                
            </>
        )
    };


}

export default ShowBets;