### React和Vue的区别

* `模板语法`：Vue使用类似HTML的模板语法来定义组件，而React使用JSX语法来定义组件。

* `数据绑定`：Vue使用双向数据绑定，即模板中的数据变化会反映到组件中的数据，反之亦然。React使用单向数据流，即数据只能从父组件传递给子组件，子组件不能直接修改父组件的数据。

* `组件化`：Vue的组件化更加直接，可以在单个文件中定义模板、样式和逻辑。React的组件化更加灵活，可以将模板、样式和逻辑分开定义。

* `状态管理`：Vue提供了Vuex作为状态管理工具，可以方便地管理组件之间共享的状态。React提供了Redux作为状态管理工具，也可以方便地管理组件之间共享的状态。

* `性能优化`：Vue在性能优化方面更加出色，因为Vue可以通过模板编译和虚拟DOM来实现高效的渲染。React在性能优化方面也很不错，但需要手动实现优化措施。

总体来说，React更加灵活和可定制化，适合大型应用程序和团队开发。Vue更加直接和易于学习，适合快速开发小型应用程序和个人项目。

### 什么是fiber

Fiber是React16中引入的一种新的协调机制。它是一种轻量级的执行单元，可以对React组件的渲染过程进行分割、调度和优先级控制，使得React在处理大型、复杂的UI组件树时能够更加高效地进行渲染和更新。

在React15及以前的版本中，React使用递归算法进行组件的渲染和更新，即当一个组件的状态发生变化时，React会递归遍历整个组件树，重新计算并渲染每个组件。这种算法在处理大型、复杂的UI组件树时会存在性能问题，因为递归算法的时间复杂度是O(n)，而且在遍历过程中无法中断，会导致UI的卡顿和用户体验下降。

Fiber的出现解决了这个问题。它将组件树的渲染过程分割成多个小任务，每个任务都可以被中断和恢复，同时还可以根据任务的优先级进行调度和处理，使得React可以更加高效地处理大型、复杂的UI组件树，并提高UI的响应速度和用户体验。

### React性能优化
##### 使用React.memo()
当父组件的props或state发生变化,会导致当前组件和子组件重新渲染.  
如果子组件的props没有变化,重新渲染会造成性能浪费.  
在导出子组件时,使用`React.memo(ChildComponent)`包裹一下.  
原理是对比新旧props,如果相同,则不重新渲染子组件.  
[React.memo](https://github.com/facebook/react/blob/977bccd24de2b062d2c114e6cf160d2bd9ed9493/packages/react/src/ReactMemo.js)

##### 少用或不用state useEffect
因为执行setState会重新渲染组件,虽然React已经默默优化,对setState进行批处理,我们仍然要减少使用state,既不浪费性能,又便于后期维护.  
useEffect是副作用,当逻辑复杂时,或者考虑的情况不全,一旦出现循环执行,灾难性事件.  
滥用useEffect,依赖不当,会出现相互影响,出现不期望的结果.  
滥用useEffect不利于后期维护.  

##### 写在JSX的对象和函数,使用useMemo和useCallback
因为每次重新渲染组件,都会重新生成JSX,故重新生成内联的值和函数(函数也是一种对象)  
使用useMemo和useCallback当依赖项不发生变化,则不会重新生成值和函数  

##### 能不用则不用redux
如果可以不用Redux则不用redux,考虑useReducer和useContext.  
后者比前者的性能开销小得多.  

##### 使用前端缓存策略
当频繁请求,且数据不经常变化.考虑使用前端缓存.例如获取值集,查询不经常变化的业务数据.  
`ahooks`用法,指定`cacheKey`和`cacheTime`,使用`clearCache`清空缓存.  

##### 使用懒加载和代码拆分
`React.lazy` `import` `Suspense`
[懒加载实现原理](https://juejin.cn/post/6844904191853494280)
`webpackPrefetch:true`
[预加载](https://juejin.cn/post/7072192612966334500)

##### 使用cdn,缓存网站的静态资源,如图片 css js文件等

##### 使用https
https使用到了多路复用\头部压缩等技术,减少了网络延迟,提升了网站加载速度.  


##### table组件的列有联动
不要在column上写联动逻辑,在频繁切换某一列时会有较大的性能开销,正确的做法是每一列维护好自己的职责,当tale检测到dataSource发生变化时,封装一个hook处理联动逻辑.通过火焰图,可以显著发现性能得到改善.    

### 为什么自定义组件首字母大写，原生标签首字母小写？
因为浏览器无法识别JSX，需要通过BAbel进行转化，转化过程中需要知道哪些是自定义组件，哪些是原生标签。
### React.Fragment 和 <></>的区别？
前者允许设置key
### 虚拟dom diff算法
https://juejin.cn/post/7116326409961734152