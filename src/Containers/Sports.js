import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import {  Link } from "react-router-dom";
class Sports extends React.Component {

    state = {

    }

    render() {
        return (
            <div>
                <DropdownButton

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
                <DropdownButton

                    key='right'
                    id='dropdown-button-drop-right'
                    drop='right'
                    size='lg'
                    variant="secondary"
                    title="MMA"
                >
                    <Dropdown.Item eventKey="1" onClick={()=>{this.props.getSportOdds("mma_mixed_martial_arts", 'us', "Mixed Martial Arts")}} as={Link} to="/sport">MMA</Dropdown.Item>
                </DropdownButton>
            </div>
        )
    };


}

export default Sports;