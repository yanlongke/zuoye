/*
 * @Author: 闫龙科
 * @Date: 2020-01-29 14:35:21
 * @LastEditors  : 闫龙科
 * @LastEditTime : 2020-01-29 18:22:19
 * @Description: 00
 */
// 1.用自己的话描述js垃圾回收机制

// JavaScript 中的内存管理是自动执行的，而且是不可见的。我们创建基本类型、对象、函数……所有这些都需要内存。


// 3.深入理解this执行
function Foo() {
    getName = function() { console.log(1); }
    return this
}
Foo.getName = function() { console.log(2); }
Foo.prototype.getName = function() { console.log(3); }
var getName = function () { console.log(4); }
function getName() { console.log(5); }
Foo.getName();       //2
getName();           //4
Foo.getName();       //2
getName();           //4
new Foo.getName()    //2
new Foo().getName()  //3
new new Foo().getName()//3

// 4. 重绘和回流（重排）的区别和关系 用自己的话描述

// 重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘
// 回流：当渲染树中的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流
// 注意：JS 获取 Layout 属性值（如：offsetLeft、scrollTop、getComputedStyle 等）也会引起回流。因为浏览器需要通过回流计算最新值
// 回流必将引起重绘，而重绘不一定会引起回流