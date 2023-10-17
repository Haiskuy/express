const express=require('express')
const userctrl=require('../controler/userctrl.js')
const { verifylogin, refreshToken } = require('../middleware/verify.js')
const router=express.Router()



router.post('/',userctrl.adduser)//body name,phone,address,password,class
router.post('/login',userctrl.login)//body phone,password
router.post('/logout',userctrl.logout)
router.get('/',verifylogin,userctrl.getspecificuser)//authentorize,body id
router.patch('/:id',userctrl.updateuser)//body id
router.delete('/:id',userctrl.deleteuser)//body id
router.get('/auth',refreshToken)


module.exports=router