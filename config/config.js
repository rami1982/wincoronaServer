const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'wincoronaserver'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://asafstr:300753316qa@ds343718.mlab.com:43718/wincorona'
  },

  test: {
    root: rootPath,
    app: {
      name: 'wincoronaserver'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://asafstr:300753316qa@ds343718.mlab.com:43718/wincorona'
  },

  production: {
    root: rootPath,
    app: {
      name: 'wincoronaserver'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://asafstr:300753316qa@ds343718.mlab.com:43718/wincorona'
  }
};

module.exports = config[env];
