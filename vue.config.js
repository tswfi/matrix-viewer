module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/matrix-viewer/'
    : '/',
  transpileDependencies: ["vuetify"]
};
