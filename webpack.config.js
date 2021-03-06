//webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// dans le but de pouvoir importer un fichier html dans un js. (TAF.002)
// var nodeModules = {};
// fs.readdirSync(path.resolve(__dirname, "node_modules"))
//   .filter((x) => [".bin"].indexOf(x) === -1)
//   .forEach((mod) => {
//     nodeModules[mod] = `commonjs ${mod}`;
//   });

// on récupère la valeur de NODE_ENV
const env = process.env.NODE_ENV;

const devMode = process.env.NODE_ENV !== "production";

const plugins = [];

// Enable in production only
plugins.push(
  new MiniCssExtractPlugin({
    filename: "./css/[name].css",
    chunkFilename: "[id].css",
  })
);
//
plugins.push(new HtmlWebpackPlugin());

console.log("devMode", devMode);
module.exports = {
  plugins,
  // TAF.002
  //target: "node",
  // externals: nodeModules,
  // necessaire pour faire => import * as fs from "fs";
  // resolve: {
  //   fallback: {
  //     fs: false,
  //   },
  // },
  //utile pour que la page se rechage.
  target: "web",
  mode: env || "development", // On définit le mode en fonction de la valeur de NODE_ENV
  entry: {
    "my-custom-page": "./src/js/script.js",
  },
  output: {
    path: path.resolve(__dirname, "../"),
    filename: "./js/[name].js",
  },
  //devtool: devMode ? "inline-source-map" : false,
  module: {
    rules: [
      //règles de compilations pour les fichiers .js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            //presets: ["@babel/plugin-syntax-jsx"],
          },
        },
      },
      //règles de compilations pour les fichiers .css
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "resolve-url-loader", // améliore la résolution des chemins relatifs
            // (utile par exemple quand une librairie tierce fait référence à des images ou des fonts situés dans son propre dossier)
            options: {
              publicPath: "../images",
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true, // il est indispensable d'activer les sourcemaps pour que postcss fonctionne correctement
              implementation: require("sass"),
            },
          },
        ],
      },
      //règles de compilations pour les fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[hash].[ext]",
        },
      },
      //règles de compilations pour les images
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            // Using file-loader for these files
            loader: "file-loader?name=[name].[ext]&outputPath=./images/",

            // In options we can set different things like format
            // and directory to save
            // options: {
            //     outputPath: (__dirname, '../images')
            // }
          },
          { loader: "image-webpack-loader" },
        ],
      },
      // chargement des fichiers svg
      {
        test: /\.svg$/i,
        use: [
          {
            // Using file-loader for these files
            loader: "file-loader?name=[name].[ext]&outputPath=./icons/",

            // In options we can set different things like format
            // and directory to save
            // options: {
            //     outputPath: (__dirname, '../images')
            // }
          },
          { loader: "image-webpack-loader" },
        ],
      },
      // chargement des fichiers htmls;
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    //contentBase: path.resolve(__dirname, "./public"),
    compress: false,
    hot: true,
    //liveReload: true,
    // watchOptions: {
    //   //poll: true,
    //   poll: 1000,
    // },
    // watchContentBase: true,
    // historyApiFallback: true,
    // writeToDisk: true,
    // port: 3000,
    // //publicPath: "/dist/",
    // publicPath: "http://localhost:3000/scripts/",
    // watchContentBase: true,
    // hot: true,
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin(),
    ],
  },
};
