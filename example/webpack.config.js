module.exports = {
  entry: [
    './example.jsx',
  ],
  output: {
    path: './',
    filename: 'all.js',
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /build|node_modules/, loader: 'babel-loader'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};