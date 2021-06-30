const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
        // publicPath: '/dist'
        // publicPath: 'https://etoyungdirectorybagoyungimgorfile/(dito-mo-mapupunta-yung-file-after-building)'
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader' // This loader will going to import our jpg and png into dist folder
                    // npm install file-loader --save-dev
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', // This will take the css and inject it into the page using style-text, BTW using style-loader it will bundle css together with your Javascript into a single file called bundle.js
                    'css-loader' // Read the conten of the css and return the contents, wala na syang gagawing iba

                    // npm install css-loader style-loader --save-dev
                    // REMEMBER NA RIGHT TO LEFT YUNG PAG READ SA LOADER 
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // This will take the css and inject it into the page using style-text, BTW using style-loader it will bundle css together with your Javascript into a single file called bundle.js
                    'css-loader', // Read the conten of the css and return the contents, wala na syang gagawing iba
                    'sass-loader'
                    // npm install css-loader style-loader sass-loader --save-dev
                    // REMEMBER NA RIGHT TO LEFT YUNG PAG READ SA LOADER 
                ]
            },
            {
                test: /\.js$/, // This will look for all the files that ends with .js
                exclude: /node_modules/, // We need to use this para hindi ma apply sa node modules yung babel loader
                use: {
                    loader: 'babel-loader', // This is the package that convert ES6 to ES5
                    options: {
                        'presets': ["@babel/preset-env"], // This will compile Ecmascript 6,7,8,9 etc down to ES5
                        'plugins': ["@babel/plugin-proposal-class-properties"]
                        // npm install --save-dev babel-loader@7 babel-core babel-preset-env babel-plugin-transform-class-properties
                        // npm install --save-dev @babel/preset-env
                    }
                }
            }
        ]
    },
    plugins: [
        new TerserPlugin()
        // npm install --save-dev terser-webpack-plugin
    ]
}

