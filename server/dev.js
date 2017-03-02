'use strict';

import path from 'path';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import webpackConfig from '../webpack.config.js';
import apiRoutes from './routes';

const defaultPort = 8000;
const port = typeof process.env.PORT === 'undefined' ? defaultPort : process.env.PORT;

const app = new express();

const compiler = webpack(webpackConfig);
const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.use('/api', apiRoutes);

app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../public/index.html')));
    res.end();
});

http.createServer(app).listen(port, 'localhost', function onStart(err) {
    if (err) {
        console.log(err);
    }

    console.info(`DEV server is running on http://localhost:${port}/.`);
});

module.exports = app;
