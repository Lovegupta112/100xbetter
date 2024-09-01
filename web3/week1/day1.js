const crypto=require('crypto');


const findMatchWithPrefix=(input)=>{
 let value=0;
 while(true){
    // const hash=crypto.createHash('sha256').update(`${value}`).digest('hex');
    // const hash=crypto.createHash('sha256').update(`100xdevs${value}`).digest('hex');
    const hash=crypto.createHash('sha256').update(`harkirta => raman | 100 ${value}`).digest('hex');
    console.log('hash...',hash,input,value);
    // console.log("222...","hello1234".startsWith('hell'));
    if(hash.startsWith(input)){
        return {hash,value};
    }
    value++;
 }
}

const input='00000';
const result=findMatchWithPrefix(input);
console.log(`findMatchWithPrefix for  ${input} : ${JSON.stringify(result)}`)
