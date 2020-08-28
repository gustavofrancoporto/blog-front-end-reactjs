import React from "react";
import classNames from 'classnames';

export class Paginator extends React.Component {

    constructor(props) {
        super(props);

        const {pageCount} = this.props;
        this.range = [];

        for (let i = 1 ; i <= pageCount; i++ ) {
            this.range.push(i);
        }
    }

    render() {
        const {currentPage, setPage, previousPage, nextPage, pageCount} = this.props;
        return (
            <nav>
                <ul className="pagination">
                    <li className={classNames('page-item', { disabled : currentPage === 1})}>
                        <button className="page-link"
                                onClick={() => previousPage()}>Previous</button>
                    </li>
                    {
                        this.range.map(page => {
                            return (
                                <li key={page} className={classNames('page-item', { active : currentPage === page})}>
                                    <button className="page-link" onClick={() => setPage(page)}>{page}</button>
                                </li>
                            )
                        })
                    }
                    <li className={classNames('page-item', { disabled : currentPage === pageCount})}>
                        <button className="page-link" onClick={() => nextPage()} >Next</button>
                    </li>
                </ul>
            </nav>
        );
    }
}