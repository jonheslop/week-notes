const cssnext = require('postcss-cssnext');

module.exports = {
  plugins: [
      require('postcss-each'),
      cssnext({
        features: {
          customProperties: {
            preserve: true
          }
        }
      }),
      require('cssnano')
  ]
}
