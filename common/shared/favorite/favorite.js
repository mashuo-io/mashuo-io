import React from 'react';
import classNames from 'classnames';
import {Grid, Row, Col, Glyphicon, Label, Tabs, Tab, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {IconLinkGroup, IconLinkItem} from '../iconLink/IconLink';
import TimeAgo from '../utils/TimeAgo';
import {doFetchMyCourses} from '../course/course.action';
import {VideoItem} from '../VideoItem/VideoItem';
import {displayDuration} from '../utils/misc';

class MyVideoItem extends React.Component {
    state = {
        hideButton : true
    };

    onMouseEnter = () =>{
        this.setState({hideButton : false})
    };

    onMouseLeave = () =>{
        this.setState({hideButton : true})
    };

    onCancelFavorite = () => {
        console.log('cancel', this.props.id)
    };

    render() {
        const {imgUrl='../../assets/video/dreams-preview.png',link="", title, videoCount=3, duration="20分钟", hoverButtonCaption, onHoverButtonClick, status} = this.props;
        let hoverButton = null;
        if( hoverButtonCaption ){
            hoverButton = (
                <IconLinkItem className="pull-right" hideMe={this.state.hideButton} text={hoverButtonCaption} onTextClick={onHoverButtonClick}></IconLinkItem>
            )
        }

        let Status = null;
        if( status ){
            Status = (
                <IconLinkItem text={status}></IconLinkItem>
            )
        }

        let bkImageStyle = {
            backgroundImage: 'url(' + imgUrl + ')'
        };

        return(
            <VideoItem id={12} {...this.props}>
                <div className="video-caption" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <h4>{title || 'Video Title'}</h4>
                    <IconLinkGroup>
                        <IconLinkItem text={`${videoCount}段视频`} icon={<Glyphicon glyph="film" />} ></IconLinkItem>
                        <IconLinkItem text={duration} icon={<Glyphicon glyph="time" />} ></IconLinkItem>
                        {Status}
                        {hoverButton}
                    </IconLinkGroup>
                </div>
            </VideoItem>
        )
    }
}


@connect(
    state => state.myCourse,
    dispatch => ({
        doFetch: () => dispatch(doFetchMyCourses()),
        switchTab: key => dispatch(push(`/my-video/${key}`)),
        newCourse: ()=> dispatch(push('/my-course/new')),
        editCourse: course=> dispatch(push(`/my-course/edit/${course._id}`))
}))
export default class extends React.Component {
    handleSelect = (activeTab) => {
        this.props.switchTab(activeTab);
        switch (activeTab ) {
            case 'favorite':
                break;
            case 'publish':
                this.props.doFetch();
                break;
        }

    };

    componentWillMount() {
        switch (this.props.params.tabSelect ) {
        case 'favorite':
            break;
        case 'publish':
            this.props.doFetch();
            break;
        }
    }

    removeFavorite() {

    }

    editCourse() {

    }

    render() {
        return (
            <div id="favorite" >
                <Tabs animation={false} activeKey={this.props.params.tabSelect || "favorite"} onSelect={this.handleSelect} className="nav-tabs-stylish">
                    <Tab eventKey="favorite" title="收藏">
                        <Row className="video-list-container">
                            <MyVideoItem
                                hoverButtonCaption="取消收藏"
                                onHoverButtonClick={this.removeFavorite}
                            />
                        </Row>
                    </Tab>

                    <Tab eventKey="publish" title="我的发布">
                        <Row className="video-list-container">
                            { (this.props.courses || []).map(x=> (
                                <MyVideoItem
                                    key={x.id}
                                    link={`/course/${x._id}`}
                                    imageUrl={x.coverImageUrl}
                                    title={x.name}
                                    videoCount={x.videos.length}
                                    duration={displayDuration(x.duration)}
                                    status={x.status === 'new' ? '未发布': '已发布'}
                                    hoverButtonCaption="编辑"
                                    onHoverButtonClick={()=>this.props.editCourse(x)}
                                />
                            ))}
                        </Row>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}



