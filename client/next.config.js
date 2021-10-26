const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');

function getConfig (processEnv) {
  if(processEnv === 'production') {
    console.info('---->     Run production mode     <----');
    return withPWA({
      images: {
        domains: ['admin.arter.local'],
      },
      i18n
    });
  } else {
    console.info('---->     Run development mode     <----');
    return {
      images: {
        domains: ['admin.arter.local'],
      },
      i18n
    };
  }
}

module.exports = getConfig(process.env.NODE_ENV);
