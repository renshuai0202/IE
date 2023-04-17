### 元素消失的方式
`display: none`元素消失，不占位  
`visible: hidden`元素消失，占位  
`opacity: 0`透明度设为0，元素看不见，占位  
`width: 0; font-size: 0`或`height: 0; font-size: 0`宽度或高度设为0，元素看不见，不占位

### display: none和visible: hidden的区别
相同点：隐藏元素，触发重绘，不可点击
差异：
* `display: none`不占位，元素从渲染树中消失，改变整体布局，触发重绘和重排
* `visible: hidden`占位，元素仍在渲染树中，整体布局没有改变，触发重绘  
重排是影响性能的主要因素，如果业务和设计允许占位，对于频繁切换显式隐藏的元素，建议使用`visible: hidden`  

### 什么是重绘和重排
重绘和重排是浏览器渲染页面时的两个重要概念。  
`重绘`是元素的`样式（颜色、背景、边框等）`发生变化，但不影响其在文档流中的位置时，触发浏览器的重绘。重绘不改变文档的布局，改变元素的外观。  
`重排`是元素的`大小`、`位置`或`内容`发生改变，影响整个页面的布局，触发浏览器的重排，重新计算元素的大小和位置，重新布局。  
重排比重绘消耗更多的性能。

### 避免重绘和重排的措施
* 避免频繁操作元素样式，将多次操作合并为一次操作
* 对于需要多次操作的元素，可以先将其从DOM树中移出，操作完成后再插入回去
* 使用绝对定位或固定定位，避免元素位置的改变
* 操作内存中的DOM，一次更新

### 讲讲Flex布局
弹性布局  
##### 容器的属性  
`display: flex`  

`flex-direction: row | row-reverse | colum | colum-reverse`  
主轴方向：起点左 | 右 | 上 | 下  

`flex-wrap: nowrap | wrap | wrap-reverse`  
如果一条轴线排不下，是否换行？不换行 | 换行 | 换行，第一行在下面  

`justify-content: flex-start | flex-end | center | space-between | space-around`  
主轴方向上的对齐方式：左对齐 | 右对齐 | 居中 | 两端对齐，项目中间的间隔相等，两端无空间 | 两端对齐，项目中间的间隔相等，左右两端的空间是中间间隔的1/2
 
`align-items: flex-start | flex-end | center | baseline | stretch`  
交叉轴方向的对齐方式，左对齐 | 右对齐 | 居中对齐 | 第一行文字的基准线对齐 | 伸展，如果项目没有设置高度或为auto，垂直方向占满  

`align-content: flex-start | flex-end | center | stretch | space-between | space-around`  
如果有多条轴线，对齐方式：上对齐 | 下对齐 | 居中 | 铺满 | 两端对齐，轴线之间空间相等，两端空间为空 | 两端对齐，轴线之间空间相等，两端空间是中间空间的1/2  

##### 项目的属性
`order: <integer>`  
项目的排列顺序，越小越靠前，integer是整数的意思  

`flex-grow: <number>`  
项目的放大比例，默认为0，即使存在剩余空间也不放大。  
如果有两个项目，放大比例分别为 `1 2`，则后者所占的剩余空间是前者的两倍。 

`flex-shrink: <number>`  
项目的缩小比例，默认为1，当空间不足时，等比例缩小。  
如果一个项目为`flex-shrink: 0`，其他项目为`flex-shrink: 1`，如果空间不足，则前者不缩小，其他项目等比例缩小  

`flex-basis: auto | number px`  
项目在主轴的初始空间大小，默认auto，使用width的大小，如果width没设置或为auto，则由内容决定项目大小  
如果同是设置`flex-basis`和`width`或`flex-direction: colum; 设置height`，则`flex-basic`优先级更高  
场景：`shrink: 1; flex-basis: 200px;`当容器空间不足时，项目逐渐缩小，直到200px  

`align-self: auto | flex-start | flex-end | center | baseline | stretch`  
允许单个项目有与其他项目不同的对齐方式。覆盖`align-items`  
### 顶部和底部固定高度，中间可以滑动
html,body { height: 100%; overflow: hidden; }  
容器,最小高度100%`display: flex; flex-direction: column`  
顶部、底部正常设置样式，`flex-shrink: 0`不缩小  
中间设置`flex: 1`或`flex-grow: 1`有剩余空间则占满  
[示例](./%E9%A1%B6%E9%83%A8%E5%92%8C%E5%BA%95%E9%83%A8%E5%9B%BA%E5%AE%9A%E9%AB%98%E5%BA%A6%EF%BC%8C%E4%B8%AD%E9%97%B4%E5%8F%AF%E4%BB%A5%E6%BB%91%E5%8A%A8.html)

### px和rem的了解
px是绝对单位,表示屏幕上的一个点,在不同大小屏幕和设备上显式的效果不相同.  
rem是相对单位,相对于根元素字体的大小.一般浏览器的字体大小为16px,故一般情况下`1rem=16px`  

### 响应式设计-px2rem
根据不同的媒体大小,设置不同的根元素字体
```Css
@media only screen and (min-width: 600) and (max-width: 1200) {
  html {
    font-size: 16px;
  }
}
```
将px转换为rem,使用`postcss-plugin-px2rem`  

### 伪元素::
::after已选中元素的最后一个子元素

### 1rem的实现方式
1物理像素取决于屏幕的特性和用户缩放比例,在移动端如果是Retina高清屏,drp可能是2或3,在pc端看到的1px,在移动端可能看到的是2px或3px
[::和scaleY(0.5)](./%E4%BC%AA%E5%85%83%E7%B4%A0%E5%92%8CscaleY.html)

[背景色渐变](./%E8%83%8C%E6%99%AF%E8%89%B2%E6%B8%90%E5%8F%98.html)