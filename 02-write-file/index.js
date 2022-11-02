const path = require('path');
const fs = require('fs');
const process = require('process');
const readline = require('readline');
const { stdin, stdout } = require('process');

let way = path.resolve(__dirname, 'text.txt');
let stream = fs.createWriteStream(way, 'utf-8');
let str = readline.createInterface({ input: process.stdin, output: stream });

let exitMessage = ()=>{
    console.log('Program already have been exit!');
}

console.log('Enter your text: ');

str.on('line', (data)=>{
    if(data === 'exit'){
        process.exit(1);
    }else{
       stream.write(data); 
    }
})

process.on('SIGINT', ()=>{  
    process.exit(1);
})

process.on('exit', ()=>{
    stream.end();
    exitMessage();
})