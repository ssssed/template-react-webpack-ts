const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  mode: 'development',
  devServer: {
    static: './development',
    historyApiFallback: true,
    port: 3000,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node-modules/,
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
        test: /\.(scss|sass|css)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpeg|gif|ico|jpg|woff(2)?|eot|ttf|otf|svg)$/i,
        use: ['file-loader'],
      },
      {},
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      favicon: path.resolve("src",
          "assets", "favicon.png")
    }),
    new FaviconsWebpackPlugin({
          logo: path.resolve("src", "assets", "favicon.png"),
          inject: htmlPlugin =>
              path.basename(htmlPlugin.options.filename) === 'index.html',
        }
    ),
    new CleanWebpackPlugin(),
  ],
};
