import React from 'react';
import { format as timeago } from 'timeago.js';
import {Message} from "./Message";

class BlogPost extends React.Component {

    render() {
        let {post} = this.props;

        if (null === post) {
            return (<Message message="Blog post does not exist" />);
        }

        return (
            <div className="card mb-3 mt-3 shadow-sm" key={post.id}>
                <div className="card-body">
                    <h2>{post.title}</h2>
                    <p className="card-text">{post.content}</p>
                    <p className="card-text border-top">
                        <small className="text-muted">
                            {timeago(post.published)} by {post.author.name}
                        </small>
                    </p>
                </div>
            </div>
        )
    }
}

export default BlogPost;