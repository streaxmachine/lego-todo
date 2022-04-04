const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = merge(
    commonConfiguration,
    {
        mode: 'production',
        output: {
            publicPath: ASSET_PATH,
          },
        plugins:
        [
            new CleanWebpackPlugin()
        ]
    }
)
