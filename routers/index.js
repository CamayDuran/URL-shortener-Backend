const express =require('express');
const url=require("./url");
const auth =require("./auth");
const user=require("./user");
const group = require("./group");
const Url =require('../models/Url');
const { register } = require('../controllers/auth');

const router=express.Router();


router.use("/url",url);
router.use("/auth",auth);
router.use("/users",user);
router.use("/group",group);

router.get('/:code',async(req,res)=>{
    try{
        const url=await Url.findOne({urlCode:req.params.code});
        if(url){
            return res.redirect(url.longUrl);
        }
        else{
            return res.status(404).json('No url found');
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json('Serer error');
    }
});
module.exports=router;