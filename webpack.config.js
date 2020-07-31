const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

webpackSetting = {}

webpackSetting.entry = {
  test: './src/js/color-test.js'
}

webpackSetting.plugins =[ 
  new HtmlWebpackPlugin({
    chunks:['test'],
    template: 'src/js/color-test.ejs'
  })
]
webpackSetting.devtool = 'source-map' 
webpackSetting.module = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader']
    }
  ]
}

webpackSetting.output = {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, 'dist') 
}

module.exports = webpackSetting
// vi: se ts=2 sw=2 et:
