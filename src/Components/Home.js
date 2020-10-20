import React from 'react';
import { Modal } from 'react-bootstrap'

class Home extends React.Component {



render(){
  return (
  <div>
  <div class="home-row">
      <div className="home-column">
        <img src="./images/mahomes.jpg" alt="football" />
        <h1 className="home-title">24/7 Sports</h1>
        
      </div>
      <div className="home-column">
        <img src="./images/lebron.jpeg" alt="basketball" />
        <h1 className="home-title">Here On</h1>
        
      </div>
      <div className="home-column">
        <img src="./images/messi.jpeg" alt="soccer" />
        <h1 className="home-title">MoneyMaker</h1>
        
      </div>
  </div>
  <div class="home-row">
      <div className="home-column">
        <img src="./images/trout.jpg" alt="baseball" />
       
        
      </div>
      <div className="home-column">
        <img src="./images/mcgregor.jpg" alt="ufc" />
       
        
      </div>
      <div className="home-column">
        <img src="./images/federer.jpeg" alt="tennis" />
        
        
      </div>
  </div>

<Modal show={this.props.showError} onHide={this.props.hideError}>
<Modal.Header closeButton>
    <Modal.Title>Error</Modal.Title>
</Modal.Header>
  <Modal.Body>{this.props.error}</Modal.Body>

</Modal>
</div>
  )}
}

export default Home