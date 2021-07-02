const path = require('path'); // This is for the path of bundle.js, you dont need to install to use this just install webpack and youre good to go
const TerserPlugin = require('terser-webpack-plugin'); // ginagamit to pang minify ng code 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // Ginagamit to sa pag bundle ng css into another file
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Ginagamit to sa pag clean ng dist folder everytime na mag run yung webpack
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js',// Ginagamit to para pag samahin yung css saka javascript without linking the css in the INDEX.HTML
    output: {
        filename: 'bundle.[contenthash].js',
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
            { // Ginagamit to para pag samahin yung css saka javascript without linking the css in the INDEX.HTML
                test: /\.css$/,
                use: [
                    // 'style-loader', // This will take the css and inject it into the page using style-text, BTW using style-loader it will bundle css together with your Javascript into a single file called bundle.js
                    MiniCssExtractPlugin.loader, // Ginagamit to para i separate yung css bali magiging dalawang bundle sya bundle.js bundle.css
                    'css-loader' // Read the conten of the css and return the contents, wala na syang gagawing iba

                    // npm install css-loader style-loader --save-dev
                    // REMEMBER NA RIGHT TO LEFT YUNG PAG READ SA LOADER 
                ]
            },
            { // Ginagamit to para pag samahin yung css saka javascript without linking the css in the INDEX.HTML
                test: /\.scss$/,
                use: [
                    // 'style-loader', // This will take the css and inject it into the page using style-text, BTW using style-loader it will bundle css together with your Javascript into a single file called bundle.js
                    MiniCssExtractPlugin.loader, // Ginagamit to para i separate yung css bali magiging dalawang bundle sya bundle.js bundle.css
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
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader' // Ginagamit to sa pag add ng modified content na nasa index.hbs
                    // npm install handlebars-loader --save-dev
                    // npm install handlebars --save
                ]
            }
        ]
    },
    plugins: [
        new TerserPlugin(), // Ginagamit to pang minify ng file
        new MiniCssExtractPlugin({ // Ginagamit to sa pag bundle ng css 
            filename: 'style.[contenthash].css',
        }),
        new CleanWebpackPlugin({ // Ginagamit sa pag clean ng files or laman ng dist folder everytime we run webpack
            cleanOnceBeforeBuildPatterns: [
                '**/*', // Eto yung location ng dist 
                path.join(process.cwd(), 'build/**/*') // eto yung location ng build folder na maddelete din yung laman after we run webpack
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Hello World', // Eto yung title ng index.html
            // filename: 'subfolder/custom_filename.html'
            filename: 'index.html', // Eto yung name ng file na maiinject sa dist folder na naka specify sa output folder
            // template: './index.html', // Eto yung location ng index.html na ma cocopy or ma iinjext sa dist folder 
            template: './src/index.hbs',
            description: 'Some description'
            // meta: {
            //     description: 'Some description'
            // }
        })
        // npm install --save-dev terser-webpack-plugin
        //npm install mini-css-extract-plugin --save-dev
        //npm install clean-webpack-plugin --save-dev
        // npm install html-webpack-plugin --save-dev
    ]
}

