import React from 'react';
import { Link } from 'react-router';

const NavBar = () => {
    const handleHamburgerMenuToggle = () => {
        const navMenuClassList = document.querySelector('.nav-menu').classList;

        navMenuClassList.toggle('is-active');
    };

    return (
        <nav className="nav has-shadow">
            <div className="nav-left">
                <Link to="/" className="nav-item">
                    <strong>Stripe API Demo Home</strong>
                </Link>
                <Link
                    to="/customer"
                    className="nav-item is-tab is-hidden-mobile"
                    activeClassName="is-active"
                    title="Add customer">
                        Add
                </Link>
                <Link
                    to="/customers"
                    className="nav-item is-tab is-hidden-mobile"
                    activeClassName="is-active"
                    title="List Customers">
                        List
                </Link>
            </div>

            <div className="nav-right nav-menu">
                <Link
                    to="/customer"
                    className="nav-item is-tab is-hidden-tablet"
                    activeClassName="is-active"
                    title="Add customer">
                        Add customer
                </Link>
                <Link
                    to="/customers"
                    className="nav-item is-tab is-hidden-tablet"
                    activeClassName="is-active"
                    title="List Customers">
                        List Customers
                </Link>
            </div>

            <span className="nav-toggle" onClick={ handleHamburgerMenuToggle }>
                <span></span>
                <span></span>
                <span></span>
            </span>
        </nav>
    );
};

export default NavBar;
