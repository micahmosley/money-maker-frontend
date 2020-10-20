import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import {  Link } from "react-router-dom";
class Sports extends React.Component {

    render() {
        return (
            <div>
                <DropdownButton
                    className="sportbutton"
                    key='right'
                    id='dropdown-button-drop-right'
                    drop='right'
                    size='lg'
                    variant="secondary"
                    title="Football"
                    
                >
                    <Dropdown.Item eventKey="1" onClick={()=>{this.props.getSportOdds('americanfootball_nfl', 'us', "NFL FOOTBALL")}} as={Link} to="/sport">NFL</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={()=>{this.props.getSportOdds('americanfootball_ncaaf', 'us', "NCAA FOOTBALL")}} as={Link} to="/sport">NCAAF</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                    className="sportbutton"
                    key='right'
                    id='dropdown-button-drop-right'
                    drop='right'
                    size='lg'
                    variant="secondary"
                    title="Baseball"
                >
                    <Dropdown.Item eventKey="1" onClick={()=>{this.props.getSportOdds("baseball_mlb", 'us', "Major League Baseball")}} as={Link} to="/sport">MLB</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                    className="sportbutton"
                    key='right'
                    id='dropdown-button-drop-right'
                    drop='right'
                    size='lg'
                    variant="secondary"
                    title="Basketball"
                >
                    <Dropdown.Item eventKey="1" onClick={()=>{this.props.getSportOdds("basketball_nba", 'us', "National Basketball Association")}} as={Link} to="/unavailable">NBA</Dropdown.Item>
                    <Dropdown.Item eventKey="1" onClick={()=>{this.props.getSportOdds("basketball_euroleague", 'eu', "EuroLeague")}} as={Link} to="/sport">Euroleague</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                    className="sportbutton"
                    key='right'
                    id='dropdown-button-drop-right'
                    drop='right'
                    size='lg'
                    variant="secondary"
                    title="Soccer"
                >
                    <Dropdown.Item eventKey="1" onClick={()=>{this.props.getSportOdds("soccer_epl", 'uk', "English Premier League")}} as={Link} to="/sport">Premier League</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={()=>{this.props.getSportOdds('soccer_usa_mls', 'us', "Major League Soccer")}} as={Link} to="/sport">MLS</Dropdown.Item>
                </DropdownButton>
                
            </div>
        )
    };


}

export default Sports;