import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import CustomerListPage from '../components/customer/CustomerListPage';
import {
    setProgressBarVisibility,
    ProgressBarVisibilities,
    clearGlobalMessages,
    displayErrorMessage,
    displaySuccessMessage
} from '../actions';

const { SHOWN, HIDDEN } = ProgressBarVisibilities;

class CustomerListPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: null,
            totalCount: 0,
            prevPaginationUrl: '',
            nextPaginationUrl: ''
        };
    }

    _getCustomers(query) {
        this.props.getCustomers(query).then(customersData => {
            this.setState({
                customers: customersData.customers,
                totalCount: customersData.totalCount,
                prevPaginationUrl: customersData.prevPaginationUrl,
                nextPaginationUrl: customersData.nextPaginationUrl
            });
        });
    }

    componentWillMount() {
        this._getCustomers(this.props.location.query);
    }

    componentWillReceiveProps (nextProps) {
        if (!Object.keys(this.props.location.query).length &&
            !Object.keys(nextProps.location.query).length) {
            return;
        }

        this._getCustomers(nextProps.location.query);
    }

    render() {
        return (
            <CustomerListPage
                customers={ this.state.customers }
                totalCount={ this.state.totalCount }
                prevPaginationUrl={ this.state.prevPaginationUrl }
                nextPaginationUrl={ this.state.nextPaginationUrl } />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCustomers(urlQuery = {}) {
            let customersData = {
                    customers: [],
                    totalCount: 0,
                    prevPaginationUrl: '',
                    nextPaginationUrl: ''
                },
                urlQueryString = '',
                isPrevPage = false,
                isNextPage = false;

            if (Object.keys(urlQuery).length !== 0) {
                urlQueryString = '?' + queryString.stringify(urlQuery);

                if (Object.keys(urlQuery)[0] === 'ending_before') {
                    isPrevPage = true;
                }
                if (Object.keys(urlQuery)[0] === 'starting_after') {
                    isNextPage = true;
                }
            }

            dispatch(setProgressBarVisibility(SHOWN));

            return axios.get(`/api/customers${urlQueryString}`)
                .then(response => {
                    if (response.data.err !== '') {
                        dispatch(displayErrorMessage(response.data.err));
                    } else {
                        const hasMorePage = response.data.resp.has_more,
                            customers = response.data.resp.data.map(obj => obj),
                            totalCount = response.data.resp.total_count;
                        let prevPaginationUrl = '',
                            nextPaginationUrl = '';

                        if (!customers.length) {
                            dispatch(setProgressBarVisibility(HIDDEN));
                            return customersData;
                        }

                        if ((isPrevPage && hasMorePage) || isNextPage) {
                            const firstItem = customers[0];

                            prevPaginationUrl = `/customers?ending_before=${firstItem.id}`;
                        }

                        if ((isPrevPage && !hasMorePage) || hasMorePage) {
                            const lastItem = customers[Object.keys(customers)[Object.keys(customers).length - 1]];

                            nextPaginationUrl = `/customers?starting_after=${lastItem.id}`;
                        }

                        customersData = {
                            customers,
                            totalCount,
                            prevPaginationUrl,
                            nextPaginationUrl
                        };
                    }

                    dispatch(displaySuccessMessage('List has been loaded.'));
                    setTimeout(() => {
                        dispatch(clearGlobalMessages());
                    }, 3000);
                    dispatch(setProgressBarVisibility(HIDDEN));

                    return customersData;
                })
                .catch(err => {
                    dispatch(displayErrorMessage(err));
                    dispatch(setProgressBarVisibility(HIDDEN));

                    return customersData;
                });
        }
    };
};

CustomerListPageContainer.propTypes = {
    getCustomers: PropTypes.func.isRequired
};

export default connect(
    null,
    mapDispatchToProps
)(CustomerListPageContainer);

