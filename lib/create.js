const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp'); // 引入 mkdirp，因为 fs.mkdir 不支持生成多级目录
const chalk = require('chalk');
const { dirIsExist, mkdir } = require('./util');
const { exec } = require('child_process');

function create(fileName, { info = '', open } = {}, otherFiles = []) {
    // path.basename() 返回一个 path 的最后一部分
    // process.cwd() 返回 Node.js 进程当前工作的目录
    // path.resolve(name) 会把一个路径或路径片段的序列解析为一个绝对路径
    // fs.existsSync() 如果路径存在，则返回 true，否则返回 false
    // path.extname() 方法返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。 如果 path 的最后一部分没有 . 或 path 的文件名（见 path.basename()）的第一个字符是 .，则返回一个空字符串。
    // path.dirname() 方法返回一个 path 的目录名
    // exec 

    if (otherFiles.length) {
        otherFiles.forEach(item => {
            create(item);
        });
    }


    // 筛选传入的参数，是否包含目录路径
    mkdir(fileName);

    // // 返回输入参数的后缀名
    const extname = path.extname(fileName);

    // 如果没有加后缀 .js
    if (!extname) {

        mkdirp(fileName, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('写入成功');
        });

        return;
    }

    // 判断该文件是否存在
    if (dirIsExist(fileName)) {
        console.log(`  ` + chalk.red(`${fileName} 已经存在！`))
        return;
    }

    // 如果不存在，生成文件
    fs.writeFile(fileName, info, 'utf8', function (error) {
        if (error) {
            console.log('创建失败', error);
            return false;
        }

        console.log('写入成功');

        if (open) {
            exec(`open ${root}`);
        }
    });
}

module.exports = create;