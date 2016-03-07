var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './client/index.js',
	devtool:'source-map',
	output: {
		filename: 'bundle.js',
		publicPath: ''
	},

	plugins: [
		new ExtractTextPlugin("style.css")
	].concat(process.env.NODE_ENV === 'production' ? [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	] : []),

	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('css-loader?sourceMap!less-loader?sourceMap=true&sourceMapContents=true')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css-loader?sourceMap=true')
			}
		]
	}
};
