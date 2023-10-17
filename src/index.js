require('dotenv').config()
const path=require('path')
const PORT=process.env.PORT || 8000
const express=require('express')
const user=require('./routes/userRoute.js')
const product=require('./routes/productRoute.js')
const app=express()
const log=require('./middleware/log.js')
const { upload } = require('./middleware/multer.js')
const cors=require('cors')
const bodyprs=require('body-parser')

const cookieParser = require('cookie-parser');


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
app.use(cors(corsOptions))
app.use(express.json())
app.use(log)
app.use(cookieParser())
app.use(bodyprs.json())
app.use('/asset',express.static('../public/images'))
app.use('/user',user)
app.use('/product',product)


app.post('/upload',upload.single('photo'),(req,res)=>{
    res.json({message:"berhasil"})
})



app.listen(8000,()=>{
    console.log("listening")
})

module.exports=app