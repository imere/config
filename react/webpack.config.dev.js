const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  output: {
    filename: require('path').join('assets', 'scripts', '[name].js')
  },
  devServer: {
    disableHostCheck: true,
    overlay: true
  },
  optimization: {
    noEmitOnErrors: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      chunks: 'all',
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
          maxInitialRequests: 5,
          minSize: 0
        }
      }
    },
    runtimeChunk: {
      name: (entry) => `r~${entry.name}`
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new ProgressBarPlugin(),
    new ForkTsCheckerPlugin({
      checkSyntacticErrors: true,
      memoryLimit: 512,
      workers: 1,
      silent: false
    })
  ]
};
