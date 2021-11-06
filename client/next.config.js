const {i18n} = require('./next-i18next.config');
const withPWA = require('next-pwa');

function getConfig(processEnv) {
  if (processEnv === 'production') {
    console.info('---->     Run production mode     <----');
    return withPWA({
      images: {
        domains: ['admin.arter.local', 'constructor.chost.com.ua'],
      },
      i18n,
      pwa: {
        dest: 'public'
      },
      webpack(config, options) {
        config.module.rules.push({
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [{removeViewBox: false}],
            },
            titleProp: true,
          },
          test: /\.svg$/,
        });

        return config;
      },
    });
  } else {
    console.info('---->     Run development mode     <----');
    return {
      images: {
        domains: ['admin.arter.local', 'constructor.chost.com.ua'],
      },
      i18n,
      webpack(config, options) {
        config.module.rules.push({
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [{removeViewBox: false}],
            },
            titleProp: true,
          },
          test: /\.svg$/,
        });

        return config;
      },
    };
  }
}

module.exports = getConfig(process.env.NODE_ENV);
