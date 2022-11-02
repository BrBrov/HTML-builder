const path = require('path');
const fs = require('fs/promises');

let pathStyle = path.resolve(__dirname, 'styles');
let pathDist = path.resolve(__dirname, 'project-dist');
console.log(pathDist);
fs.rm(path.join(pathDist, 'bundle.css'), { force: true })
    .then(r => {
        return fs.readdir(pathStyle, { withFileTypes: true })
    })
    .then(array => {
        array.forEach(dirent => {
            let ext = path.extname(path.join(pathStyle, dirent.name));
            if (dirent.isFile() && ext === '.css') {
                let pathDirent = path.join(pathStyle, dirent.name);
                fs.readFile(pathDirent, 'utf-8')
                    .then(data => {
                        fs.appendFile(path.join(pathDist, 'bundle.css'), data, 'utf-8');
                    })
            }
        })
    })