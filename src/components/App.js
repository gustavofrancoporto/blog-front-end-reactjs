import React from 'react'
import {Route, Switch} from "react-router";
import Header from './Header'
import LoginForm from "./LoginForm";
import BlogPostListContainer from "./BlogPostListContainer";
import BlogPostContainer from "./BlogPostContainer";
import {request as requests} from "../agent";
import {connect} from "react-redux";
import {userProfileFetch, userSetId} from "../actions/actions";

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userProfileFetch, userSetId
};

class App extends React.Component {

    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');

        if(token) {
            requests.setToken(token);
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const {userSetId} = this.props;

        if(userId) {
            userSetId(userId);
        }
    }

    componentDidUpdate(prevProps) {
        const {userId, userData, userProfileFetch} = this.props;

        if (prevProps.userId !== userId && userId !== null && userData === null) {
            userProfileFetch(userId);
        }
    }

    render() {
        const {isAuthenticated, userData} = this.props;

        return (
            <div>
                <Header isAuthenticated={isAuthenticated} userData={userData} />
                <Switch>
                    <Route path="/" component={BlogPostListContainer} exact={true} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/blog-posts/:id" component={BlogPostContainer} />
                </Switch>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);