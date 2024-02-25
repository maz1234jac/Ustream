const Follow=require("../models/Follow");

exports.followUser=async(req,res)=>{
    try{
        //1. get followingId
        const {followingId}=req.body;

        if(!followingId){
            return res.status(404).json({
                success:false,
                message:"Please give the followingId carefully"
            })
        }

        //2. extract the token from the user 
        const token=req.user;

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Didn't fetch the token"
            })
        }

        //3. followerId -> for user who is going to follow
        const followerId=token.id;

        if(!followerId){
            return res.status(402).json({
                success:false,
                message:"follwerId didn't fetched"
            })
        }

        //4. find the existing user in db
        const existingFollow=await Follow.findOne({
            follower:followerId,
            following:followingId,
        })

        if(existingFollow){
            await existingFollow.remove();

            //Upadte the User.db




            

            return res.status(200).json({
                success:true,
                message:"User Unfollowed"
            })
        }else{
            const follow=new Follow({
                follower:followerId,
                following:followingId
            });
            await follow.save();

            //UPDATE THE USER DB

            return res.status(201).json({
                success:true,
                message:"Successfully Followed"
            })
        }
    }
    catch(error){
        console.log("Error occured in Follow controller");
        return res.status(500).json({
            success:false,
            message:"Internal Server Error in Follow"
        })
    }
}