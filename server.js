const express=require('express');
const mongoose=require('mongoose')
const app=express();
const cors=require("cors")
app.use(express.json());
require('./connection')

const router1 = require('./routes/userRoute');
const router2 = require('./routes/clinicRoute')
const router3 = require('./routes/taskRoute')

app.use(cors());

PORT=process.env.PORT||7000;



app.use('/',router1);
app.use('/',router2);
app.use('/',router3);
app.listen(PORT,()=>{
    console.log(`server started ap PORT : ${PORT}`)
})