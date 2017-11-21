/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */

const path = require('path')
const pkg = require('./package.json')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './sample/main'
  },
  output: {
    path: path.join(process.cwd(), './dist'),
    publicPath: '/worker-thread/dist/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /worker\.js$/,
        use: { loader: 'worker-loader' }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vender', // Move dependencies to our vender file
      children: true, // Look for common dependencies in all children,
      async: true,
      minChunks: 2 // How many times a dependency must come up before being extracted
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '\'' + process.env.NODE_ENV + '\'',
        'VERSION': '\'' + pkg.version + '\''
      }
    })
  ]
}
