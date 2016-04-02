import React from 'react';
import classNames from 'classnames';
import {Grid, Row, Col, Glyphicon, Label, Tabs, Tab, Image} from 'react-bootstrap';
import {VideoListItem} from '../videoListItem/VideoListItem';
import {LinkContainer} from 'react-router-bootstrap';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';

@connect(null, dispatch => ({
    switchTab: key => dispatch(push(`/my-favorite/${key}`))
}))
export default class extends React.Component {

    componentWillMount() {
        console.log(' will mount ');
    }

    handleSelect = (activeTab) => {
        console.log(activeTab);
        this.props.switchTab(activeTab);
    };

    render() {
        return (
            <div id="favorite">
                <div className="content-wrapper">
                    <Tabs activeKey={this.props.params.tabSelect || "1"} onSelect={this.handleSelect} className="nav-tabs-stylish">
                        <Tab eventKey="1" title="收藏的视频">
                            <Row className="video-list-container">
                                <VideoListItem imgUrl="../../assets/video/dreams-preview.png"/>
                                <VideoListItem imgUrl="../../assets/video/escape-preview.png"/>
                                <VideoListItem imgUrl="../../assets/video/golden-preview.png"/>
                                <VideoListItem imgUrl="../../assets/video/treehouse-preview.png"/>
                                <VideoListItem imgUrl="../../assets/video/roundicons-free.png"/>
                                <VideoListItem imgUrl="../../assets/video/startup-framework-preview.png"/>
                                <VideoListItem imgUrl="../../assets/video/escape-preview.png"/>
                                <VideoListItem imgUrl="../../assets/video/golden-preview.png"/>
                                <VideoListItem imgUrl="../../assets/video/treehouse-preview.png"/>
                            </Row>
                        </Tab>

                        <Tab eventKey="2" title="我发布的课程">
                            我的发布
                        </Tab>
                    </Tabs>

                </div>
            </div>
        )
    }
}