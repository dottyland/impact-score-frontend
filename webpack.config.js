const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
	CleanWebpackPlugin
} = require("clean-webpack-plugin");

module.exports = {
	entry: {
		main: "./src/index.js",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
		publicPath: "/",
	},
	target: ["web", "es5"],
	stats: {
		children: true
	},
	mode: "development",
	devServer: {
		static: path.resolve(__dirname, "./dist"),
		compress: true,
		port: 8080,
		open: true,
		historyApiFallback: true,
	},
	devtool: "inline-source-map",
	module: {
		rules: [{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: "/node_modules/",
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'images',
						name: '[name].[ext]'
					}
				}]
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
		new CleanWebpackPlugin(),
	],
};