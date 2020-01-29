/*
 * @Author: 闫龙科
 * @Date: 2020-01-29 14:50:30
 * @LastEditors: 闫龙科
 * @LastEditTime: 2020-01-29 19:43:01
 * @Description: 00
 */
// 1.总结http协议 、同源策略、跨域问题
//Http协议，全称是HyperText Tansfer Protocol
//HTTP是超文本传输协议，HTTP是万维网使用的底层协议，例如传输HTML文档的应用层，
//http协议主要用于用于Web浏览器和Web服务器之间的通信

//常见的http请求方式
// 1    GET    请求指定的页面信息，并返回实体主体。
// 2    HEAD    类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头
// 3    POST    向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和 / 或已有资源的修改。
// 4    PUT    从客户端向服务器传送的数据取代指定的文档的内容。
// 5    DELETE    请求服务器删除指定的页面。
// 6    CONNECT    HTTP / 1.1协议中预留给能够将连接改为管道方式的代理服务器。
// 7    OPTIONS    允许客户端查看服务器的性能。
// 8    TRACE    回显服务器收到的请求，主要用于测试或诊断。

//创建http状态码
//1 ** 信息，服务器收到请求，需要请求者继续执行操作
// 2 ** 成功，操作被成功接收并处理
// 3 ** 重定向，需要进一步的操作以完成请求
// 4 ** 客户端错误，请求包含语法错误或无法完成请求
// 5 ** 服务器错误，服务器在处理请求的过程中发生了错误

//2 同源策略 
// JavaScript可以操作html, 发出请求，也可以用iframe加载别的网站。
// 为了防止当前登陆的网站去访问另一个已登录网站的信息，控制这个请求成功与否就叫同源策略
// 同源策略明确规定：不同域的客户端脚本在没明确授权的情况下，不能读写对方的资源
// 如何判断是同源：协议相同 + 域名相同 + 端口相同
// 注：www.example.com和 example.com也不是同一个域名，因为在设置dns解析的时候，可以把这个两个域名设置为不同的IP地址。

// 二：禁止跨源
// 如果在浏览器中使用fetch("https://example.com")跨源访问其他网站，则会报错（原因：CORS 头缺少 'Access-Control-Allow-Origin'）
// 三：跨源访问
// 事情没有太绝对，虽然同源策略是为了保护隐私，即，不是同源不可以访问对方的信息
// 但是在某些实际情况下，是可以进行协商的
// 1.jsonp
// 本质：跨源的对方给  发出请求的源的一段JavaScript脚本执行，Script标签中的src属性是允许跨源的
// 2.CORS
// 原理：被请求的服务端获取发出请求方的请求后，给响应头加上Access - Control - Allow - Origin的相关信息，
// 浏览器就会放行请求，让请求方拿到数据
// 3.WebSocket
// WebSocket是一种通信协议，使用 ws://(非加密)和wss://(加密)作为协议前缀
// 该协议不实行同源策略，只要服务器支持，就可以进行跨源通信      
 //  总结跨域文题
// 在网站开发中，经常会遇到跨域问题，下面总结一下集中常见的跨域问题。
// 1. 不同域名属于跨域，如：www.a.com 和www.b.com，另外www.a.com 和www.a.com.cn也属于不同域名。
// 2. 主域名和子域名（二级域名、三级域名等）跨域，如：www.a.com 和 bbs.a.com 跨域。
// 3. 不同协议属于跨域，如：http://www.a.com 和 https://www.a.com。
// 4. Ip和域名属于跨域，如：123.23.23.12 和 www.a.com。
// 那如何解决跨域呢？
// 如何解决跨域问题
// JSONP
// JSONP是JSON with Padding的略称。它是一个非官方的协议，它允许在服务器端集成Script tags返回至客户端，通过javascript callback的形式实现跨域访问（这仅仅是JSONP简单的实现形式）。关于jsonp的使用方式，可以参考http://blog.csdn.net/alen1985/article/details/6365394，优缺点可以参考http://blog.csdn.net/z69183787/article/details/19191385　　
// 添加响应头，允许跨域
// addHeader(‘Access - Control - Allow - Origin:*’);//允许所有来源访问 
// addHeader(‘Access - Control - Allow - Method: POST, GET’);//允许访问的方式
// 代理的方式
// 服务器A的test01.html页面想访问服务器B的后台action，返回“test”字符串，此时就出现跨域请求，浏览器控制台会出现报错提示，由于跨域是浏览器的同源策略造成的，对于服务器后台不存在该问题，可以在服务器A中添加一个代理action，在该action中完成对服务器B中action数据的请求，然后在返回到test01.html页面。
// Demo1(添加允许跨域请求的响应头)
// html页面
// Web后台
// 按照上面的访问，由于127.0.0.1: 8080和localhost: 8081的域和端口不同，所以同样会出现跨域问题。
// 现在用添加响应头的方式
// Demo2(jsonp的callback方式)
// 这里演示的是jquery的ajax，后台采用的是webservice接口形式
// 注意此时的dataType为jsonp格式，看看后台的接收
// ，
// 我们返回的其实就是一个函数的调用文本，这里注意，callback的名称，由于前台没有指定callback函数，所以这里自动生成了，如果想自定义回调函数名称如下操作，添加一行请求参数
// 这样后台的回调函数名就变成了mytest
// 浏览器发出的请求格式和响应数据如下，其实就是返回函数的调用，而需要返回的数据则以函数参数值的形式填入

//中间件模式（middleware）是一种很常见、也很强大的模式，被广泛应用在 Express、Koa、Redux 等类库和框架当中。模拟一个中间件模式。

const app = {
    target: null,
    middleWares: [],
    index: -1,
    callback(ctx) {
        console.log(ctx)
    },
    use(fn) {
        this.middleWares.push(fn)
    },
    go(ctx) {
        this.target = ctx;
        this.index = -1;
        const execute = () => {
            this.index += 1;
            if (this.index >= this.middleWares.length) {
                this.callback(this.target)
            } else {
                this.middleWares[this.index](this.target, execute)
            }
        };
        execute()
    }
};