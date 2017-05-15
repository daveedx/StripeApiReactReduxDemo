# Stripe API with ExpressJS, React and Redux

This is a JavaScript RESTful API demo that uses [Stripe API](https://stripe.com/), built on [ExpressJS](http://expressjs.com/) with [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/).
The app is fully responsive, built on [Bulma](http://bulma.io/).

## System requirements

 - **node version** >= 6.9.4
 - **npm version** >= 3.10.10

## Installation

You should have **nodejs** and **npm** installed on your machine.
Please follow instructions here:
[https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)


Development run:
```sh
$ cd <application_directory_root>
$ npm start
```

Production run:
```sh
$ cd <application_directory_root>
$ npm run start-prod
```

It will install all the node packages you need automatically.
Once the installation and webpack build are finished, open [http://localhost:8000](http://localhost:8000) in your browser.

## Testing

RESTful API endpoints tests with [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/).
```sh
$ cd <application_directory_root>
$ npm run test
```
