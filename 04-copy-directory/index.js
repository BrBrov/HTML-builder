const fs = require('fs/promises');
const path = require('path');

let copy = path.resolve(__dirname, 'files-copy');
let file = path.resolve(__dirname, 'files');

async function processing(copy, file) {
    let arr = await fs.readdir(file, { withFileTypes: true });

    for await (const dirent of arr) {
        let copyPath = path.join(copy, dirent.name);
        let filePath = path.join(file, dirent.name);
        if (dirent.isFile()) {
            await fs.copyFile(filePath, copyPath);
        } else {
            fs.mkdir(copyPath);
            await processing(copyPath, filePath);
        }
    }
}

let toDo = async function (copy, file, callback) {
    let res = await fs.mkdir(copy, { recursive: true });
    if (!res) {
        await fs.rm(copy, { recursive: true });
        await fs.mkdir(copy);
    }
    await callback(copy, file);
}

toDo(copy, file, processing);