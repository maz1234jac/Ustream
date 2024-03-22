const Follower=require("../models/Follower");
const User =require("../models/User");

exports.follow=async(req,res)=>{
    try{
        //1.get the user id
        const {heroId}=req.body;

        if(!heroId){
            return res.status(204).json({
                success:false,
                message:"Please enter heroId"
            })
        }

        //2. find wether the heroId exists in the User model or not 
        const existingUser=await User.findById(heroId);

        if(!existingUser){
            return res.status(204).json({
                success:false,
                message:"No such user exist in User db"
            })
        }

        //3. extract the token
        const token=req.user;

        if(!token){
            return res.status(204).json({
                success:false,
                message:"Please login first",
            })
        }
        
        //4. Now find wether the user has already followed or not ?
        const alreadyFollowed=await Follower.findOne({
            follower:heroId,
            following:token.id
        })

        //if already follow then unfollow the user
        if(alreadyFollowed){
            //delete from follower model
            const unfollow=await Follower.findOneAndDelete(
                {follower:heroId,following:token.id}
            )

            if(!unfollow){
                return res.status(204).json({
                    success:false,
                    message:"Error occured while unfollow"
                })
            }

            //update the user model
            const removeFollow=await User.findByIdAndUpdate(
                heroId,
                {
                    $pull:{
                        follow:alreadyFollowed._id
                    }
                },
                {new:true}
            )

            if(!removeFollow){
                return res.status(500).json({
                    success:false,
                    message:"Error occured in unfollowing in user model"
                })
            }

            // Update follower count for target user and following count for current user
            await User.findByIdAndUpdate(heroId, 
                {
                    $inc: { 
                        followersCount: -1 
                    } 
                });
            await User.findByIdAndUpdate(token.id, 
                { 
                    $inc: { 
                        followingCount: -1 
                    } 
                });

            return res.status(200).json({
                success:true,
                message:"User Unfollowed",
                data:removeFollow
            })
        }else{
            //follow the user
            const followHero=await Follower.create({
                follower:heroId,
                following:token.id
            })

            if(!followHero){
                return res.status(304).json({
                    success:false,
                    message:"Post not saved"
                })
            }

            const updateUser=await User.findByIdAndUpdate(
                heroId,
                {
                    $push:{
                        follow:followHero._id
                    }
                },
                {new:true}
            ).populate("follow").populate("following").exec();

            if(!updateUser){
                return res.status(304).json({
                    success:false,
                    message:"User db not udpated"
                })
            }

            // Update follower count for target user and following count for current user
            await User.findByIdAndUpdate(heroId, 
                { 
                    $inc: { followersCount: 1 } 
                });
            await User.findByIdAndUpdate(token.id, 
                { 
                    $inc: { followingCount: 1 } 
                });

            return res.status(200).json({
                success:true,
                message:"user followed",
                data:updateUser
            })
        }
    }catch(error){
        console.log("Error occured while following the user");
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}