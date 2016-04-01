import React from 'react';
import classNames from 'classnames';
import {Col, Glyphicon} from 'react-bootstrap';
import {IconLinkGroup, IconLinkItem} from '../iconLink/IconLink';

export class VideoListItem extends React.Component {
    render() {
        const {imgUrl, title, numberOfVideos, totalTime} = this.props;

        let bkImageStyle = {
            backgroundImage: 'url(' + imgUrl + ')'
        };

        return(
            <Col md={4} sm={6} className="video-item">
                <a href="javascript:;" className="video-link" style={bkImageStyle}>
                    <div className="video-hover">
                        <Glyphicon glyph="play-circle" className="video-hover-content"/>
                    </div>
                </a>
                <div className="video-caption">
                    <h4>Round Icons</h4>
                    <IconLinkGroup>
                        <IconLinkItem text="三段视频" icon={<Glyphicon glyph="film" />} ></IconLinkItem>
                        <IconLinkItem text="35分钟" icon={<Glyphicon glyph="time" />} ></IconLinkItem>
                    </IconLinkGroup>

                </div>
            </Col>
        )
    }
}