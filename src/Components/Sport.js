import React from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import Line from './Line.js'
import Betslip from './Betslip.js'
class Sport extends React.Component {

    state={
        show:false, 
    }

    handleShow=()=>{
        this.setState({
            show:true
        })
    }

    handleClose=()=>{
        this.setState({
            show:false
        })
    }

   


    render() {
        return (

            <>
                <Container>
                    <Row className="odd-row">
                        <Col className="col" lg={10}>{this.props.currentSport}</Col>
                        <Col className="col" lg={2}><Button variant="primary" onClick={this.handleShow}>Betslip: {this.props.selectedLines.length}</Button></Col>
                    </Row>
                    {this.props.currentData.map((game) => <Line key={game.home_team} game={game} handleLineSelection={this.props.handleLineSelection}  />)}
                </Container>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Betslip</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Betslip subtractFromSelectedLines={this.props.subtractFromSelectedLines} multiplier={this.props.multiplier} selectedLines={this.props.selectedLines}/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Submit Betslip
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>






        )
    };


}

export default Sport;