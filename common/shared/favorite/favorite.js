import React from 'react';
import classNames from 'classnames';
import {Grid, Row, Col, Glyphicon, Label, Tabs, Tab, Image} from 'react-bootstrap';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1
        };
    }

    handleSelect = (activeTab) => {
        this.setState({activeTab});
    };

    render() {
        return (
            <div id="favorite">
                <div className="content-wrapper">
                    <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} className="nav-tabs-stylish">
                        <Tab eventKey={1} title="我的收藏1"></Tab>
                        <Tab eventKey={2} title="我的收藏2"></Tab>
                    </Tabs>

                </div>
            </div>
        )
    }
}