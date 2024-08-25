const {Command}=require('commander');
const program =new Command();
const fsPromise=require('fs').promises;

program
.option('-r,--read',"read the word of file ")

// console.log('program: ',program.opts())
console.log(process.argv);
program.parse(process.argv);
// console.log('program: ',program.opts())
const options=program.opts();

const readFile=(filePath)=>{
 fsPromise.readFile(filePath,'utf-8')
 .then((data)=>console.log(data))
 .catch(err=>console.log(err));
}

// if(options.read){
//     readFile();
// }