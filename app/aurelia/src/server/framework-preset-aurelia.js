import { AureliaPlugin } from 'aurelia-webpack-plugin';

export function webpack(config) {
  return {
    ...config,
    target: 'node',
    plugins: [...config.plugins, new AureliaPlugin()],
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.css$/i,
          issuer: [{ not: [{ test: /\.html$/i }] }],
          use: [{ loader: 'css-loader' }, 'style-loader'],
        },
        {
          test: /\.css$/i,
          issuer: [{ test: /\.html$/i }],
          use: [{ loader: 'css-loader' }],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          issuer: /\.[tj]s$/i,
        },
        {
          test: /\.scss$/,
          use: ['css-loader', 'sass-loader'],
          issuer: /\.html?$/i,
        },
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [...config.resolve.extensions, '.ts'],
      alias: {
        ...config.resolve.alias,
      },
    },
  };
}
