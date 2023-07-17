const express=require('express');
const authRoute=require('../functionality/Controllers/AuthRoute');
const usersRoute=require('../functionality/Controllers/UsersRoute');
const cors=require('cors');
require('dotenv').config();
const app=express();

app.get("/",function(req,res){
 res.send("hello");
})

app.get("/contact",function(req,res){
    res.send("contact me on hassan@gmail.com");
   })

app.get("/about",function(req,res){
    res.send("hello i am hassan i have 21 years old");
   })



app.use(express.json(),cors());

app.use(authRoute,usersRoute);



app.listen(process.env.PORT,function(){
    console.log(`Server started on port ${process.env.PORT}`);
})