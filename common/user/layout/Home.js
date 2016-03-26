import React from 'react';
import {Glyphicon, Grid, Row, Col, Image} from 'react-bootstrap';
import classNames from 'classnames'


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

class VideoItem extends React.Component {
    render() {
        const {imgUrl} = this.props;

        let bkImageStyle = {
            backgroundImage: 'url(' + imgUrl + ')'
        };

        return(
            <Col md="4" sm="6" className="video-item">
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
                <section className="bg-primary" id="banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 text-center">
                                <h2 className="section-heading">We've got what you need!</h2>
                                <hr className="light"/>
                                <p className="text-faded">Start Bootstrap has everything you need to get your new website up and running in no time! All of the templates and themes on Start Bootstrap are open source, free to download, and easy to use. No strings attached!</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="services">
                    <div className="container">
                        <SectionHeader title="Services" subTitle="Lorem ipsum dolor sit amet consectetur." />
                        <div className="row text-center">
                            <SectionColumn title="E-Commerce" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.">
                                <StackGlyphicon icon="link" color="white" bkColor="#62B2F7" size="50px"/>
                            </SectionColumn>

                            <SectionColumn title="Responsive Design" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.">
                                <StackGlyphicon icon="tower" color="white" bkColor="#62B2F7" size="50px"/>
                            </SectionColumn>

                            <SectionColumn title="Web Security" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.">
                                <StackGlyphicon icon="grain" color="white" bkColor="#62B2F7" size="50px"/>
                            </SectionColumn>
                        </div>
                    </div>
                </section>

                <VideoList></VideoList>
                <section className="bg-dark">
                    <Grid>
                        <Row>
                            <Col lg="8" lgOffset="2" className="text-center">
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