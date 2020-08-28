import React from 'react'
import CommentList from "./CommentList";
import {commentListFetch, commentListUnload} from "../actions/actions";
import {connect} from "react-redux";
import {Spinner} from "./Spinner";
import CommentForm from "./CommentForm";
import {LoadMore} from "./LoadMore";

const mapStateToProps = state => ({
    ...state.commentList,
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
    commentListFetch,
    commentListUnload
};

class CommentListContainer extends React.Component {

    componentDidMount() {
        this.props.commentListFetch(this.props.blogPostId);
    }

    componentWillUnmount() {
        this.props.commentListUnload();
    }

    onLoadMoreClick() {
        const {blogPostId, currentPage, commentListFetch} = this.props;
        commentListFetch(blogPostId, currentPage);
    }

    render() {
        const {comments, isFetching, isAuthenticated, blogPostId, currentPage, pageCount} = this.props;
        const showLoadMore = pageCount > 1 && currentPage <= pageCount;

        if (isFetching && currentPage === 1) {
            return (<Spinner />);
        }

        return (
            <div>
                <CommentList comments={comments} />
                {showLoadMore && <LoadMore label="Load more comments..." disabled={isFetching}  showSpinner={isFetching}
                                           onClick={this.onLoadMoreClick.bind(this)} />}
                {isAuthenticated && <CommentForm blogPostId={blogPostId} />}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);