const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { dirIsExist, mkdir } = require('./util');

function copy(entry, output) {
    if (entry === output) {
        console.log(`  ` + chalk.red(`副本名称不能和文件相同`));
        return;
    }

    // 判断入口文件是否存在
    if (!dirIsExist(entry)) {
        console.log(`  ` + chalk.red(`${entry} 不存在！`))
        return;
    }

    // 判断出口文件是否存在
    if (dirIsExist(output)) {
        console.log(`  ` + chalk.red(`${output} 已存在！`))
        return;
    }

    // 筛选传入的参数，是否包含目录路径
    mkdir(output);

    fs.copyFile(entry, output, err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(chalk.green(`copy 成功，文件路径 ${output}`));
    });
}

module.exports = copy;