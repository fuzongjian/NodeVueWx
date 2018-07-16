var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var cnode_url = 'https://cnodejs.org/';
var app = express();
// 使用superagent与cheerio完成简单爬虫
app.get('/1',function (req, res, next) {
    superagent.get(cnode_url)
        .end(function (err,sres) {
            // 常规错误处理
            if (err){
                return next(err);
            }
            // sres.text 里存储着网页的html内容，传递给cheerio.load
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                });
            });
            res.send(items);
        });
});
// 使用eventproxy控制并发
// url模块是node.js标准库里面的
var url = require('url');
var eventproxy = require('eventproxy');

app.get('/2',function (req, res, next) {
    superagent.get(cnode_url)
        .end(function (err, sres) {
            if(err){
                return console.error(err);
            }
            var topicUrls = [];
            var $ = cheerio.load(sres.text);
            // 获取首页所有的连接
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                var href = url.resolve(cnode_url,$element.attr('href'));
                topicUrls.push(href);
            });
            // 得到所有的url，然后继续爬去url
            var eq = new eventproxy();
            // eq 监听 topicUrls.length次'topic_html'事件再行动
            eq.after('topic_html',topicUrls.length,function (topics) {
                // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
                topics = topics.map(function (topicPair) {
                    var topicUrl = topicPair[0];
                    var topicHtml = topicPair[1];
                    var $ = cheerio.load(topicHtml);
                    return ({
                        title: $('.topic_full_title').text().trim(),
                        href: topicUrl,
                        comment: $('.reply_content').eq(0).text().trim(),
                    });
                });
                console.log('final:---');
                res.send(topics);
            });
            topicUrls.forEach(function (topicUrl) {
                superagent.get(topicUrl)
                    .end(function (err,res)  {
                        console.log('fetch--' + topicUrl + 'successful');
                        eq.emit('topic_html',[topicUrl,res.text]);
                    });
            });
        });
});
app.listen(3000,function () {
    console.log('app is listening at port 3000');
});
