import React from 'react';
import {Glyphicon, Grid, Row, Col, Image} from 'react-bootstrap';
import classNames from 'classnames';
import {VideoListItem} from '../../shared/videoListItem/VideoListItem';


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
                </Grid>
            </section>
        )
    }
}

export class Home extends React.Component{
    render () {
        return (
            <div>
                {/*<section className="bg-primary" id="banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 text-center">
                                <h2 className="section-heading">最前沿的WEB和APP开发技术</h2>
                                <h2 className="section-heading">编码秀视频培训</h2>
                                <hr className="light"/>
                                <p className="text-faded">开发任务如此繁重，新技术蜂拥而至，听码说轻松学习新技能</p>
                            </div>
                        </div>
                    </div>
                </section>*/}
                <section id="services">
                    <div className="container">
                        {/*<SectionHeader title="Services" subTitle="Lorem ipsum dolor sit amet consectetur." />*/}
                        <div className="row text-center">
                            <SectionColumn title="最前沿" text="将陆续推出以下课程：react, angular2, es6, webpack, ionic, react native...">
                                <StackGlyphicon icon="link" color="white" bkColor="#62B2F7" size="50px"/>
                            </SectionColumn>

                            <SectionColumn title="让代码说话" text="市场上充斥了拿PPT说个没完的培训，花了大把时间听完还不知道怎么开始，码说让代码说话，直接领略代码之美，美丽不用PPT来转载。">
                                <StackGlyphicon icon="tower" color="white" bkColor="#62B2F7" size="50px"/>
                            </SectionColumn>

                            <SectionColumn title="每天五分钟" text="开发任务如此繁重，新技术蜂拥而至，码说帮你轻松掌握新技能, 码说知道你很忙，所以不废话，一个课程通常由若干个五分钟视频组成，每天五分钟就能学到一个小技巧，大半个小时能掌握一门技术。">
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