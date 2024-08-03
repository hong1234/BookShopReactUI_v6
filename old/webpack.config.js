module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000
    },
    module: {
        rules: [
        {
	test: /\.m?js$/,
	exclude: /(node_modules)/,
	use: {
	    loader: 'babel-loader',
	    options: {
		presets: ['@babel/preset-env', '@babel/preset-react'],
		plugins: ['@babel/plugin-proposal-class-properties']
	    }
	}
        },
        {
            test: /\.(css|scss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }
       ]
    }
};
