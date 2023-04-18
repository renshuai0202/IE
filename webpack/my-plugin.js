// my-plugin.js

class MyPlugin {
  apply(compiler) {
    compiler.hooks.beforeCompile.tap('MyPlugin', (params) => {
      console.log('MyPlugin beforeCompile:', params);
    });
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      console.log('MyPlugin emit:', compilation);
      callback();
    });
  }
}

module.exports = MyPlugin;

// 在应用项目中使用my-plugin
// webpack.config.js

const MyPlugin = require('./my-plugin.js');

module.exports = {
  // ...
  plugins: [
    new MyPlugin()
  ]
};