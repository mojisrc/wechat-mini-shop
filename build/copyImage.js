var fs = require('fs-extra');
let join = require('path').join;
var colors = require('colors');


colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});
var originFolderName = 'src'
var originFolder = './' + originFolderName;
var targetFolderName = 'dist'

/**
 *
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result = [];

    function finder(path) {
        let files = fs.readdirSync(path);
        files.forEach((val) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(fPath);
        });

    }

    finder(startPath);
    return result;
}

/**
 * 获得图片
 */
function fliterImageFromFiles() {
    let fileNames = findSync(originFolder);
    let _fileNames = []

    for (var i = 0; i < fileNames.length; i++) {
        let _match = fileNames[i].match(/\/((.*)\.(?:png|jpg|gif|bmp))$/i)
        if (_match !== null) {
            _fileNames.push(_match['input'])
        }
    }
    return _fileNames
}


function copyTo() {
    let files = fliterImageFromFiles()
    for (var i = 0; i < files.length; i++) {
        let file = files[i]
        var reg = new RegExp("^" + originFolderName, "g");
        fs.copy(file, file.replace(reg, targetFolderName))
            .catch(err => console.error(file.error))
    }
    // console.log("copy images complete ! ~".info)
}


module.exports = {
    copyTo:()=>{
        copyTo()
    }
}
