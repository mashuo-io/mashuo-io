import React from 'react';
import {Button, ButtonGroup, DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap';


class Header extends React.Component {
    render() {
        return (
            <header>
                <div>
                    <div className="intro-text">
                        <div className="intro-lead-in">Welcome To Our Studio!</div>
                        <div className="intro-heading">It's Nice To Meet You</div>
                        <a href="#" className="page-scroll btn btn-xl">Tell Me More</a>
                    </div>
                </div>
            </header>
        )
    }
}

export class Home extends React.Component{
    render () {
        return (
            <div>
                <Header></Header>

                <Button bsStyle="primary"><Glyphicon glyph="star" />提交</Button>
                <hr/>
                <ButtonGroup>
                    <Button >Left</Button>
                    <Button >Middle</Button>
                    <Button>Right</Button>
                </ButtonGroup>

                <hr />

                <ButtonGroup>
                    <Button >1</Button>
                    <Button >2</Button>
                    <DropdownButton  title="Dropdown" id="bg-nested-dropdown">
                        <MenuItem eventKey="1">Dropdown link</MenuItem>
                        <MenuItem eventKey="2">Dropdown link</MenuItem>
                    </DropdownButton>
                </ButtonGroup>
                <hr/>

                <Button  bsSize="lg"><Glyphicon glyph="star" />提交</Button>
                <hr/>
                <ButtonGroup>
                    <Button bsSize="lg">Left</Button>
                    <Button bsSize="lg">Middle</Button>
                    <Button bsSize="lg" active={true}>Right</Button>
                </ButtonGroup>

                <hr />

                <ButtonGroup>
                    <Button bsSize="lg">1</Button>
                    <Button bsSize="lg">2</Button>
                    <DropdownButton bsSize="lg" title="Dropdown" id="bg-nested-dropdown">
                        <MenuItem eventKey="1">Dropdown link</MenuItem>
                        <MenuItem eventKey="2">Dropdown link</MenuItem>
                    </DropdownButton>
                </ButtonGroup>                
            </div>
        )
    }
}