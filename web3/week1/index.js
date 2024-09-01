const crypto=require('crypto');

const input='100xdevs';
const hashAlgo=crypto.createHash('sha256');
const inputhash=hashAlgo.update(input)
const afterEncodedHash=inputhash.digest('hex');

console.log(`hashAlgo: ${JSON.stringify(hashAlgo)} , inputhash: ${JSON.stringify(inputhash)} afterEncodedHash: ${afterEncodedHash}`);



