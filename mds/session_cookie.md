####  session和cookie的区别
```
1、cookie数据存放在客户的浏览器上，session数据放在服务器上
2、cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗，考虑到安全应当使用session。
3、session会在一定时间内保存在服务器上。当访问增多，会比较占用服务器性能，考虑到减轻服务器性能方面，应当使用cookie。
4、单个cookie保存的数据不能超过4k，很多浏览器都限制一个站点最多保存20个cookie。
```
