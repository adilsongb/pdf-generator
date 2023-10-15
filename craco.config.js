const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
};
