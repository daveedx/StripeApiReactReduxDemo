'use strict';

import path from 'path';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import apiRoutes from './routes';

const defaultPort = 8000;
const port = typeof process.env.PORT === 'undefined' ? defaultPort : process.env.PORT;

const app = new express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api', apiRoutes);

app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

http.createServer(app).listen(port, 'localhost', function onStart(err) {
    if (err) {
        console.log(err);
    }

    console.info(`PROD server is running on http://localhost:${port}/.`);
});

module.exports = app;
