const { timeStamp } = require('console')
const multer=require('multer')
const path=require('path')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../public/images')
    },filename:(req,file,cb)=>{
        const time=new Date().getTime()
        const filename=file.originalname
        
        cb(null,`${time}-${filename}`)
    }
})

const upload=multer({storage:storage})

module.exports={upload}