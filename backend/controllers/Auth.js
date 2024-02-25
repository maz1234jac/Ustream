const User=require("../models/User");
const Profile=require("../models/Profile");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.signUp=async(req,res)=>{
    try{
        //fetch data
        const {userName,fullName,email,password}=req.body;
        
        //validate data
        if(!userName || !fullName || !password || !email){
            return res.status(400).json({
                success:false,
                message:"Please fill all details carefully",
            })
        }

        //find the user if already exists or not in db
        const findUserName=await User.findOne({userName});
        if(findUserName){
            return res.status(409).json({
                success:false,
                message:"User already exist in the Database! Please Login"
            })
        }

        //hash the password
        const hashedPassword=await bcrypt.hash(password,10);

        //create profile with null value and update in db
        const additionDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            mobileNumber:null,
        })

        //create entry among User db
        const user=await User.create({
            userName,
            fullName,
            email,
            password:hashedPassword,
            additionDetails:additionDetails,
            image:`https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`
            //this is a api used to create inital image.
            
        })

        //now update the additinal deatils model-> Profile.js with user.id
        additionDetails.user=user.id;
        additionDetails.save();
        

        user.password=null;

        //return the response
        return res.status(200).json({
            success:true,
            message:"User registerd successfully",
            message:user,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occurred while signUp",
            data:error.message,
        })
    }
}

//login
exports.login=async(req,res)=>{
    try{
        //fetch username and password
        const {userName,password}=req.body;

        //validation
        if(!userName || !password){
            return res.status(404).json({
                success:false,
                message:"Please fill the all data carefully",
            })
        }

        //check username is present or not in db ?
        const user=await User.findOne({userName});
        if(!user){
            //if user not found in the db
            return res.status(404).json({
                success:false,
                message:"User not found ! Please Signup First",
            })
        }

        //verify the password and create jwt token
        if(await bcrypt.compare(password,user.password)){
            //create payload
            const payload={
                username:user.userName,
                id:user._id,
                additionDetails:user.additionDetails
            }

            //create token for further use
            const token=jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h"
                                });

            user.token=token;
            user.token.password=undefined;//keeping the password secret

            //creating cookie
            const options={
                expires:new Date(Date.now()+3*24*60*50*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in Successfully"
            });
        }else{
            //password do not matched
            return res.status(403).json({
                success:false,
                message:"Password do not matched",
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occured during log in",
            error:error.message,
        })
    }
}