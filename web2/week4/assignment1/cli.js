const {Command} =require('commander');
const { readFile } = require('fs');
const path = require('path');
const program =new Command();


program
.name('file reader')
.description('CLI to count the sentences ,words and so on  from file')
.argument('<first>','file path')
.option('-s,--sentence','counting the sentences')
.option('-w,--word','counting the word')
.action((first,options)=>{

    const filePath=path.join(__dirname,first);
    readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            throw err;
        }
        if(options.sentence){
            const sentenceCount=data.split('\n').length;
            console.log("sentence: ",sentenceCount);
          }
          if(options.word){
            const wordCount=data.split(' ').length;
            console.log("word: ",wordCount)
          }
    })
})

program.parse();