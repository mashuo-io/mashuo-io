import React from 'react';
import classNames from 'classnames';
import {IconLinkGroup, IconLinkItem} from '../iconLink/IconLink';
import {Image,Glyphicon, Input, ButtonInput, Button} from 'react-bootstrap';
import TextAreaAutosize from 'react-textarea-autosize';

class CommentForm extends React.Component {
    static propTypes = {
        showCancelButton: React.PropTypes.bool,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func
    };


    render() {
        const {showCancelButton, onSubmit, onCancel} = this.props;
        let CancelButton = null;

        if( showCancelButton ){
            CancelButton = (
                <ButtonInput bsStyle="default" type="reset" value="取消" className="pull-right" onClick={onCancel} />
            )
        }

        return (
            <form className="comment-content">
                <div className="form-group">
                    <TextAreaAutosize className="form-control" placeholder="我来说两句..."></TextAreaAutosize>
                </div>
                <ButtonInput bsStyle="primary" type="submit" value="提交" className="pull-right" onClick={onSubmit} />
                {CancelButton}
            </form>
        )
    }
}

export class CommentInput extends React.Component {
    render() {
        const {avatarUrl } = this.props;

        return (
            <div className="comment-wrap">
                <div className="avatar">
                    <Image src={avatarUrl} responsive circle></Image>
                </div>
                <CommentForm />
            </div>
        )
    }
}

export class CommentItem extends React.Component {
    static propTypes = {
        avatarUrl: React.PropTypes.string,
        text: React.PropTypes.string,
        author: React.PropTypes.string,
        when: React.PropTypes.string
    };


    constructor(props) {
        super(props);
        this.state = {
            showReply: false
        }
    }

    onReply = () => {
        this.setState({showReply: true});
    };

    onCancelReply = () => {
        this.setState({showReply: false});
    };

    render() {
        const {avatarUrl, author, text, when } = this.props;

        let ReplyElement = null;

        if( this.state.showReply ){
            ReplyElement = (
                <div className="comment-reply">
                    <div className="avatar">
                        <Image src={avatarUrl} responsive circle></Image>
                    </div>

                    <CommentForm showCancelButton onCancel={this.onCancelReply}/>
                </div>
            )
        }

        return (
            <div className="comment-wrap">
                <div className="avatar">
                    <Image src={avatarUrl} responsive circle></Image>
                </div>

                <div className="comment-content">
                    <IconLinkGroup>
                        <IconLinkItem text={author}></IconLinkItem>
                    </IconLinkGroup>


                    <div className="comment-text">
                        <p>{text}</p>
                    </div>

                    <IconLinkGroup>
                        <IconLinkItem text={when}></IconLinkItem>
                        <IconLinkItem text="回复" icon={<Glyphicon glyph="send" />} onTextClick={this.onReply}></IconLinkItem>
                        <IconLinkItem text="赞" icon={<Glyphicon glyph="heart" />}></IconLinkItem>
                    </IconLinkGroup>

                    {ReplyElement}

                </div>
            </div>
        )
    }
}