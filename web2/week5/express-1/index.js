const express=require('express');
const app=express();
const PORT=3000;

let user1=
    {
        name:'john',
        todos:[
            {id:1,status:'pending',task:"make good basic dapp."},
            {id:2,status:'completed',task:"learn web2"}
        ]
    }

app.use(express.json())

// app.get("/healh",(req,res)=>{
//     const name=req.query.name;
//     res.send(`Hi There ! You are welcome ${name?name:''}.`);
// })
app.get("/todos",(req,res,next)=>{

   const noOfTask=user1.todos.length;
    const type=req.query.type;
    if(type==="pending"){
        const pendingTasks=user1.todos.filter((elm)=>elm.status==='pending').length;
        const pendingTasksNameList=user1.todos.filter((elm)=>elm.status==='pending').map((elm)=>elm.task);
       return  res.send({pendingTasks,tasks:pendingTasksNameList});
    }
    if(type==="completed"){
        const completedTasks=user1.todos.filter((elm)=>elm.status==='completed').length;
        const completedTasksNameList=user1.todos.filter((elm)=>elm.status==='completed').map((elm)=>elm.task);
       return  res.send({completedTasks,tasks:completedTasksNameList});
    }

   res.send({noOfTask});

})
app.post("/addTodo",(req,res)=>{
const body=req.body;
const maxTodoId=Math.max(...user1.todos.map((elm)=>elm.id));

console.log('body: ',body);
const newTodo={
    id:maxTodoId+1,
    status:'pending',
    task:body.task
}
user1.todos.push(newTodo);
res.send("New Todo Added SuccessFully !");
})
app.put("/",(req,res)=>{

})
app.delete("/",(req,res)=>{

})

app.listen(PORT,()=>{
    console.log(`Server is listening on port : ${PORT}`)
})