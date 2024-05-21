module.exports = {
  require: ['@babel/register','./mocha-setup.js'],
  extension: ['js'],
  spec: 'src/**/*.test.js',
  recursive: true
};
