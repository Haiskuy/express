const dbpool=require('../config/database.js')
const bcrypt= require ('bcrypt')


const getauth=(refresh)=>{
    const query='SELECT * FROM usr WHERE access=?'
    return dbpool.execute(query,[refresh])
}

const getspecific=(select,)=>{
    const query=`SELECT * FROM usr `
}

const patch=(access,id)=>{
    console.log(access,id)
    const query=`UPDATE usr SET access='${access}' WHERE idusr='${id}'`
    return dbpool.execute(query)
}

const login = async (phone) => {
    const querylog =`SELECT * FROM usr WHERE phn LIKE '${phone}'`
    try {
        const [data] = await dbpool.execute(querylog);
        data != undefined ?console.log(data):console.log("undefind1"); // Log the data
        return data;
    } catch (error) {
      console.error(error); // Log any errors
      throw error; // Re-throw the error to propagate it up the call stack if necessary
    }
};

const getalluser=(search)=>{
    const query=`SELECT * FROM usr WHERE nm LIKE '${search}'`
    return dbpool.execute(query)
}


const adduser=(body)=>{
    console.log("done")
    const salt=10;
    bcrypt.hash(body.password,salt,(err,hash)=>{

        const query=`INSERT INTO usr(nm,phn,adrss,pw,clss) VALUES ('${body.name}','${body.phone}','${body.address}','${hash}','${body.class}')`
        return dbpool.execute(query)
    })
}

const updateuser=(body,id)=>{
    const query=`UPDATE usr SET nm='${body.name}',phn='${body.phone}',adrss='${body.address}',pw='${body.password}',clss='${body.class}' WHERE idusr='${id}'`
    return dbpool.execute(query)
}


const updateaccess=(id)=>{
    const query=`UPDATE usr SET access=null WHERE idusr='${id}'`
    return dbpool.execute(query)
}


const deleteuser=(id)=>{
    const query=`DELETE FROM usr WHERE idusr='${id}'`
    return dbpool.execute(query)
}

module.exports={updateaccess,getauth,getalluser,adduser,updateuser,deleteuser,login,patch}