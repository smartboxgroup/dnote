module.exports = {
  devServer: {
    proxy: {
      '/notes': {
        target: 'http://backend:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
