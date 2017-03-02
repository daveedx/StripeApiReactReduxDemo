'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const stylelintRules = require('./.stylelintrc');

const extractSass = new ExtractTextPlugin({
    filename: 'styles.css'
});

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const config = {
    context: path.join(__dirname, 'src'),
    entry: {
        vendor: [
            'axios',
            'query-string',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-redux'
        ],
        app: [
            path.join(__dirname, 'src/app.js')
        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/',
        sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',
    plugins: [
        extractSass,
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/templates/index.html'),
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    stylelint(stylelintRules),
                    autoprefixer({ browsers: ['last 2 versions', '> 1%', 'ie 9'] })
                ]
            }
        })
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: [/node_modules/],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(scss|sass)$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'resolve-url-loader'
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [].concat(
                                path.join(__dirname, 'node_modules/bulma'),
                                path.join(__dirname, 'src/stylesheets/config')
                            )
                        }
                    }, {
                        loader: 'postcss-loader'
                    }],
                    fallback: 'style-loader'
                }),
                exclude: [/node_modules/],
                include: path.join(__dirname, 'src/stylesheets')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?name=images/[name].[ext]',
                exclude: [/node_modules/],
                include: path.join(__dirname, 'src/images')
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.sass'],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    }
};

if (IS_PRODUCTION) {
    config.devtool = 'source-map';
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: config.devtool && (config.devtool.indexOf('sourcemap') >= 0 || config.devtool.indexOf('source-map') >= 0),
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    );
} else {
    config.entry.app.unshift(
        'webpack-hot-middleware/client?reload=true'
    );
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = config;
