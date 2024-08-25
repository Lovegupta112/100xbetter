const fs=require('fs');
const path = require('path');

// synchronously -----
const content=fs.readFileSync('a.txt','utf-8');
// console.log('6..',path.join(__dirname,'b.txt'))
const dir=path.join(__dirname,'b.txt');
fs.writeFileSync(dir,content);
console.log('content: ',content);


// read asynchornously ------
const content1=fs.readFile(dir,'utf-8',(err,data)=>{
    if(err){
        console.log('15: error',err);
        return ;
    }
    console.log('data...',data);
})
console.log('content1: ',content1);


