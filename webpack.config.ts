// webpack.config.ts
import type { Configuration } from 'webpack';
import { mergeWithRules } from 'webpack-merge';
import grafanaConfig from './.config/webpack/webpack.config';

const config = async (env: any): Promise<Configuration> => {
  const baseConfig = await grafanaConfig(env);
  if (env.production) {
    console.log('Production: ', env.production);
  } else {
    console.log('maybe dev');
  }
  console.log('Development: ', env.development);

  const customConfig = {
    // Add custom config here...
    //devtool: 'source-map',

    module: {
      rules: [
        {
          exclude: /(node_modules|libs)/,
        },
      ],
    },
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        fs: false,
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve("util"),
      },
    },
  };
  return mergeWithRules({
    module: {
      rules: {
        exclude: 'replace',
      },
    },
  })(baseConfig, customConfig);
};

export default config;
