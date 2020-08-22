const path = require('path')

webpackSetting = {}

webpackSetting.mode = 'development'

webpackSetting.entry = {
  index: ['./src/index.js']
}

webpackSetting.plugins =[ 
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
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig-lib.json'
        }
      }],
      exclude: /node_modules/,
    }
  ]
}

webpackSetting.output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist'),
  library: '@oc-soft/color-picker',
  libraryTarget: 'umd'
}

module.exports = webpackSetting
// vi: se ts=2 sw=2 et:
