const path = require('path');
const envFilePath = path.join(__dirname, '../.env');
console.log(envFilePath)
require('dotenv').config({path:envFilePath})
console.log(process.env.DB_HOST)
const mysql=require('mysql2')   
    const dbpool=mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    })

module.exports=dbpool.promise()