/* karma.conf.js */
module.exports = function karmaConfig(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // frameworks to use
        frameworks: ['jasmine'],

        files: ['test/*.js'],

        preprocessors: {
            // add webpack as preprocessor
            'test/*.js': ['webpack', 'sourcemap']
        },

        webpack: { // kind of a copy of your webpack config
            devtool: 'inline-source-map', // just do inline source maps instead of the default
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /\/node_modules\//,
                        loader: 'babel-loader',
                    }
                ]
            },
            externals: {
                cheerio: 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            }
        },

        reporters: ['nyan'],

        plugins: [
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-nyan-reporter',
            require('karma-webpack')
        ]
    });
};
