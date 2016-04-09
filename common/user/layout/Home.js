import React from 'react';
import {Glyphicon, Grid, Row, Col, Image} from 'react-bootstrap';
import classNames from 'classnames';
import {VideoItem} from '../../shared/VideoItem/VideoItem';


class StackGlyphicon extends React.Component {
    propTypes: {
        icon: React.PropTypes.string.isRequired
    };

    render() {
        let className = classNames(this.props.className, {
            ['glyphicon-' + this.props.icon]: true,
            ['glyphicon']: true,
            ['glyphicon-circle-background']: true
        });

        let style = {
            'backgroundColor': this.props.bkColor,
            'color': this.props.color,
            'fontSize': this.props.size,
            'padding':'20px'
        };

        return (
            <span>
                <i className={className} style={style}></i>
            </span>
        )
    }
}

class SectionHeader extends React.Component{
    render() {
        let {title, subTitle} = this.props;
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">{title}</h2>
                    <h3 className="section-subheading text-muted">{subTitle}</h3>
                </div>
            </div>
        )
    }
}

class SectionColumn extends React.Component {
    render() {
        let {title, text} = this.props;
        return (
            <div className="col-md-4">
                {this.props.children}
                <h4 className="service-heading">{title}</h4>
                <p className="text-muted">{text}</p>
            </div>
        )
    }
}



class VideoList extends React.Component {
    render() {

        return (
            <section id="video-list" className="bg-light-gray">
                <Grid>
                    <Row>
                        <VideoItem imgUrl="assets/video/dreams-preview.png"/>
                        <VideoItem imgUrl="assets/video/escape-preview.png"/>
                        <VideoItem imgUrl="assets/video/golden-preview.png"/>
                        <VideoItem imgUrl="assets/video/treehouse-preview.png"/>
                        <VideoItem imgUrl="assets/video/roundicons-free.png"/>
                        <VideoItem imgUrl="assets/video/startup-framework-preview.png"/>
                        <VideoItem imgUrl="assets/video/escape-preview.png"/>
                        <VideoItem imgUrl="assets/video/golden-preview.png"/>
                        <VideoItem imgUrl="assets/video/treehouse-preview.png"/>
                    </Row>
                </Grid>
            </section>
        )
    }
}

export class Home extends React.Component{
    render () {
        return (
            <div>
                <section id="services">
                    <div className="container">
                        {/*<SectionHeader title="Services" subTitle="Lorem ipsum dolor sit amet consectetur." />*/}
                        <div className="row text-center">
                            <SectionColumn title="最前沿" text="将陆续推出以下课程：react, angular2, es6, webpack, ionic mobile, react native...">
                                <StackGlyphicon icon="link" color="white" bkColor="#62B2F7" size="50px"/>
                            </SectionColumn>

                            <SectionColumn title="让代码说话" text="码说让代码说话，直接展现代码之美，美丽不用PPT转载。">
                                <StackGlyphicon icon="tower" color="white" bkColor="#62B2F7" size="50px"/>
                            </SectionColumn>

                            <SectionColumn title="每天五分钟" text="新技术层出不穷，每天五分钟帮你轻松掌握新技能。">
                                <StackGlyphicon icon="grain" color="white" bkColor="#62B2F7" size="50px"/>
                            </SectionColumn>
                        </div>
                    </div>
                </section>

                <VideoList></VideoList>
                <section className="bg-dark">
                    <Grid>
                        <Row>
                            <Col lg={8} lgOffset={2} className="text-center">
                                <h2 className="section-heading">We've got what you need!</h2>
                                <a href="#" className="btn btn-primary btn-xl">Find Out More</a>
                            </Col>
                        </Row>
                    </Grid>
                </section>
            </div>
        )
    }
}