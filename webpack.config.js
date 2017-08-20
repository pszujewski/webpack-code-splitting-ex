var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// We can use code splitting to deal with the end size of the bundle
// we can reduce the size of our bundle
/*
We can combine code splitting with browser caching to improve load time.
It makes sense to separate vendor from your codebase becuz you are far more likely to 
change vendor codebase a lot less than your codebase -. yours changes frequently
so in the context of browser JS caching, we should split these.
Browser caches automatically.
Code splitting of vendor from your codebase is done in webpack config
The key is to change entry
*/
/// name of each module (npm) that you want included in vendor

/*
 We use commons chunk plugin to split vendor code from our code
 plugins are like loaders, but they are more about looking at the total sum of input/ ouput that is going thru webpack
 where as loaders look at individual files... 
*/

/*
We have to make sure files are renamed if we are doing a new build. So we tweak webpack
*/

const VENDOR_LIBS = [ // each str is name of library we want to include in separate vendor file, pass
 'faker', 'react', 'react-redux', 'react-dom', 
 'react-input-range', 'redux-form', 'redux-thunk'                                             
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // replaces it with key in entry section // every time there is an update webpack will update has of file (cache-busting)
  }, // every time we make a change, the name of the file will SLIGHTLY change in the hash to tell browser it needs to update
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    // solves issue of double including. Tells webpack to look at total sum of files
    // between vendor entry point and bundle point, if any modules are identical, only add them to our vendor entry point
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // handles the chunk difference 
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
