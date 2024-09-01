const express = require('express');
const app = express();
const PORT=3000;

let requestCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable
const countTheServerRequestMiddleware=(req,res,next)=>{
requestCount++;
next();
}

app.use(countTheServerRequestMiddleware);


app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', function(req, res) {
  res.status(200).json({ requestCount });
});

app.listen(PORT,()=>{
  console.log(`Server is listening on port : ${PORT}`)
})