import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import classNames from 'classnames'


class StackGlyphicon extends React.Component {
    propTypes: {
        icon: React.PropTypes.string.isRequired
    }

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

export class Home extends React.Component{
    render () {
        return (
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
        )
    }
}