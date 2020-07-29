const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  entry: {
    index: './src/scripts/main.js',
    about: './src/scripts/about.js',
    analytics: './src/scripts/analytics.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './scripts/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { importLoaders: 2 }
        },
          'postcss-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: 'file-loader?name=./images/[name].[ext]&esModule=false'
      },
      {
        test: /\.(woff|woff2|ttf)$/i,
        use: 'file-loader?name=./vendors/fonts/[name].[ext]'
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './styles/[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/main.html',
      chunks: ['index'],
      filename: 'index.html',
      // filename: './pages/index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/about.html',
      chunks: ['about'],
      filename: 'about.html',
      // filename: './pages/about.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/analytics.html',
      chunks: ['analytics'],
      filename: 'analytics.html',
      // filename: './pages/analytics.html',
    }),
    new WebpackMd5Hash(),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
  ],
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist/'),
  //   // compress: false,
  //   port: 8080
  // }
}