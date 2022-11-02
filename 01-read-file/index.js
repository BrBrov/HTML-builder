const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

let way = path.resolve(__dirname, 'text.txt');

let stream = fs.createReadStream(way, 'utf-8');

// stream.on('data', (data)=>{
    // console.log(data);
// })

stream.pipe(stdout);