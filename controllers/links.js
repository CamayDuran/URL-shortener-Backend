const Url =require('../models/Url');
const asyncErrorWrapper = require("express-async-handler");

const getAllLinks = asyncErrorWrapper(async (req,res,next)=>{
    const url = await Url.find();
    return res.status(200)
    .json({
      success: true,
      data: url
    });
 });
module.exports={
 getAllLinks
};