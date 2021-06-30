const path = require('path');

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
                    'file-loader' // npm install file-loader --save-dev
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', // This will take the css and inject it into the page using style-text, BTW using style-loader it will bundle css together with your Javascript into a single file called bundle.js
                    'css-loader' // Read the conten of the css and return the contents, wala na syang gagawing iba

                    // npm install css-loader style-loader --save-dev
                ]
            }
        ]
    }
}