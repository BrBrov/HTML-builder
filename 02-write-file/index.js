const path = require('path');
const fs = require('fs');
const process = require('process');
const readline = require('readline');
const { stdin, stdout } = require('process');

let way = path.resolve(__dirname, 'text.txt');
let stream = fs.createWriteStream(way, 'utf-8');
let str = readline.createInterface({ input: process.stdin, output: process.stdout });

let exitMessage = ()=>{
    console.log('Program already have been exit!');
}

console.log('Enter your text: ');

str.on('line', (data)=>{
    if(data === 'exit'){
        exitMessage();
        process.exit(1);
    }else{
       console.log(data);
       stream.write(data); 
    }
})

process.on('beforeExit', ()=>{
    console.log('Program already have been exit!');
})

str.on('SIGINT', ()=>{  
    exitMessage();
    process.exit(2);
})