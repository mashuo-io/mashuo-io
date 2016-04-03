import React from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';


// This component works as a wrapper of content page, it will extends the content page's height as much as possible, excluding
// navbar,footer etc. The content page much preserve the min-height style as 'inherit'
// Presumably the content page should be the only child, no other siblings.
export default class MainContentWrapper extends React.Component {
    state = {
        style: {}
    };

    checkAndUpdateHeight = ()=> {
        const cs = window.getComputedStyle(this.refs.mainContent.children[0], null);        // assume children[0] is the only child component
        const childrenMargin = parseInt(cs.getPropertyValue('margin-top')) +
            parseInt(cs.getPropertyValue('margin-bottom'));

        const winHeight = this.getBrowserDimensions().height;

        // 62 is the navbar height
        // Exclude footer height if need.
        this.setState({
            style: {
                'min-height': `${winHeight - 62 - childrenMargin }px`
            }
        });
    };

    getBrowserDimensions (){
        return {
            width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
            height: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.checkAndUpdateHeight);
        this.checkAndUpdateHeight();
    }

    render() {
        return (
            <div className="main-content-wrapper" ref="mainContent" style={this.state.style}>
                {this.props.children}
            </div>
        )
    }
}