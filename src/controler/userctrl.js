const database=require('../models/user.js')
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const path = require('path');
const { refreshToken } = require('../middleware/verify.js');
const envFilePath = path.join(__dirname, '../.env');
console.log(envFilePath)
require('dotenv').config({path:envFilePath})

const login=async (req,res)=>{
    const {phone,password}=req.body
    console.log(phone,password)
    try {
        const [data]= await database.login(phone)
        console.log(data)
        if (data!=undefined) {
            const match=await bcrypt.compare(password,data.pw)
            if(match==true) {
                
                const id=data.idusr
                const name=data.nm
                const phn=data.phn
                const pw=data.pw
                const Accesstoken=jwt.sign({id,name,phn,pw},process.env.ACCESS_TOKEN,{expiresIn:"3600s"})
                const Refreshtoken=jwt.sign({id,name,phn,pw},process.env.REFRESH_TOKEN,{expiresIn:"7d"})
                try {
                    await database.patch(Refreshtoken,id)
                    console.log("ini database",Refreshtoken)
                } catch (error) {
                    console.log(error)
                }
                console.log("ini kuki",Refreshtoken)
                res.cookie('refreshtoken',Refreshtoken,{httpOnly:true,maxAge:24*60*60*1000})
                res.cookie('user',decodeURIComponent(name),{httpOnly:true,maxAge:24*60*60*1000})
                res.json({aess:Accesstoken,data:data,message:"loged in",match:match})

            }else{res.status(400).json({message:"your pass doesnt match"})}
        }else{  
            res.json({message:"no data avalible"})    
        }
    } catch (error) {
        error
    }
}


const getspecific=(req,res)=>{}




const adduser= async(req,res)=>{
    const {body}=req
    console.log("done1")
    try {
        console.log("done2")
        if(body.name!="" && (body.phone!="" && body.phone.length<13) && body.address!="" && body.password!="" && body.class!="" ){
            
            database.adduser(body)
            console.log("done all")
            res.json({message:"create new user",data:body})
        }else{console.log("err")}
    } catch (error) {
        res.json({message:"error",data:error})
    }

}




const   getspecificuser=async (req,res)=>{
    const search=req.query.q
    console.log(search)
    try {
        const [data]= await database.getalluser(search)
        res.json({message:"get",data:data})
    } catch (error) {
        res.status(500).json({message:"undefined",serverError:error})
    }

}




const getuser=async (req,res)=>{
    try {
        const [data]= await database.getalluser()
        res.json({message:"get",data:data})
    } catch (error) {
        res.status(500).json({message:"undefined",serverError:error})
    }
}



const updateuser=async(req,res)=>{
    const {id}=req.params
    const{body}=req
    try {
        await database.updateuser(body,id)
        res.json({message:"update",data:id,...body})
    } catch (error) {
        res.json({message:'undefine',serverError:error})
    }
}




const deleteuser=async(req,res)=>{
    const {id}=req.params
    try {
        await database.deleteuser(id)
        res.json({message:"delete"})
    } catch (error) {
        res.json({serverError:error})
        
    }
}



const getuserrefresh = async (req, res) => {
    const refreshToken = req.cookies.refreshtoken;
    const data = await database.getauth(refreshToken);
    return data;
}

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshtoken;
        console.log("first",refreshToken)
        if (!refreshToken) return res.sendStatus(401);
        const [[userrefresh]] = await getuserrefresh(req, res);
        console.log("usrrfrsh",userrefresh)
        if (!userrefresh.access) return res.sendStatus(401);
        const userid = userrefresh.idusr;
        await database.updateaccess(userid);
        res.clearCookie('refreshtoken');
        res.status(200).json({message: "log out"});
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({message: "An error occurred"});
    }
}


module.exports = {getuserrefresh,getuser,getspecificuser,adduser,updateuser,deleteuser,login,logout}