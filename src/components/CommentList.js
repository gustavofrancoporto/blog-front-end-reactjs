import React from 'react';
import { format as timeago } from 'timeago.js';
import {Message} from './Message';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import './CommentList.css';

class CommentList extends React.Component {

    render() {
        let {comments} = this.props;

        if (null === comments || 0 === comments.length) {
            return (<Message message="No comments" />);
        }

        return (
            <div>
                <div className="card mb-3 mt-3 shadow-sm">
                    <TransitionGroup>
                        {comments && comments.map(comment => {
                            return (
                                <CSSTransition key={comment.id} timeout={1000} classNames='fade'>
                                    <div className="card-body border-bottom">
                                        <p className="card-text mb-0">{comment.content}</p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                {timeago(comment.published)} by {comment.author.name}
                                            </small>
                                        </p>
                                    </div>
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default CommentList;