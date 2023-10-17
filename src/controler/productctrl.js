const database=require('../models/product.js')

const addproduct= async(req,res)=>{
    const {body}=req
    try {
        await database.addproduct(body)
        res.json({message:"create new user",data:body})
    } catch (error) {
        res.json({message:"error",data:error})
    }


        // console.log(req.body)
        // res.json({message:"add",data:req.body})
}

const getproduct=async (req,res)=>{
    const {name}=req.params
    try {
        const [data]= await database.getproduct(name)
        res.json({message:"get",data:data})
    } catch (error) {
        res.status(500).json({message:"undefined",serverError:error})
    }

}

const getallproduct=async (req,res)=>{
    try{
        const [data]=await database.getallproduct()
        res.json({message:"get all data",data:data})
    }catch(err){
        console.log(err)
        res.json({message:"err",data:err})
    }
}


const updateproduct=async(req,res)=>{
    const {id}=req.params
    const{body}=req
    try {
        await database.updateproduct(body,id)
        res.json({message:"update",data:id,...body})
    } catch (error) {
        res.json({message:'undefine',serverError:error})
    }
}

const deleteproduct=async(req,res)=>{
    const {id}=req.params
    try {
        await database.deleteproduct(id)
        res.json({message:"delete"})
    } catch (error) {
        res.json({serverError:error})
        
    }

}



module.exports = {getallproduct,getproduct,addproduct,updateproduct,deleteproduct}