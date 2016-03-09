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
			},{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true')
			},{
				test: [/glyphicons-halflings-regular\.svg/, /glyphicons-halflings-regular\.eot/, /glyphicons-halflings-regular\.ttf/, /VideoJS.eot/],
				loader:'file-loader'
			},{
				test: [/glyphicons-halflings-regular\.woff/, /glyphicons-halflings-regular\.woff2/],
				loader: "url-loader?limit=10000&minetype=application/font-woff"
			},{
				test: /\.(png|jpg)$/,
				loader: 'file?name=[path][name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
			},
			{test: require.resolve('video.js'), loader:"expose?videojs"}
		]
	}
};
