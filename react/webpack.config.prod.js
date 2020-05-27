const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  output: {
    filename: require('path').join('assets', 'scripts', '[name].[hash:5].js'),
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    pathinfo: false
  },
  optimization: {
    noEmitOnErrors: true,
    moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          reuseExistingChunk: true
        },
        commons: {
          chunks: 'initial',
          name: 'common',
          minChunks: 1,
          maxInitialRequests: Infinity,
          minSize: 0
        }
      }
    },
    runtimeChunk: {
      name: (entry) => `r~${entry.name}`
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false
      }),
      new OptimizeCSSAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        },
        canPrint: false
      })
    ]
  },
  performance: {
    hints: false
  },
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-router': 'ReactRouter',
      // 'react-router-dom': 'ReactRouterDOM',
      redux: 'Redux',
      'redux-thunk': 'ReduxThunk',
      antd: 'antd',
      'oidc-client': 'Oidc'
    }
  ]
};
