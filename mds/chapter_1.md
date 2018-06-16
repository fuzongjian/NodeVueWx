## 第一章  本地与服务器环境准备
- 导学

- 课程简介

- 申请认证公众服务号与小程序

- 选购域名与备案解析域名

- 选购配置服务器

- 安装 Node.js v8.0 生产环境
 1. sudo apt-get update(升级环境配置)
 2. sudo apt-get install git vim openssl build-essential libssh-dev wget curl (依赖安装)
 3. curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash (nvm安装)
 4. nvm常用指令
 ```
nvm ls(显示所有的node版本)   
nvm install v8.1.2 (安装node最新版本)
nvm use v8.1.2 (使用最新版本)
nvm alias defalult v8.1.2(设置默认版本)
nvm: command not found (source ~/.bashrc)
 ```
 5. 防火墙相关操作
 ```
sudo vi /etc/iptables.up.rules  (防火墙添加端口)<br/>
sudo iptables -restore < /etc/iptables.up.rules  (重载) <br/>
sudo ufw stop (关闭防火墙)
 ```

- 配置 Vue-Yarn-PM2 工具环境
  1. [yarn安装指令](https://yarnpkg.com/en/docs/install#windows-stable)
```
1、curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
2、echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
3、sudo apt-get update && sudo apt-get install yarn
4、yarn config set registry https://registry.npm.taobao.org (设置指向国内的源)
5、yarn --version
```
  2. vue-cli  pm2 安装
```
npm install vue-cli pm2 -g
```
- 配置 Nginx 端口代理与域名指向
```
<Linux>
1、 sudo apt-get isntlall nginx (安装)
2、 nginx -v
3、 sudo service nginx restart (重启)
4、 nginx -s reload (配置文件重新加载)
<Mac>
1、brew install nginx
2、sudo services nginx start
```
- 安装 MongoDB 数据库 v3.4

- 配置 Git 私有仓库管理代码

- 配置 PM2 一键部署发布项目
 1. ecosystem.json（发布脚本）
```
{
  apps : [
    {
      name      : "API",  // 项目的名字
      script    : "app.js", // 项目的主入口
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },

    // Second application
    {
      name      : "WEB",
      script    : "web.js"
    }
  ],
  deploy : {
    production : {
      "user": "你的服务器登录名",
       "host": ["你的服务器 IP"],
       "port": "你的服务器登录端口 默认 22",
       "ref": "origin/master",
       "repo": "你的 git 仓库地址",
       "path": "/www/icefire/production",
       "ssh_options": "StrictHostKeyChecking=no",
       "post-deploy": "yarn install && npm run build && pm2 startOrRestart ecosystem.json --env production",
       "env": {
         "NODE_ENV": "production"
       }
    },
    dev : {
      user : "node", // 登陆用户名
      host : "212.83.163.1", // 要部署的目标服务器或者域名
      ref  : "origin/master", // 用于部署代码时的分支
      repo : "git@github.com:repo.git",  // 仓库地址
      path : "/var/www/development", // 在目标服务器上部署的文件目录地址
      "post-deploy" : "npm install ; pm2 startOrRestart ecosystem.json --env dev",  // 部署后启动的脚本
      env  : {
        NODE_ENV: "dev"
      }
    }
  }
}
```
 2. 第一次发布执行   `pm2 deploy ecosystem.json production setup`
 3. 执行部署        `pm2 deploy ecosystem.json production`
 4. 更新部署        `pm2 deploy production update`
