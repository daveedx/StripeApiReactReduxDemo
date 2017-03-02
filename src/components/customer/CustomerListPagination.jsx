import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CustomerListPagination = ({ prevPaginationUrl, nextPaginationUrl }) => {
    let inactiveClassOnPrev = '',
        inactiveClassOnNext = '';

    if (prevPaginationUrl === '') {
        inactiveClassOnPrev = 'is-disabled';
    }
    if (nextPaginationUrl === '') {
        inactiveClassOnNext = 'is-disabled';
    }

    return (
        <nav className="pagination is-centered" aria-label="Page navigation">
            <Link
                to={ prevPaginationUrl }
                className={ `pagination-previous ${inactiveClassOnPrev}` }
                aria-label="Previous"
                title="Previous">
                    <span aria-hidden="true">&laquo; Previous</span>
            </Link>
            <Link
                to={ nextPaginationUrl }
                className={ `pagination-next ${inactiveClassOnNext}` }
                aria-label="Next"
                title="Next">
                    <span aria-hidden="true">Next &raquo;</span>
            </Link>
            <p className="pagination-list">(10 items / page)</p>
        </nav>
    );
};

CustomerListPagination.propTypes = {
    prevPaginationUrl: PropTypes.string.isRequired,
    nextPaginationUrl: PropTypes.string.isRequired
};

export default CustomerListPagination;
