const jwt=require("jsonwebtoken")
const path = require('path');
const envFilePath = path.join(__dirname, '../.env');
console.log(envFilePath)
require('dotenv').config({path:envFilePath})
const productctrl=require('../controler/productctrl.js')
const userctrl=require('../controler/userctrl.js')

const verifylogin=(req, res,next)=>{
    const authHeader=req.headers['authorization']
    console.log(authHeader)
    const token=authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    console.log("works")
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(err) return res.sendStatus(401)
        req.phone=decoded.phone
        next()
    })
}

const refreshToken=async(req,res,next)=>{
    try {
        const refreshToken=req.cookies.refreshtoken
        if(!refreshToken) return res.sendStatus(401)
        const [getrefresh]=userctrl.getauth(refreshToken)
        if(!getrefresh.access) return res.sendStatus(403)
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,decoded)=>{
            if(err) return res.sendStatus(403)
            const id=data.idusr
            const name=data.nm
            const phn=data.phn
            const pw=data.pw
            const Accesstoken=jwt.sign({id,name,phn,pw},process.env.ACCESS_TOKEN,{expiresIn:"20s"})
            res.json({"message":Accesstoken})
        })
        
    } catch (error) {
        console.log(error)
        res.json({"message":error})
    }

}

const verifyuser=(req,res,next)=>{
    const user = req.cookies.user; // Authenticated user
    console.log(user)
   // Assuming you use /products/:productId route

    // Retrieve the product from your database based on productId
    const product = productctrl.getproduct;

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user is the owner of the product or has admin rights
    if (user === product.usrnm ) {
        next(); // User has permission
    } else {
        return res.status(403).json({ message: 'Permission denied' });
    }
}

module.exports={verifylogin,verifyuser,refreshToken}