### webpack打包流程
1. 读取配置文件  
读取根目录下的`webpack.config.js`文件,根据配置信息执行后续的打包操作
2. 解析入口文件  
根据配置文件中的`entry`找到应用的入口
3. 解析模块依赖  
递归解析入口文件和其他模块的依赖关系,找到所有需要打包的模块,将其转化为一个个JavaScript代码块
4. 加载和应用加载器  
根据配置文件中的`module.rules`依次加载对应的加载器,将模块转化为可执行的JavaScript代码块.例如`babel-loader`将ES6语法转化为ES5语法
5. 应用插件  
根据配置文件中的plugins,依次应用对应的插件,完成额外的操作,如压缩代码、生成HTML文件
6. 输出打包文件  
根据配置中的`output`将打包后的JavaScript代码块合并压缩为一个或多个文件,输出到指定目录中.通常使用`UglifyJsPlugin`压缩和混淆代码
7. 执行构建完成的回调函数,通知用户打包完成  

### webpack概念
`模式` `入口` `出口` `加载器` `插件` `启动服务`  
模式: 
* production 生产模式,优化代码,加载速度较慢
* development 开发模式,跳过优化代码步骤,加载较快  

loader加载器:  
webpack默认处理JS和JSON类型文件,其他类型文件需要借助loader转化为webpack能处理的文件.例如转化css less TypeScript

plugin插件:  
扩展webpack的能力,处理打包后的结果.例如优化和压缩代码,生成html文件,提取公共模块.  

### loader和plugin的区别
loader将不同类型的文件`转化`为webpack能够处理的类型文件.  
plugin`扩展`webpack功能,在打包过程中,对打包结果进行加工和优化.贯穿webpack打包的声明周期,执行不同的任务.  

### 如何开发plugin
[Github: crossorigin-webpack-plugin](https://github.com/komomoo/crossorigin-webpack-plugin)  
1. 创建一个JavaScript文件,导出一个`JavaScript类`,实现`apply`方法.  
2. 在`apply`方法中,通过webpack提供的钩子函数来监听webpack的构建过程中的事件,并执行自定义逻辑.  
3. 在webpack的配置文件中,引入插件,实例化.  
[Demo: my-plugin.js](./webpack/my-plugin.js)  
### webpack配置方式
[Demo: webpack.config.js](./webpack/webpack.config.js)  
##### 模式:  
配置方式一:
```JavaScript
module.exports = {
  mode: 'development',
};
```
配置方式二:  
`webpack --mode=development`

