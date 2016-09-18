## Angular 2
https://angular.io/

## Node Version Manager
Simple bash script to manage multiple active node.js versions
Mac/Linux Only:	https://github.com/creationix/nvm
Windows:		https://github.com/coreybutler/nvm-windows

nvm ls-remote

## nrm  -- NPM 源管理器
```bash
npm install -g nrm
nrm ls                  
rock@rock-HP-ProBook-4341s:~/node_sample_module$ nrm test
  npm ---- 2719ms
  cnpm --- 5160ms
  taobao - 253ms
  nj ----- Fetch Error
  rednpm - 694ms
  npmMirror  1611ms
  edunpm - Fetch Error
                                                                                            
```

## Private npm registry and web for Enterprise 
https://cnpmjs.org
https://github.com/cnpm/cnpmjs.org

### 为什么企业需要私有NPM
主要有如下理由：
1. 确保npm服务快速、稳定：对于企业来说，上线生产系统的时候，需要花半小时甚至更久等待npm模块依赖安装完毕，是不可接受的。部署镜像后，可以确保高速、稳定的npm服务。
2. 发布私有模块：官方的npm上的模块全部是开源的。一些与企业业务逻辑相关的模块可能不适合开源。这部分私有的模块放在私有NPM仓库中，使用起来各种方便。
3. 控制npm模块质量和安全：npm上的模块质量参差不齐，搭建私有仓库，可以更严格地控制模块的质量和安全，只有经过审核的模块才允许被加入私有仓库。

### Dependencies
* node >= 4.3.1
* Databases: only required one type
1. sqlite3 >= 3.0.2, we use sqlite3 by default
2. MySQL >= 0.5.0, include mysqld and mysql cli. I test on mysql@5.6.16.
3. MariaDB
4. PostgreSQL

## Mysql
```bash
rock@rock-HP-ProBook-4341s:~$ mysql -u root -p 
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 4
Server version: 5.7.15-0ubuntu0.16.04.1 (Ubuntu)

Copyright (c) 2000, 2016, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> create user 'cnpmjs'@'localhost' identified by 'password';
Query OK, 0 rows affected (0.34 sec)
mysql> create database cnpmjs;
Query OK, 1 row affected (0.00 sec)
mysql> grant all privileges on cnpmjs.* to cnpmjs@localhost identified  by 'password';
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> quit;
rock@rock-HP-ProBook-4341s:~$ mysql -u cnpmjs -p 
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 5
Server version: 5.7.15-0ubuntu0.16.04.1 (Ubuntu)

mysql> source /home/rock/cnpmjs.org/docs/db.sql;
mysql> show tables;
+-----------------------+
| Tables_in_cnpmjs      |
+-----------------------+
| dist_dir              |
| dist_file             |
| downloads             |
| module                |
| module_deps           |
| module_keyword        |
| module_log            |
| module_maintainer     |
| module_star           |
| module_unpublished    |
| npm_module_maintainer |
| tag                   |
| total                 |
| user                  |
+-----------------------+
14 rows in set (0.00 sec)

```

## index.js
/home/rock/cnpmjs.org/config/index.js
http://192.168.1.105:7002/
nodejs dispatch.js
nohup nodejs dispatch.js &
npm config set registry http://192.168.1.105:7001
rock@rock-HP-ProBook-4341s:~/server$ npm adduser
Username: rock
Password: 
Email: (this IS public) rock.c.c.hu@gmail.com
Logged in as rock on http://192.168.1.105:7001/.

npm login --regirsty=http://192.168.1.105:7001
rock@rock-HP-ProBook-4341s:~/node_sample_module$ npm login --regirsty=http://192.168.1.105:7001
Username: (rock) 
Password: (or leave unchanged) 
Email: (this IS public) (rock.c.c.hu@gmail.com) 
Logged in as rock on http://192.168.1.105:7001/.

npm publish --regirsty=http://192.168.1.105:7001

rock@rock-HP-ProBook-4341s:~/cnpmjs.org$ npm config list
; cli configs
user-agent = "npm/3.10.3 node/v6.5.0 linux x64"

; userconfig /home/rock/.npmrc
//192.168.1.105:7001/:always-auth = false
//192.168.1.105:7001/:email = "rock.c.c.hu@gmail.com"
//192.168.1.105:7001/:username = "rock"
registry = "http://192.168.1.105:7001/"

; node bin location = /home/rock/.nvm/versions/node/v6.5.0/bin/node
; cwd = /home/rock/cnpmjs.org
; HOME = /home/rock
; "npm config ls -l" to show all defaults.

rock@rock-HP-ProBook-4341s:~/node_sample_module$ npm publish --regirsty=http://192.168.1.105:7001
+ @cnpm/node_sample_module@1.0.0

{
  "name": "@cnpm/node_sample_module",
  "version": "1.0.0",
  "description": "node sample module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


### Clone codes and run test
```bash
# clone from git
$ git clone https://github.com/cnpm/cnpmjs.org.git

# install dependencies
$ make install

# test
$ make test

# coverage
$ make test-cov

# update dependencies
$ make autod

# start server with development mode
$ make dev
```
## we provide a generator ecosystem. 
A generator is basically a plugin that can be run with the `yo` command to scaffold complete projects or useful parts.
http://yeoman.io/

## Modern Web Dev Generator
https://www.npmjs.com/package/generator-modern-web-dev

## Components vs Directive
### Components
1. For register component we use @Component meta-data annotation.
2. Component is a directive which use shadow DOM to create encapsulate visual behavior called components. Components are typically used to create UI widgets.
3. Component is used to break up the application into smaller components.
4. Only one component can be present per DOM element.
5. @View decorator or templateurl template are mandatory in the component.

### Directive
1. For register directives we use @Directive meta-data annotation.
2. Directives is used to add behavior to an existing DOM element.
3. Directive is use to design re-usable components.
4. Many directive can be used in a per DOM element.
5. Directive don’t have View.