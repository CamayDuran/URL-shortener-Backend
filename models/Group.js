const mongoose=require('mongoose');

const GroupSchema=new mongoose.Schema({
    GroupName:{
        type:String,
        required:[true,"Please provide a group name"]
    },
    Description:{
        type:String
    }
   
});

module.exports=mongoose.model('Group',GroupSchema);