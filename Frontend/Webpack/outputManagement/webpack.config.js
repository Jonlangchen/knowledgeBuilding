const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 官网上导入错误
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// entry: './src/index.js',
	entry: {
		app: './src/index.js',
		print: './src/print.js'
	},
	plugins: [
		// 官网上引用错误
		// new CleanWebpackPlugin(['dist']]),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Output Management'
		})
	],
	output: {
		// filename: 'bundle.js',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};