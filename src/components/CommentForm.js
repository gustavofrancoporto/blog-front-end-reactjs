import React from 'react'
import {reduxForm, Field} from "redux-form";
import {renderField} from "../form";
import {connect} from "react-redux";
import {commentAdd} from "../actions/actions";

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
    commentAdd

};

class CommentForm extends React.Component {

    onSubmit(values) {
        const {commentAdd, blogPostId, reset} = this.props;

        return commentAdd(values.content, blogPostId).then(() => reset());
    }

    render() {
        const {handleSubmit, submitting} = this.props;

        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field type="textarea" name="content" label="Type your comment:" component={renderField}></Field>
                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting}>Add Comment</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'CommentForm'
})(connect(mapStateToProps, mapDispatchToProps)(CommentForm));