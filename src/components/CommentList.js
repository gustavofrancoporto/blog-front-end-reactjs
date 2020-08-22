import React from 'react';
import { format as timeago } from 'timeago.js';
import {Message} from "./Message";

class CommentList extends React.Component {

    render() {
        let {comments} = this.props;

        if (null === comments || 0 === comments.length) {
            return (<Message message="No comments" />);
        }

        return (
            <div>
                <div className="card mb-3 mt-3 shadow-sm">
                    {comments && comments.map(comment => (
                        <div className="card-body border-bottom" key={comment.id}>
                            <p className="card-text mb-0">{comment.content}</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    {timeago(comment.published)} by {comment.author.name}
                                </small>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default CommentList;