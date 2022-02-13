import 'dotenv/config';
import path from 'path';
import {
  Configuration as WebpackConfiguration,
  HotModuleReplacementPlugin,
  DefinePlugin,
} from 'webpack';
import { Configuration as WebpackDevConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const {
  HOST = 'localhost',
  PORT = '4410',
  AUTH_API_HOST = 'localhost',
  NODE_ENV,
} = process.env;

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevConfiguration;
}

const webpackMode: Configuration['mode'] =
  NODE_ENV === 'development' ? 'development' : 'production';

const config: Configuration = {
  mode: webpackMode,
  context: __dirname,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    /*  Temporary solution  */
    new DefinePlugin({
      process: {
        env: {
          AUTH_API_HOST: JSON.stringify(AUTH_API_HOST),
        },
      },
    }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    host: HOST,
    port: +PORT,
    open: false,
    hot: true,
    compress: true,
  },
};

export default config;
