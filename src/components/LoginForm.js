import React from 'react'
import {reduxForm, Field} from "redux-form";
import {renderField} from "../form";
import {connect} from "react-redux";
import {userLoginAttempt} from "../actions/actions";

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userLoginAttempt
};

class LoginForm extends React.Component {

    componentDidUpdate(prevProps) {
        if(prevProps.token !== this.props.token) {
            this.props.history.push('/');
        }
    }

    onSubmit(values) {
        return this.props.userLoginAttempt(values.username, values.password);
    }

    render() {
        const {handleSubmit, error} = this.props;

        return (
            <div className="text-center">
                {error && <div className="alert alert-danger">{error}</div>}
                <form action="" className="my-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field type="text" name="username" label="Username" component={renderField}></Field>
                    <Field type="password" name="password" label="Password" component={renderField}></Field>
                    <button type="submit" className="btn btn-primary btn-big btn-block">Login</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'LoginForm'
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm));