const express=require ('express')
const cookieParser = require('cookie-parser')
const cors=require ('cors')
require('dotenv').config();
const connectDB = require('./config/db');
const router=require('./routes')
const app=express()
app.use(cookieParser())
app.use(cors({
    origin : 'http://localhost:3000',
    credentials:true
}))
app.use(express.json())   
app.use("/api",router)
const PORT=8080 || process.env.PORT
this
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log('connet to db')
        console.log("server is running",PORT)
    })
})


