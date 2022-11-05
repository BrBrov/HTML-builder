const path = require('path');
const fs = require('fs/promises');
const { join } = require('path');

let pathOfTemplates = {
    components: path.resolve(__dirname, 'components'),
    styles: path.resolve(__dirname, 'styles'),
    assets: path.resolve(__dirname, 'assets')
}
let pathOfDist = {
    html: path.join(__dirname, 'project-dist/index.html'),
    css: path.join(__dirname, 'project-dist/style.css'),
    assets: path.join(__dirname, 'project-dist/assets')
}

let pathTemplate = path.resolve(__dirname, 'template.html');

// do dist folder
async function createDist(pathOfDist) {
    await fs.rm(path.join(__dirname, 'project-dist'), { force: true, recursive: true });
    await fs.mkdir(path.join(__dirname, 'project-dist'));
    await fs.mkdir(pathOfDist.assets);
    await fs.writeFile(pathOfDist.html, '', 'utf-8');
    await fs.writeFile(pathOfDist.css, '', 'utf-8');
}
// create HTML file
async function constructHTML(pathOfTemplates, pathTemplate, pathOfDist) {
    let arrData = await fs.readFile(pathTemplate, 'utf-8');
    arrData = arrData.split(/[\n]/);
    for await (let item of arrData) {
        if (item.search(/[{{].*[}}]/g) !== -1) {
            let resArr = [];
            let indexTag = arrData.indexOf(item);
            let i = item.search(/[{{].*[}}]/g);
            let fName = item.slice(i + 2, item.length - 3);
            let prefix = item.slice(0, i);
            let data = await fs.readFile(path.join(pathOfTemplates.components, `${fName}.html`), 'utf-8');
            item = [];
            data = data.split(/\n/);
            data.forEach(tag => {
                tag = prefix + tag;
                item.push(tag);
            })
            arrData[indexTag] = item.join('\n');
            arrData[indexTag] = arrData[indexTag].concat('\n');
        }
    }
    await fs.writeFile(pathOfDist.html, arrData);
}
// create CSS file
async function constructCSS(pathOfTemplates, pathOfDist) {
    let arrayFiles = await fs.readdir(pathOfTemplates.styles, { withFileTypes: true });
    arrayFiles.reverse();
    for await (const file of arrayFiles) {
        if (file.isFile()) {
            let data = await fs.readFile(path.join(pathOfTemplates.styles, `${file.name}`), 'utf-8');
            await fs.appendFile(path.join(pathOfDist.css), data);
        }
    }
}
// copy assets files 
async function copyrightFiles(pathOfTemplates, pathOfDist){
    let arrayFiles = await fs.readdir(pathOfTemplates, {withFileTypes: true});
    for (const file of arrayFiles){
        if(file.isFile()){
            await fs.copyFile(path.join(pathOfTemplates, file.name), path.join(pathOfDist, file.name));
        }else{            
            let templates = path.join(pathOfTemplates, file.name);
            let dist = path.join(pathOfDist, file.name);
            await fs.mkdir(dist);
            await copyrightFiles(templates, dist)
        }
    }
}
// entry function
async function procedure(pathOfTemplates, pathTemplate, pathOfDist) {
    await createDist(pathOfDist);
    await constructHTML(pathOfTemplates, pathTemplate, pathOfDist);
    await constructCSS(pathOfTemplates, pathOfDist);
    await copyrightFiles(pathOfTemplates.assets, pathOfDist.assets);
}

procedure(pathOfTemplates, pathTemplate, pathOfDist);