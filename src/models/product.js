const dbpool=require('../config/database.js')

const getproduct=(name)=>{
    const query=`SELECT * FROM product WHERE nm LIKE '${name}'`
    console.log(name)
    return dbpool.execute(query)
}

const getallproduct=()=>{
    const query=`SELECT * FROM PRODUCT`
    return dbpool.execute(query)
}

const addproduct=(body)=>{
    console.log(body)
    const query=`INSERT INTO product(nm,desc,usrnm,pct) VALUES ('${body.name}','${body.desc}','${body.usrnm}','${body.pct}')`
    return dbpool.execute(query)
}

const updateproduct=(body,id)=>{
    const query=`UPDATE product SET nm='${body.name}',desc='${body.desc}',usrnm='${body.usrnm}',pct='${body.pct}' WHERE idusr='${id}'`
    return dbpool.execute(query)
}

const deleteproduct=(id,name)=>{
    const query=`DELETE FROM product WHERE idusr='${id,name}'`
    return dbpool.execute(query)
}


module.exports={getallproduct,getproduct,addproduct,updateproduct,deleteproduct}