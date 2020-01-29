/*
 * @Author: 闫龙科
 * @Date: 2020-01-29 14:24:01
 * @LastEditors  : 闫龙科
 * @LastEditTime : 2020-01-29 19:42:10
 * @Description: 00
 */
// 1.接受一个仅包含数字的 多维数组 ，返回一个迭代器，可以遍历得到它拍平以后的结果
const numbers = flatten([1, [[2], 3, 4], 5]) 
numbers.next().value // => 1 
numbers.next().value // => 2 
numbers.next().value // => 3 
numbers.next().value // => 4 
numbers.next().value // => 5


function *flatten(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    Array.isArray(item) ? yield* flatten(item) : yield item;
  }
}

// 2.复习数组方法 封装实现 数组 map、filter、every 方法
//filter:
Array.prototype.myFilter = function(cb, context) {
  let newArr = [];
  let self = this;
  for (let i=0; i<self.length; i++) {
    let result = cb.call(context, self[i], i, self);
    if (result) {
      newArr.push(arr[i])
    }
  }
  return newArr;
}
//例
let arr = [1, 2, 3,4, 5];
let result = arr.myFilter(function(item) {
  console.log(this)
  return item > 2;
}, [1, 2, 3])

//map:
Array.prototype.myMap= function(cb, context) {
  let newArr = [];
  let self = this;
  for (let i=0; i<self.length; i++) {
    newArr.push(cb.call(context, self[i], i, self))
  }
  return newArr;
}
//例
let arr1 = [1, 2, 3,4, 5];
let result1 = arr1.myMap(function(item) {
 console.log(this)
  return item*2;
}, [1, 2, 3])

// every：
Array.prototype.myEvery= function(cb, context) {
  let self = this;
  for (let i=0; i<self.length; i++) {
    let result = cb.call(context, self[i], i, self)
    if (!result) {
      return false
    } 
  }
  return true;
}
let arr2 = [1, 2, 3,4, 5];
let result2 = arr.myEvery(function(item) {
  console.log(this)
  return item > 1;
}, [1, 2, 3])

