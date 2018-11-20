## commander demo

> @subject : commander 的使用  
  @author : jiawei     
  @date : 2018-11-20 

使用 `commander` 开发自己的命令行工具。`commander` 更好的解析 `process.argv` 并做出反应。

### commander 和 Yo 

之前使用 `yo` 开发过一个 `react` 模板，也写过一个关于 `yo` 的使用 [wiki](https://gitee.com/quxueche2016/qxc-fe-lab/wikis/YEOMAN%20%20generator%20%E4%BD%BF%E7%94%A8%E7%AC%94%E8%AE%B0?sort_id=605635)。使用了 `commander` 之后，决定写一下对两者的使用体悟。

#### 安装

* `Yo` 的安装是比较繁琐的，需要全局安装 `Yo`、`generator-generator`，因为需要使用 `Yo` 提供的命令。
* `commander` 安装简单方便，不需要全局安装，在项目安装即可。

#### 书写

* `Yo` 的书写简单，`Yo` 本身给提供了丰富的 `API`、生命周期，只是功能比较死板。
* `commander` 提供了定义 `命令`、`参数` 的方法，逻辑层需要依赖其他的模块实现，但是 `commander` 很灵活，实现的功能也很强大。

#### 工具的安装以及使用

* `Yo` 开发的工具，使用起来，需要全局安装 `Yo` 以及要使用的工具，感觉累赘。像这样的安装流程，有很多时候，我都会放弃安装该工具。使用起来也是 `yo xxx`，不是很好。
* `commander` 只需要全局安装要使用的工具就可以了，十分方便。使用起来也是直接调用该工具的命令就可以了。

通过上面的比较，我觉得 `commander` 比 `Yo` 更加灵活，开发出来的工具安装更加方便，使用起来体验会更好。

### 使用 commander 开发工具

#### commander API

```js
name();        // 定义工具 name ，一般引用package.name
version();     // 定义工具版本，一般引用package.version
usage();       // 设置命令格式
command();     // 定义命令
description(); // 对命令的描述
option();      // 定义参数
action();      // 回调函数
arguments();   // Define argument syntax for the top-level command.
parse();       // 绑定命令行输入的参数
outputHelp();  // 输出 --help 的内容
```

#### 实例

首行一定要是 `#!/usr/bin/env node`。

```js
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
    const args = {};
    cmd.options.forEach(o => {
        const key = o.long.replace(/^--/, '');
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key];
        }
    })
    return args;
}
```

#### Demo 地址
[commanderDemo](https://github.com/idujiawei/commanderDemo)

### 总结

`commander` 的使用十分简单，我将处理逻辑的 js 拆了出来，入口文件会更加简洁明了，逻辑 js 各负责各的逻辑，一个文件里的代码量少了，更加好书写，后期维护也更加方便。  
