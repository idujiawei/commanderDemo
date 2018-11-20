#!/usr/bin/env node

const program = require('commander');
const package = require('../package.json');
const chalk = require('chalk');

program
    .name(package.name)
    .version(package.version)
    .usage('<command> [options]')

// 创建文件
program
    .command('create <file-name> [otherFiles...]')
    .description('create a new file')
    .option('-o, --open', 'console info')
    .option('-i, --info [message]', 'console info')
    .action(function (name, otherFiles, cmd) {
        const options = cleanArgs(cmd);
        require('../lib/create')(name, options, otherFiles);
    })

// 删除文件
program
    .command('rm <file-name> [otherFiles...]')
    .description('remove a file')
    .action((name, otherFiles) => {
        require('../lib/remove')(name, otherFiles);
    });

// copy文件
program
    .command('copy <entry-file-name> <output-file-name>')
    .description('copy a file')
    .action((entry, output) => {
        require('../lib/copy')(entry, output);
    });

program
    .command('write')
    .description('write package.json')
    .action(() => {
        require('../lib/write')();
    });

// 如果输入的命令，没有在命令列表中
program
    .arguments('<command>')
    .action((cmd) => {
        program.outputHelp();
        console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
        console.log()
    });

// help
program.commands.forEach(c => c.on('--help', () => console.log()));

program.parse(process.argv);


if (!process.argv.splice(2).length) {
    program.outputHelp();
}

// 将输入的参数过滤出来 组成 {key:value}格式
function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = o.long.replace(/^--/, '')
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}