const config = require('config')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (opts = {}) => {
  const plugins = []

  if (opts.hmr) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  if (opts.html) {
    plugins.push(
      new HtmlWebpackPlugin({
        title: 'Ketida',
        template: '../app/index.ejs', // Load a custom template
      }),
    )
  }

  if (opts.extractText) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    )
  }

  if (opts.noEmitOnErrors) {
    plugins.push(new webpack.NoEmitOnErrorsPlugin())
  }

  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${opts.env}"`,
      'process.env.CLIENT_WS_MIN_TIMEOUT': `"${opts.clientWS.minTimeout}"`,
      'process.env.CLIENT_WS_TIMEOUT': `"${opts.clientWS.timeout}"`,
      'process.env.SERVER_PROTOCOL': `"${opts.clientEnv.serverProtocol}"`,
      'process.env.SERVER_HOST': `"${opts.clientEnv.serverHost}"`,
      'process.env.SERVER_PORT': `"${opts.clientEnv.serverPort}"`,
      'process.env.FEATURE_BOOK_STRUCTURE': opts.clientEnv.featureBookStructure,
      'process.env.LOCKS_WS_URL': `"${opts.clientEnv.locksWSURL}"`,
      'process.env.LANG_SWITCH': `"${opts.clientEnv.languageSwitch}"`,
      'process.env.FEATURE_UPLOAD_DOCX_FILES':
        opts.clientEnv.featureUploadDOCXFiles,
      'process.env.APP_VERSION': `"${opts.clientEnv.appVersion}"`,
      'process.env.APP_NAME': `"${opts.clientEnv.appName}"`,
    }),
  )

  // put dynamically required modules into the build
  if (config.validations) {
    plugins.push(
      new webpack.ContextReplacementPlugin(/./, __dirname, {
        [config.authsome.mode]: config.authsome.mode,
      }),
    )
  } else {
    plugins.push(
      new webpack.ContextReplacementPlugin(/./, __dirname, {
        [config.authsome.mode]: config.authsome.mode,
      }),
    )
  }

  plugins.push(new CopyWebpackPlugin([{ from: '../public' }]))

  plugins.push(
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin(),
  )

  return plugins
}
