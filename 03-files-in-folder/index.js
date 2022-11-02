const fs = require('fs/promises');
const path = require('path');

let way = path.resolve(__dirname, 'secret-folder');

fs.readdir(way, {withFileTypes: true}).then(arr=>{
    arr.forEach(dirent =>{
        if(dirent.isFile()){           
            let filePath = path.join(way, dirent.name)
            fs.stat(filePath).then(info=>{
                let ext = path.extname(dirent.name);                
                let nameFile = path.basename(dirent.name, ext);
                ext = ext.slice(1);
                let size = Math.ceil(info.size/1024);
                console.log(`${nameFile} - ${ext} - ${size}kb`);
            });
        }
    })
})