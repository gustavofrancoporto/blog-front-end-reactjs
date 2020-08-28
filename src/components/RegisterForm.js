import React from 'react';
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {userRegister} from "../actions/actions";
import {renderField} from "../form";

const mapDispatchToProps = {
    userRegister
};

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { termsAccepted: false };
    }

    onSubmit(values) {
        return this.props.userRegister(...Object.values(values))
            .then(() => this.props.reset());
    }

    onTermsAcceptedClick(e) {
        this.setState(prevState => ({ termsAccepted: !prevState.termsAccepted }));
    }

    render() {
        const {handleSubmit, submitting} = this.props;
        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="username" label="Username: " type="text" component={renderField} />
                        <Field name="password" label="Password: " type="password" component={renderField} />
                        <Field name="retypedPassword" label="Re-typed password: " type="password" component={renderField} />
                        <Field name="email" label="E-mail: " type="text" component={renderField} />
                        <Field name="name" label="Name: " type="text" component={renderField} />

                        <div className="form-check form-group">
                            <input id="terms-check" type="checkbox" className="form-check-input" value={false}
                                    onClick={this.onTermsAcceptedClick.bind(this)} />
                            <label htmlFor="terms-check" className="form-check-label">I agree to the terms and conditions</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting}>Register</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default reduxForm({
    form: 'RegisterForm'
})(connect(null, mapDispatchToProps)(RegisterForm));