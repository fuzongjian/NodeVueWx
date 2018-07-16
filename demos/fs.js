var fs = require('fs');
// 1. 文件读取
var isExit = function () {
    fs.stat('reptile.js',function (err, stats) {
        if (err){
            console.log(err);
            return false;
        }else{
            console.log('目录: ' + stats.isDirectory());
            console.log('文件: '+ stats.isFile());
        }
    })
}
// isExit();

// 2. fs.mkdir() 创建目录
var newFile = function () {
    fs.mkdir('css',function (err) {
        if (err){
            console.log(err);
            return false;
        }else{
            console.log('create css dir is successful');
        }
    })
}
// newFile();
// 3. 写入文件（如果已经存在会覆盖）
var writeFile = function () {
    fs.writeFile('t.txt','付宗建----','utf8',function (err) {
        if (err){
            console.log(err);
            return false;
        }
        console.log('文件创建成功！');
    })
}
// writeFile();
// 4. 文件追加
var appendFile = function () {
    fs.appendFile('t.txt','这是写入的内容\n',function (err) {
        if (err){
            console.log(err);
            return false;
        }
        console.log('文件写入成功！');
    })
}
// appendFile();
// 5. 文件读取
var readFile = function () {
    fs.readFile('t.txt',function (err, data) {
        if (err){
            console.log(err);
            return false;
        }
        console.log(data.toString());
    })
}
// readFile();
// 6. 目录读取
var readDir = function () {
    fs.readdir('../demos',function (err, data) {
        if (err){
            console.log(err);
            return false;
        }
        console.log(data);
        console.log(data[0]);
    })
}
// readDir();
// 7. 重命名（剪切移动文件）
var rename = function () {
    fs.rename('rename.js','newname.js',function (err) {
        if (err){
            console.log(err);
            return false;
        }
       console.log('修改成功');
    })
}
// rename();
// 8. 删除目录
var  rmdir = function () {
    fs.rmdir('path',function (err) {

    });
}
// 9. 删除文件
var rmFile = function () {
    fs.unlink('path',function (err) {

    })
}

// 10. 循环查看文件信息
var filesArr = [];
var getFileInfo = function () {
    fs.readdir('../../NodeVueWx',function (err, files) {
        if (err){
            console.log(err);
            return false;
        }
        (function getFile(i) {
            if (i == files.length){/* 循环结束*/
                console.log(filesArr);
                return false;
            }
            // 注意文件目录（异步递归）
            fs.stat('../../NodeVueWx/'+files[i],function (err, stats) {
                console.log(files[i]);
                if(stats.isDirectory()){/*目录*/
                    filesArr.push(files[i]);
                }
                getFile(i+1);
            })
        })(0)
    })
}
// getFileInfo();
// 11. 读取文件流（文件比较大的时候，一以文件流的方式读写）
var readStream  = function () {
    var stream = fs.createReadStream('t.txt');
    var str = '';/*保存数据流*/
    var count = 0;// 读取次数()
    stream.on('data',function (chunk) {
        str += chunk;
        count ++;
    });
    stream.on('end',function (chunk) {
        console.log(str);
        console.log(count);
    });
    stream.on('error',function (err) {
        console.log(err);
    });
}
// readStream();
// 12. 写入文件流
var writeStream = function () {
    var data = "hello world!\n";
    var stream = fs.createWriteStream('output.txt');
    for(var i = 0; i < 100; i ++){
        stream.write(data,'utf8');
    }
    stream.end();//  标记写入完成
    stream.on('finish',function () {
        console.log('wirte success');
    });
    stream.on('error',function () {
        console.log('write failure');
    })
}
// writeStream();
// 13. 管道读写操作
/*
* 读取t.txt文件内容，并写入到output.txt
* */
var streamPip = function () {
    var reader = fs.createReadStream('t.txt');
    var writer = fs.createWriteStream('output.txt');
    reader.pipe(writer);
}
streamPip();
