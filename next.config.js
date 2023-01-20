const withImages = require('next-images');

module.exports = withImages({
  images: {
    domains: ['assets.sorare.com'],
    minimumCacheTTL: 31536000
  }
});
