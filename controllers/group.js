const Group =require('../models/Group');
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient}=require("../helpers/authorization/tokenHelpers");

const registergroup =asyncErrorWrapper( async (req,res,next)=>{

    //POST DATA

   const {GroupName,Description,GroupLinks}=req.body;

        const group= await Group.create({
          GroupName,
          Description,
          GroupLinks
        });
   
         sendJwtToClient(group,res);
});

const getAllGroup = asyncErrorWrapper(async (req,res,next)=>{
   const group = await Group.find();
   return res.status(200)
   .json({
     success: true,
     data: group
   });
});
module.exports={
registergroup,
getAllGroup
};