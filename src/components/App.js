import React from 'react'
import {Route, Switch} from "react-router";
import Header from './Header'
import LoginForm from "./LoginForm";
import BlogPostListContainer from "./BlogPostListContainer";
import BlogPostContainer from "./BlogPostContainer";
import {request as requests} from "../agent";

class App extends React.Component {

    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');

        if(token) {
            requests.setToken(token);
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/" component={BlogPostListContainer} exact={true} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/blog-posts/:id" component={BlogPostContainer} />
                </Switch>
            </div>
        )
    }
}

export default App;