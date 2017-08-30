import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
    entry: ['./src/index.tsx'],
    output: {
        path: path.resolve('build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /.tsx?$/,
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            use: ['awesome-typescript-loader']
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'src/popup.html',
            filename: 'popup.html'
        })
    ]
};

export default config;
