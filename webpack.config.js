const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const config = {
        entry: { main: "./src/pages/index.js"},
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "main.js",
            publicPath: env.production ? "/around-react/" : "/"
        },
        mode: "development",
        devServer: {
          contentBase: path.resolve(__dirname, "./dist"),
          compress: true,
          port: 8080,
          open: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: "/node_modules/",
                    options: {
                        presets: [{
                                  'plugins': ['@babel/plugin-proposal-class-properties']}]
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1
                            }
                        },
                        "postcss-loader"
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif|woff|woff2)$/,
                    type: "asset/resource",
                },
            ],
        },
        stats: { children: true },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html"
              }),
              new MiniCssExtractPlugin(),
        ],
    };      
    return config;
} 