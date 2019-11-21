
1. nodeJs程序运行不稳定
2. 程序效率低，每秒处理请求数较低

## 什么是nodeJs
和google浏览器用的是同样的JavaScript引擎和模型，在node写js和在浏览器里面写js基本上没有什么区别

1. nodeJs没有浏览器的api，document,window
2. 文件系统，进程等等

## nodeJs作用
1. 服务端渲染
2. 构建工作流
3. vscode (electron) 
4. twitch.tv 在已有网站的情况下开发客户端应用
(自定义模块)

## RPC


```
Node.js在后台使用 libuv库。 libuv库有一个线程池(默认情况下为4)。因此，node.js使用多线程实现并发。

不过，你的代码运行在单个线程上(即，Node.js函数的所有回调都将在同一个线程上调用，即所谓的循环线程或事件循环)。当人们说“Node.js运行在单个线程上”时，他们实际上是在说“Node.js的回调运行在单个线程上”。
```

## RESTful
```
RESTful 是把每个 URI 当做资源 (Resources), 通过 method 作为动词来对资源做不同的动作, 然后服务器返回 status 来得知资源状态的变化 (State Transfer);
```