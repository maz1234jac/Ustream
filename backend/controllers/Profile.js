const Profile=require("../models/Profile");

exports.editAdditionalDetails=async(req,res)=>{
    try{
        //1. extract data
        const {gender,dateOfBirth,about}=req.body;

        //2. validatation
        if(!gender || !dateOfBirth || !about){
            return res.status(206).json({
                success:false,
                message:"Please all details carefully"
            })
        }

        //3. extract the current user from token
        const token=req.user;
        //validate
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Invalid token",
            })
        }

        //4. update the details in Profile models
        const updateProfile=await Profile.findOneAndUpdate(
            {user:token.id},
            {
                gender:gender,
                dateOfBirth:dateOfBirth,
                about:about,
            },
            {new:true});

        //5. check where profile model is upated or not
        if(!updateProfile){
            return res.status(400).json({
                success:false,
                message:"User profile not updated in Profile model"
            })
        }

        //6. update the user db -> NO NEED OF UPDATING THE USER MODEL.  

        //return the success response
        return res.status(200).json({
            success:true,
            message:"User's additional Details has been updated",
            data:updateProfile
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occurred in updating the User's additinal detial "
        })
    }
}