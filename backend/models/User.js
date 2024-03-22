const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:String,
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
        },
    ],
    savedPosts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SavePost",
        }
    ],
    follow:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Follow"
        }
    ],
    followersCount:{
         type: Number, 
         default: 0 
    },
    followingCount:{ 
        type: Number,
         default: 0 
    },

    additionDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },
},{timestamps:true})

module.exports=mongoose.model("User",userSchema);