const glob = require("glob");
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const path    = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  entry: glob.sync("./app/javascript/packs/**/*.{js,jsx,scss}")
             .reduce((entries, pack) => Object.assign(entries, { [pack.substr(23).replace(/BACKSLASH.js(x)?$/, '')]: pack }), {}),
  mode,
  module: {
    rules: [
      // transpile js using Babel
      {
        test: /BACKSLASH.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // compile css from scss, but leave asset url substitution to sprockets
      {
        test: /BACKSLASH.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { url: false }, }, 'sass-loader'],
      },
      // emit images from app/javascript to assets
      {
        loader: 'file-loader',
        options: {
          name(resourcePath, _resourceQuery) {
            return resourcePath.replace(/^.*appBACKSLASH/javascriptBACKSLASH/imagesBACKSLASH//, '');
          },
        },
        test: /BACKSLASH.(png|jpe?g|gif|eot|ico|otf|webp|woff2|woff|ttf|tiff|svg)$/i,
      },
    ],
  },
  optimization: { moduleIds: 'deterministic' },
  output: {
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin(),
  ],
  resolve: { extensions: ['.js', '.jsx', '.scss', '.css'], },
}
