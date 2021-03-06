const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractCss = require('mini-css-extract-plugin')
const path = require('path')

webpackSetting = {}

webpackSetting.mode = 'development'

webpackSetting.entry = {
  test: ['./src/color-test.ts',
          './src/color-test.less']
}

webpackSetting.plugins =[ 
  new HtmlWebpackPlugin({
    chunks:['test'],
    template: 'src/color-test.ejs'
  }),
  new ExtractCss({
  })
]
webpackSetting.devtool = 'source-map' 

webpackSetting.module = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader']
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: ExtractCss.loader
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'less-loader'
        }
      ]
    },
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] 
          } 
        },
        {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig-test.json'
          }
        }],
      exclude: /node_modules/,
    }
  ]
}

webpackSetting.output = {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, 'test') 
}

webpackSetting.resolve = {
  extensions: ['.ts']
}

module.exports = webpackSetting
// vi: se ts=2 sw=2 et:
