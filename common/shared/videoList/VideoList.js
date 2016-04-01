import React from 'react';
import classNames from 'classnames';
import {Grid, Row, Col, Glyphicon, Label, Tabs, Tab, Image} from 'react-bootstrap';

export class VideoItem extends React.Component {
    render() {
        const {imgUrl} = this.props;

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
                    <p className="text-muted">Graphic Design</p>
                </div>
            </Col>

        )
    }
}