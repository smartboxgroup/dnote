module.exports = {
  name: 'API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  base_url: process.env.BASE_URL || 'http://backend:3000',
  db: {
    uri: process.env.REDIS_URI || 'redis://redis:6379',
  },
};
