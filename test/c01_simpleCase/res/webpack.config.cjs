// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
// var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
// var WebpackObfuscator = require('webpack-obfuscator');

const pathRelFolder_Src_or_PsobfOut = './src';

module.exports = {
  entry: `${pathRelFolder_Src_or_PsobfOut}/main.tsx`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // mode: 'development',
  mode: 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // isProductionBuild ? MiniCssExtractPlugin.loader : "style-loader",
          // {
          //   loader: 'typings-for-css-modules?modules',
          // },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            //   importLoaders: 1,
            //   localIdentName: "[name]_[local]_[hash:base64]",
            //   sourceMap: true,
            //   minimize: true
            // }
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // devtool: prod ? undefined : 'source-map',
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   "jquery-ui": "jquery-ui",
    // }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      filename: 'outhwp.html',
      inject: 'body',
      // template: `./${pathRelFolder_Src_or_PsobfOut}/index.html`,
      template: `./index.html`,
    }),
    new MiniCssExtractPlugin(),
  ],
};
