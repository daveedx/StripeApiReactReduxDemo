import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CustomerListItem = props => {
    const { id, metadata } = props.customer,
        customerImage = require('../../images/customer.png'),
        getFullName = () => {
            return `${metadata.first_name} ${metadata.last_name}`;
        };

    return (
        <div className="column is-2">
            <div className="card">
                <div className="card-image">
                    <Link to={ `/customers/${id}` }>
                        <figure className="image is-4by3">
                            <img
                                src={ customerImage }
                                title={ getFullName() }
                                alt={ getFullName() }
                                width="150" />
                        </figure>
                    </Link>
                </div>
                <div className="card-content">
                    <div className="content">
                        <Link to={ `/customers/${id}` }>
                            { getFullName() }
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

CustomerListItem.propTypes = {
    customer: PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        account_balance: PropTypes.number.isRequired,
        metadata: PropTypes.shape({
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default CustomerListItem;
