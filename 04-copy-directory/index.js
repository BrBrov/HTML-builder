const fs = require('fs/promises');
const path = require('path');

let way = path.resolve(__dirname, 'files-copy');
let copyPath = path.resolve(__dirname, 'files');

let toDo = async function(way, copyPath){
    let res = await fs.mkdir(way, {recursive: true});
    if(!res){
        await fs.rm(way, {recursive: true});
        await fs.mkdir(way);
    }

    let arr = await fs.readdir(copyPath, {withFileTypes: true});    

    for (const dirent of arr){
        let pathScr = path.join(copyPath, dirent.name);  
        let pathFile = path.join(way, dirent.name);      
        fs.copyFile(pathScr, pathFile);
    }
}

toDo(way, copyPath);


