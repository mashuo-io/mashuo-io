var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: 'mocha!./client/index.spec.js',
	devtool:'#source-map',
	output: {
		filename: 'tests.js',
		publicPath: ''
	},

	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' }
		]
	}
};
