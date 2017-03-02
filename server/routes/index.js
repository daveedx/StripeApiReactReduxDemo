'use strict';

const express = require('express');
const config = require('../../config');

const router = express.Router();
const stripe = require('stripe')(config.STRIPE_API_KEY);

// *** api routes *** //
router.route('/customers/:id')
	.get(getCustomerById)
	.put(updateCustomer)
	.delete(deleteCustomer);

router.route('/customers')
	.get(listCustomers)
	.post(addCustomer);

router.get('/', function(req, res) {
    res.send('Hello, World!');
});

// *** get ALL Customers *** //
function listCustomers(req, res) {
    let params = {
        'limit': config.CUSTOMER_LIST_ITEMS_PER_PAGE,
        'include[]': 'total_count',
    };

    if (typeof req.query.ending_before !== 'undefined' && req.query.ending_before !== '') {
        params.ending_before = req.query.ending_before;
    }
    if (typeof req.query.starting_after !== 'undefined' && req.query.starting_after !== '') {
        params.starting_after = req.query.starting_after;
    }
    
    stripe.customers.list(params, function(err, customers) {
        res.json(generateResponse(err, customers));
    });
}

// *** get SINGLE Customer *** //
function getCustomerById(req, res) {
    stripe.customers.retrieve(req.params.id, function(err, customer) {
        res.json(generateResponse(err, customer));
    });
}

// *** post SINGLE Customer *** //
function addCustomer(req, res) {
    stripe.customers.create({
        email: req.body.email,
        description: req.body.description,
        account_balance: parseInt(req.body.account_balance),
        metadata: {
            'first_name': req.body.metadata.first_name,
            'last_name': req.body.metadata.last_name
        }
    }, function(err, customer) {
        res.json(generateResponse(err, customer));
    });
}

// *** put SINGLE Customer *** //
function updateCustomer(req, res) {
    stripe.customers.update(req.params.id, {
        email: req.body.email,
        description: req.body.description,
        account_balance: parseInt(req.body.account_balance),
        metadata: {
            'first_name': req.body.metadata.first_name,
            'last_name': req.body.metadata.last_name
        }
    }, function(err, customer) {
        return res.json(generateResponse(err, customer));
    });
}

// *** delete SINGLE Customer *** //
function deleteCustomer(req, res) {
    stripe.customers.del(req.params.id, function(err, confirmation) {
        res.json(generateResponse(err, confirmation));
    });
}

function generateResponse(err, respData) {
    let errorMessage = '';
    if (err !== null && typeof err.message !== 'undefined') {
        errorMessage = err.message;
    }

    return {
        err: errorMessage,
        resp: respData
    };
}

module.exports = router;
