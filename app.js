const express=require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const {connectToDatabase}=require('./config/db')
const userRoutes=require('./routes/userRoutes')

global.a="aa"
connectToDatabase()
const app=express()
app.use(bodyParser.json());

app.use('/demo/user',userRoutes)

process.on('unhandledRejection', (reason)=>{
    console.log(reason);
})
  
process.on('uncaughtException', (error)=>{
console.log(error);
process.exit(1)
})

// const PORT=3000
app.listen(process.env.port, (error) =>{
    if(!error)    console.log("Server is Successfully Running,and App is listening on port "+ process.env.port)
    else    console.log("Error occurred, server can't start", error);
    }
);

