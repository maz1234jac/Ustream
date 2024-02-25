const mongoose=require("mongoose");

const followersSchema=new mongoose.Schema({
    follow:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true})

const followingSchema=new mongoose.Schema({
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
},{timestamps:true})

const Followers=mongoose.model("Followers",followersSchema);
const Following=mongoose.model("Following",followingSchema);

module.exports={Followers,Following};
