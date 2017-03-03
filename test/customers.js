/* eslint no-undef: "off" */
/* eslint no-unused-vars: "off" */

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server/test');

const should = chai.should();
chai.use(chaiHttp);

describe('Customers', function() {
    let testCustomerId = null;

    beforeEach(function(done) {
        chai.request(server)
            .post('/api/customers')
            .send({
                email: 'test@customer.com',
                description: 'description test text',
                account_balance: 100,
                metadata: {
                    'first_name': 'first name',
                    'last_name': 'last name'
                }
            })
            .end(function(err, res) {
                if (res.body.err !== '') {
                    console.log(res.body.err);
                    done();

                    return;
                }

                testCustomerId = res.body.resp.id;

                done();
            });
    });

    afterEach(function(done) {
        if (testCustomerId === null) {
            done();

            return;
        }

        chai.request(server)
            .delete('/api/customers/' + testCustomerId)
            .end(function() {
                done();
            });
    });

    it('should list ALL customers on /customers GET', function(done) {
        chai.request(server)
            .get('/api/customers')
            .end(function(err, res) {
                if (res.body.err !== '') {
                    console.log(res.body.err);
                    done();

                    return;
                }

                const responseData = res.body.resp.data;
                const firstItem = responseData[0];

                res.should.have.status(200);
                res.should.be.json;
                responseData.should.be.a('array');
                firstItem.should.have.property('id');
                firstItem.should.have.property('email');
                firstItem.should.have.property('account_balance');
                firstItem.should.have.property('description');
                firstItem.should.have.property('metadata');
                firstItem.metadata.should.be.a('object');
                firstItem.metadata.should.have.property('first_name');
                firstItem.metadata.should.have.property('last_name');
                firstItem.email.should.equal('test@customer.com');
                firstItem.account_balance.should.equal(100);
                firstItem.description.should.equal('description test text');
                firstItem.metadata.first_name.should.equal('first name');
                firstItem.metadata.last_name.should.equal('last name');

                done();
            });
    });

    it('should list a SINGLE customer on /customers/:<id> GET', function(done) {
        chai.request(server)
            .get('/api/customers/' + testCustomerId)
            .end(function(err, res) {
                if (res.body.err !== '') {
                    console.log(res.body.err);
                    done();

                    return;
                }

                const responseData = res.body.resp;

                res.should.have.status(200);
                res.should.be.json;
                responseData.should.be.a('object');
                responseData.should.have.property('id');
                responseData.should.have.property('email');
                responseData.should.have.property('account_balance');
                responseData.should.have.property('description');
                responseData.should.have.property('metadata');
                responseData.metadata.should.be.a('object');
                responseData.metadata.should.have.property('first_name');
                responseData.metadata.should.have.property('last_name');
                responseData.email.should.equal('test@customer.com');
                responseData.account_balance.should.equal(100);
                responseData.description.should.equal('description test text');
                responseData.metadata.first_name.should.equal('first name');
                responseData.metadata.last_name.should.equal('last name');

                done();
            });
    });

    it('should add a SINGLE customer on /customers POST', function(done) {
        chai.request(server)
            .post('/api/customers')
            .send({
                email: 'test2@customer.com',
                description: 'description test text',
                account_balance: 200,
                metadata: {
                    'first_name': 'first name',
                    'last_name': 'last name'
                }
            })
            .end(function(err, res) {
                if (res.body.err !== '') {
                    console.log(res.body.err);
                    done();

                    return;
                }

                const responseData = res.body.resp;

                res.should.have.status(200);
                res.should.be.json;
                responseData.should.be.a('object');
                responseData.should.have.property('id');
                responseData.should.have.property('email');
                responseData.should.have.property('account_balance');
                responseData.should.have.property('description');
                responseData.should.have.property('metadata');
                responseData.metadata.should.be.a('object');
                responseData.metadata.should.have.property('first_name');
                responseData.metadata.should.have.property('last_name');
                responseData.email.should.equal('test2@customer.com');
                responseData.account_balance.should.equal(200);
                responseData.description.should.equal('description test text');
                responseData.metadata.first_name.should.equal('first name');
                responseData.metadata.last_name.should.equal('last name');

                chai.request(server)
                    .delete('/api/customers/' + res.body.resp.id)
                    .end(function() {
                        done();
                    });
            });
    });

    it('should update a SINGLE customer on /customers/:<id> PUT', function(done) {
        chai.request(server)
            .put('/api/customers/' + testCustomerId)
            .send({
                email: 'test3@customer.com',
                description: 'description test text',
                account_balance: 300,
                metadata: {
                    'first_name': 'first name',
                    'last_name': 'last name'
                }
            })
            .end(function(err, res) {
                if (res.body.err !== '') {
                    console.log(res.body.err);
                    done();

                    return;
                }

                const responseData = res.body.resp;

                res.should.have.status(200);
                res.should.be.json;
                responseData.should.be.a('object');
                responseData.should.have.property('id');
                responseData.should.have.property('email');
                responseData.should.have.property('account_balance');
                responseData.should.have.property('description');
                responseData.should.have.property('metadata');
                responseData.metadata.should.be.a('object');
                responseData.metadata.should.have.property('first_name');
                responseData.metadata.should.have.property('last_name');
                responseData.email.should.equal('test3@customer.com');
                responseData.account_balance.should.equal(300);
                responseData.description.should.equal('description test text');
                responseData.metadata.first_name.should.equal('first name');
                responseData.metadata.last_name.should.equal('last name');

                done();
            });
    });

    it('should delete a SINGLE customer on /customers/:<id> DELETE', function(done) {
        chai.request(server)
            .delete('/api/customers/' + testCustomerId)
            .end(function(err, res) {
                if (res.body.err !== '') {
                    console.log(res.body.err);
                    done();

                    return;
                }

                const responseData = res.body.resp;

                res.should.have.status(200);
                res.should.be.json;
                responseData.should.be.a('object');
                responseData.should.have.property('deleted');
                responseData.should.have.property('id');
                responseData.deleted.should.be.true;
                responseData.id.should.equal(testCustomerId);

                done();
            });
    });
});
