import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import { fileURLToPath } from 'url';

import FileManagerPlugin from 'filemanager-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => ({
  entry: './src/js/index.js',
  output: {
    filename: 'js/main.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|bmp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.css$/i,
        exclude: path.resolve(__dirname, 'src/css/ok_postcss'),
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: env.prod ? false : true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: path.resolve(__dirname, 'src/css/no_postcss'),
        use: [
          // Use MiniCssExtractPlugin.loader in production, style-loader in development
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader', // 3. Injects styles into the DOM
          {
            loader: 'css-loader', // 2. Loads CSS file with resolved imports
            options: {
              sourceMap: env.prod ? false : true,
              importLoaders: 1, // Important: ensures PostCSS runs on @imports
            },
          },
          {
            loader: 'postcss-loader', // 1. Processes CSS with PostCSS plugins
            options: {
              // sourceMap: env.prod ? false : true,
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions', // Target specific browsers
                      // stage: 3, // Enable all stable features
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
      },
    }),
  ],
  devServer: {
    hot: true,
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
});
