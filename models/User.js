const mongoose=require("mongoose");
const bcrypt =require('bcryptjs');
const Schema =mongoose.Schema;
const jwt =require("jsonwebtoken");
const crypto=require("crypto");

const UserSchema=new Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    password:{
        type:String,
        minlength:[6,"Please provide a password with min lenght 6"],
        required:[true,"Please provide a password"],
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    phone:{
        type:String,
        minlength:[10,"Please provide a phone with min lenght 10"]
    },
    blocked:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }
});

//UserSchema Methods
UserSchema.methods.generateJwtFromUser =function(){
  const{JWT_SECRET_KEY,JWT_EXPIRE}=process.env;

    const payload={
        id:this._id,
        name : this.name
    };

    const token =jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    });
    return token;
};
UserSchema.methods.getReserPasswordTokenFromUser=function(){
const randomHexString =crypto.randomBytes(15).toString("hex");
const {RESET_PASSWORD_EXPIRE}=process.env;

const resetPasswordToken=crypto
.createHash("SHA256")
.update(randomHexString)
.digest("hex");

 this.resetPasswordToken=resetPasswordToken;
 this.resetPasswordExpire=Date.now() + parseInt(RESET_PASSWORD_EXPIRE);
 return resetPasswordToken;

};
//Pre Hooks
UserSchema.pre("save",function(next){
//Parola Değişme
if(!this.isModified("password")){
    next();
}

bcrypt.genSalt(10,(err,salt)=>{
   if(err) next(err);
   bcrypt.hash(this.password,salt,(err,hash)=>{
       if(err) next(err);
       this.password=hash;
       next();
   });
});
});
module.exports=mongoose.model("User",UserSchema);