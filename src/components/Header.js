import React from 'react';
import {Link} from "react-router-dom";

class Header extends React.Component {

    renderUser() {
        const {userData, logout} = this.props;

        if(null === userData) {
            return (<i className="fas fa-spinner fa-spin"></i>)
        }

        return (
            <span className="navbar-nav">
                Hello {userData.name}
                <button className="btn btn-link" onClick={logout}>Logout</button>
            </span>
        );
    }

    render() {
        const {isAuthenticated} = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    Blog Site
                </Link>
                <ul className="navbar-nav mr-auto">
                    {
                        !isAuthenticated &&
                        (
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        )
                    }
                </ul>
                <span className="navbar-text">
                    {isAuthenticated ? this.renderUser() : <Link to="/login">Sign-in</Link>}
                </span>

            </nav>
        );
    }
}

export default Header;