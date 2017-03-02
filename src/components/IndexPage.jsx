import React from 'react';
import { Link } from 'react-router';

const IndexPage = () => {
    const customerListImage = require('../images/customer.png'),
        customerAddImage = require('../images/customer_add.png');

    return (
        <div className="homepage">
            <h1 className="title is-1 has-text-centered">Hello!</h1>
            <p>This is a demo application that uses Stripe API with React/Redux.</p>
            <p>Please choose from the list below.</p>

            <br />
            <div className="columns">
                <div className="column is-2">
                    <div className="card">
                        <div className="card-image">
                            <Link to="/customer">
                                <figure className="image is-4by3">
                                    <img
                                        src={ customerAddImage }
                                            title="Add customer"
                                            alt="Add customer"
                                            width="150" />
                                </figure>
                            </Link>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <Link to="/customer" title="Add customer">
                                    Add customer
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-2">
                    <div className="card">
                        <div className="card-image">
                            <Link to="/customers">
                                <figure className="image is-4by3">
                                    <img
                                        src={ customerListImage }
                                            title="List customers"
                                            alt="List customers"
                                            width="150" />
                                </figure>
                            </Link>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <Link to="/customers" title="List customers">
                                    List customers
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;

