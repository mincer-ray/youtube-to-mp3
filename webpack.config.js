const webpack = require('webpack');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'development',

	entry: './public/index.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	
	module: {
		rules: [
			{
				test: /\.js$/,
				// include: [path.resolve(__dirname, 'public')],
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: ['syntax-dynamic-import'],
							presets: [
								[
									'@babel/preset-env',
									{
										modules: false
									}
								]
							]
						},	
					}
				]
			},
			{
				test: /\.css$/,
				
				use: [
					{
						loader: 'style-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'css-loader'
					}
				]
			}
		]
	},
};
