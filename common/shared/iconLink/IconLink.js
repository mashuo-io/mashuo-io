import React, {PropTypes} from 'react';
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
	static propTypes = {
		icon: PropTypes.element,
		text: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
		activeIcon: PropTypes.bool,
		activeText: PropTypes.bool,
		iconUrl: PropTypes.string,
		textUrl: PropTypes.string,
		onIconClick: PropTypes.func,
		onTextClick: PropTypes.func,
		iconClassName: PropTypes.string,
		textClassName: PropTypes.string,
        hideMe: PropTypes.bool
	};

	render() {
        const {icon, text, iconUrl, onIconClick, textUrl, onTextClick, textClassName, iconClassName, itemClassName, activeIcon, hideMe} = this.props;
        let textClasses, iconClasses, itemClasses;
        let Icon = null, Text = null;

        if( textClassName ){
            textClasses = classNames("text", {[textClassName]: true})
        }
        else {
            textClasses = classNames("text", {});
        }

        if( iconClassName ){
            iconClasses = classNames("icon", {[iconClassName]: true})
        }
        else {
            iconClasses = classNames("icon", {active: activeIcon});
        }

        itemClasses = classNames(this.props.className, {["icon-text"]: true, ["hide-me"]: hideMe});

        if ( icon ) {
            if( iconUrl || onIconClick ) {
                Icon = (
                    <a className={iconClasses} href={iconUrl ? iconUrl : "javascript:;"} target="_blank" onClick={onIconClick}>{icon}</a>
                )
            }
            else{
                Icon = (<span className={iconClasses}>{icon}</span>)
            }
        }

        if ( text ) {
            if( textUrl || onTextClick ) {
                Text = (
                    <a className={textClasses} href={textUrl ? textUrl : "javascript:;"} target="_blank" onClick={onTextClick}><span>{text}</span></a>
                )
            }
            else{
                Text = (<span className={textClasses}>{text}</span>)
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

