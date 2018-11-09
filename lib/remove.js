const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rmdirp = require('djw-rmdirp');

function remove(fileName, otherFiles = []) {

    if (otherFiles.length) {
        otherFiles.forEach(item => {
            rmdirp(item, (err) => {
                if (err) {
                    console.log(chalk.red(err));
                    return;
                }
                console.log(chalk.green(`删除成功`));
            });
        });
    }

    rmdirp(fileName, err => {
        if (err) {
            console.log(chalk.red(err));
            return;
        }
        console.log(chalk.green(`删除成功`));
    });
}

module.exports = remove;