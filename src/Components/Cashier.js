import React from 'react';
import {Button, Modal } from 'react-bootstrap'

class Cashier extends React.Component {

    state={
        show:false, 
        showWithdraw:false,
        deposit:0,
        withdraw:0,
    }

    handleShow=()=>{
        this.setState({
            show:true
        })
    }
    handleShowWithdraw=()=>{
        this.setState({
            showWithdraw:true
        })
    }

    handleClose=()=>{
        this.setState({
            show:false,
            showWithdraw:false,
        })
    }

    depositAmount=(e)=>{
        this.setState({
            deposit: e.target.value
        })
    }

    withdrawAmount=(e)=>{
        this.setState({
            withdraw: e.target.value
        })
    }


    render() {
        
        return (
            <div>
            <h1>Cashier</h1>
            <br/>
            <br/>
            <h2>Current Balance: ${this.props.balance}</h2>
            <br/>
            <br/>
            <h2>Deposit Options</h2>
            <ul>
                <li><img src="./images/bitcoin.png" alt="bitcoin"/>  <Button variant="dark" onClick={this.handleShow}>Deposit</Button></li>
                <li><img src="./images/credit.jpeg" alt="credit cards"/> <Button variant="dark" onClick={this.handleShow}>Deposit</Button></li>
            </ul>
            <h2>Withdrawal Options</h2>
            <ul>
                <li><img src="./images/bitcoin.png" alt="bitcoin"/>  <Button variant="dark" onClick={this.handleShowWithdraw}>Withdraw</Button></li>
                <li><img src="./images/banks.png" alt="banks"/> <Button variant="dark" onClick={this.handleShowWithdraw}>Withdraw</Button></li>
            </ul>

            <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deposit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>USD: <input onChange={this.depositAmount} id="deposit"/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={(e)=>{
                            this.props.makeDeposit(this.state.deposit)
                            this.handleClose()
                        }}>
                            Deposit
                        </Button>
                    </Modal.Footer>
            </Modal>

            <Modal show={this.state.showWithdraw} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Withdrawal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Account#/Bitcoin Address: <br/> <input/> <br/>Withdrawal Amount <br/> <input onChange={this.withdrawAmount} id="withdraw"/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={(e)=>{
                            this.props.makeWithdraw(this.state.withdraw)
                            this.handleClose()
                        }}>
                            Withdraw
                        </Button>
                    </Modal.Footer>
            </Modal>
            </div>
        )
    };


}

export default Cashier;