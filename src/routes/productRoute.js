const express=require('express')
const productctrl=require('../controler/productctrl.js')
const { verifyuser } = require('../middleware/verify.js')
const router=express.Router()



router.post('/',productctrl.addproduct)
router.get('/:name',productctrl.getproduct)
router.get('/',productctrl.getallproduct)
router.patch('/:id',verifyuser,productctrl.updateproduct)
router.delete('/:id',productctrl.deleteproduct)

module.exports=router