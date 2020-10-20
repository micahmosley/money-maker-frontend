import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
class Line extends React.Component {

    render() {       
        return (
            // do not show line if it is past game start time
            <div>
            {Math.floor(new Date().getTime()/1000.0)>this.props.game.commence_time ? null :  
            <Container>
                <Row className="odd-row">
                    <Col className="header-col">{`${new Date(this.props.game.commence_time*1000)}`}</Col> 
                    <Col className="header-col">Moneyline</Col>
                    <Col className="header-col">Spread</Col>
                </Row>
                <Row className="even-row">
                    <Col className="col">{this.props.game.teams[0]}</Col>
                    {/* check to make sure there are odds available at the moment */}
                    {this.props.game.moneyline ? <Col className="col"><button buttontype="line" className={this.props.game.home_team} opponent={this.props.game.teams[1]} team={this.props.game.teams[0]} type="moneyline" select="false" onClick={this.props.handleLineSelection}>{this.props.game.moneyline[0].toFixed(2)}</button></Col> : <Col className="col">No odds available.</Col>}
                    {this.props.game.sites.length!==0 ? <Col className="col"><button buttontype="line" className={this.props.game.home_team} odds ={this.props.game.sites[0].odds.spreads.odds[0]} spread={this.props.game.sites[0].odds.spreads.points[0]} opponent={this.props.game.teams[1]} team={this.props.game.teams[0]} type="spread" select="false" onClick={this.props.handleLineSelection}>{this.props.game.sites[0].odds.spreads.points[0]} ({this.props.game.sites[0].odds.spreads.odds[0].toFixed(2)})</button></Col> : <Col className="col">No odds available.</Col>} 
                </Row>
                <Row className="odd-row">
                    <Col className="col">{this.props.game.teams[1]}</Col>
                    {/* check to make sure there are odds available at the moment */}
                    {this.props.game.moneyline ? <Col className="col"><button buttontype="line" className={this.props.game.home_team} opponent={this.props.game.teams[0]} team={this.props.game.teams[1]} type="moneyline"  select="false" onClick={this.props.handleLineSelection}>{this.props.game.moneyline[1].toFixed(2)}</button></Col> : <Col className="col">No odds available.</Col>}
                    {this.props.game.sites.length!==0 ? <Col className="col"><button buttontype="line" className={this.props.game.home_team} odds ={this.props.game.sites[0].odds.spreads.odds[1]} spread={this.props.game.sites[0].odds.spreads.points[1]} opponent={this.props.game.teams[0]} team={this.props.game.teams[1]} type="spread" select="false" onClick={this.props.handleLineSelection}>{this.props.game.sites[0].odds.spreads.points[1]} ({this.props.game.sites[0].odds.spreads.odds[1].toFixed(2)})</button></Col> : <Col className="col">No odds available.</Col>} 
                </Row>
                {/* {this.props.game.moneyline[2] ?
                <Row className="even-row">
                    <Col className="col">Draw</Col>
                    <Col className="col"><button buttontype="line" className={this.props.game.home_team} team={`Draw ${this.props.game.teams[0]}-${this.props.game.teams[1]}`} type='draw'  select="false" onClick={this.props.handleLineSelection}>{this.props.game.moneyline[2].toFixed(2)}</button></Col> 
                    <Col className="col">N/A</Col>
                </Row>
                : null} */}
                <br/>
            </Container>  }
            </div>
                    
              

        )
    };


}

export default Line;