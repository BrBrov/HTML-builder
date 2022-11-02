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

// fs.mkdir(way, {recursive: true})
// .then(result =>{
    // if(!result){
        // return fs.rm(way, {recursive: true}).then(r=>{
        //    fs.mkdir(way); 
        // })        
    // }
// })
// .then(r=>{
    // return fs.readdir(copyPath, {withFileTypes: true});
// })
// .then(arr=>{
    // for(const dirent of arr){
        // let pathScr = path.join(copyPath, dirent.name);  
        // let pathFile = path.join(way, dirent.name);      
        // fs.copyFile(pathScr, pathFile);
    // }
// })