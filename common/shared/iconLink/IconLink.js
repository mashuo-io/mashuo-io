import React from 'react';
import classNames from 'classnames';

export class IconLinkGroup extends React.Component{
    render() {
        return (
            <div className="icon-link-group">
                {this.props.children}
            </div>
        )
    }
}

export class IconLinkItem extends React.Component {
    render() {
        const {icon, text, iconUrl, onIconClick, textUrl, onTextClick, textClassName, iconClassName, itemClassName} = this.props;
        let textClasses, iconClasses, itemClasses;
        let Icon = null, Text = null;

        if( textClassName ){
            textClasses = classNames("text", {[textClassName]: true})
        }
        else {
            iconClasses = classNames("text", {});
        }

        if( iconClassName ){
            iconClasses = classNames("icon", {[iconClassName]: true})
        }
        else {
            iconClasses = classNames("icon", {});
        }

        itemClasses = classNames(this.props.className, {["icon-text"]: true});



        if ( icon ) {
            if( iconUrl || onIconClick ) {
                Icon = (
                    <a className={iconClasses} href={iconUrl ? iconUrl : "javascript:;"} onClick={onIconClick}>{icon}</a>
                )
            }
            else{
                Icon = (<span className={classNames("icon", {[iconClassName]: true})}>{icon}</span>)
            }
        }

        if ( text ) {
            if( textUrl || onTextClick ) {
                Text = (
                    <a className={textClasses} href={textUrl ? textUrl : "javascript:;"} onClick={onTextClick}><span>{text}</span></a>
                )
            }
            else{
                Text = (<span className={classNames("message", {[textClassName]: true})}>{text}</span>)
            }
        }

        return (
            <div className={itemClasses}>
                {Icon}
                {Text}
            </div>
        )
    }
}

IconLinkItem.propTypes = {
    icon: React.PropTypes.element,
    text: React.PropTypes.string,
    iconUrl: React.PropTypes.string,
    textUrl: React.PropTypes.string,
    onIconClick: React.PropTypes.func,
    onTextClick: React.PropTypes.func,
    iconClassName: React.PropTypes.string,
    textClassName: React.PropTypes.string
};
