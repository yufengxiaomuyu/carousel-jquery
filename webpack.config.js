const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: {
      main: './src/js/index.js',
  },
  output: {
      path: path.resolve(__dirname,'dist'),
      filename: '[name].bundle.js',
  },
  module: {
  	rules: [
      {
        test: /\.html$/,
        use: ['html-withimg-loader'],
      },
  		{  
  			test: /\.css$/,
  			use: ExtractTextWebpackPlugin.extract({
  				fallback: 'style-loader',
  				use: 'css-loader',
  				publicPath: '../',
  			}),
  		},
  		{
  			test: /\.(png|jpg|gif)$/,
  			use: [{
  				loader: 'url-loader',
  				options: {
  					limit: 1000,
  					outputPath: 'imgs/',
  				},
    		}],
  		},
  	],
  },
  plugins: [
  	new CleanWebpackPlugin(['dist']),
  	new webpack.HotModuleReplacementPlugin(),
  	new ExtractTextWebpackPlugin('css/index.css'),
  	new webpack.ProvidePlugin({
  		$: 'jquery',
  	}),
  	new HtmlWebpackPlugin({
  		// title: '滚动轮播',
  		template: './src/index.html',
  		hash: true,
  		minify: {
  			collapseWhitespace: true,
  			removeAttributeQuotes: true,
  		},
  	}),
  ],
  devServer: {
  	contentBase: path.resolve(__dirname,'dist'),
  	host: 'localhost',
  	port: 8080,
  	open: true,
  	hot: false,
  },
}