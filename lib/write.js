const inquirer = require('inquirer');
const create = require('./create');

function timeStarmp() {
    return new Date().getTime();
}

function write() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: '姓名',
                default: '张三'
            },
            {
                type: 'list',
                name: 'sex',
                message: '性别',
                choices: ['man', 'women']
            },
            {
                type: 'input',
                name: 'age',
                message: '年龄'
            }
        ])
        .then((options) => {
            create(`write/${timeStarmp()}.json`, { info: JSON.stringify(options) });
        });
}

module.exports = write;