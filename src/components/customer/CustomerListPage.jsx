import React, { PropTypes } from 'react';
import CustomerListItem from './CustomerListItem';
import CustomerListPagination from './CustomerListPagination';

const CustomerListPage = ({ customers, totalCount, prevPaginationUrl, nextPaginationUrl }) => {
    if (customers === null) {
        return null;
    }

    if (!customers.length) {
        return (
            <div className="customers-list">
                <h1 className="title is-1 has-text-centered">Customers</h1>
                <p>No customers.</p>
            </div>
        );
    }

    return (
        <div className="customers-list">
            <h1 className="title is-1 has-text-centered">
                Customers <span className="tag is-info is-medium">{ totalCount } item(s)</span>
            </h1>

            <CustomerListPagination
                prevPaginationUrl={ prevPaginationUrl }
                nextPaginationUrl={ nextPaginationUrl } />

            <div className="columns is-multiline">
                {customers.map(
                    customer => <CustomerListItem
                        key={ customer.id }
                        customer={ customer } />
                )}
            </div>

            <CustomerListPagination
                prevPaginationUrl={ prevPaginationUrl }
                nextPaginationUrl={ nextPaginationUrl } />
        </div>
    );
};

CustomerListPage.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        account_balance: PropTypes.number.isRequired,
        metadata: PropTypes.shape({
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired),
    totalCount: PropTypes.number.isRequired,
    prevPaginationUrl: PropTypes.string.isRequired,
    nextPaginationUrl: PropTypes.string.isRequired
};

export default CustomerListPage;
