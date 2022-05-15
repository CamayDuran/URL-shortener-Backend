const express =require('express');
const {registergroup,getAllGroup}=require('../controllers/group');
const router = express.Router();

router.post("/registergroup",registergroup);
router.get("/getAllGroup",getAllGroup);


module.exports=router;