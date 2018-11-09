const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp'); // 引入 mkdirp，因为 fs.mkdir 不支持生成多级目录

// 将传入的路径解析成一个绝对路径
// 判断该文件是否存在
function dirIsExist(l) {
    const root = path.resolve(l);
    return fs.existsSync(root);
}

// 生成中间目录
function mkdir(l) {
    // 筛选传入的参数，是否包含目录路径
    const basename = path.dirname(l);

    // !== '.' 表示传入的参数包含路径
    if (basename !== '.') {
        // 将传入的路径解析成一个绝对路径
        // 判断路径是否存在
        // 如果不存在，生成该目录
        
        if (!dirIsExist(basename)) {    
            mkdirp.sync(basename);
        }
    }
}

module.exports = {
    dirIsExist: dirIsExist,
    mkdir: mkdir
};