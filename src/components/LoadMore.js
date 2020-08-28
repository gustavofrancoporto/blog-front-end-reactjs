import React from 'react';

export class LoadMore extends React.Component {

    render() {
        const {label, disabled, showSpinner, onClick} = this.props;
        return (
            <button className="btn btn-block btn-dark" disabled={disabled} onClick={onClick}>
                {showSpinner && <i className="fas fa-spinner fa-spin"></i>} {label}
            </button>
        );
    }
}