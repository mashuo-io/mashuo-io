import React from 'react';
import classNames from 'classnames';
import {Grid, Row, Col, Glyphicon, Label, Tabs, Tab, Image} from 'react-bootstrap';
import {VideoListItem} from '../videoListItem/VideoListItem';

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
                        <Tab eventKey={1} title="收藏的视频">
                            <Row className="video-list-container">
                                <VideoListItem imgUrl="assets/video/dreams-preview.png"/>
                                <VideoListItem imgUrl="assets/video/escape-preview.png"/>
                                <VideoListItem imgUrl="assets/video/golden-preview.png"/>
                                <VideoListItem imgUrl="assets/video/treehouse-preview.png"/>
                                <VideoListItem imgUrl="assets/video/roundicons-free.png"/>
                                <VideoListItem imgUrl="assets/video/startup-framework-preview.png"/>
                                <VideoListItem imgUrl="assets/video/escape-preview.png"/>
                                <VideoListItem imgUrl="assets/video/golden-preview.png"/>
                                <VideoListItem imgUrl="assets/video/treehouse-preview.png"/>
                            </Row>
                        </Tab>
                    </Tabs>

                </div>
            </div>
        )
    }
}