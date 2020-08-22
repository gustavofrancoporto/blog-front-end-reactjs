import React from 'react';

export class Message extends React.Component {
    render() {
        let {message} = this.props;

        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    {message}
                </div>
            </div>
        );
    }
}