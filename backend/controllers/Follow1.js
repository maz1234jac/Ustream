const User =require("../models/User");

exports.follow=async(req,res)=>{
    try{
        //1.get the user id
        const {heroId}=req.body;
        console.log(heroId)

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

        const joUserFollowKarRaha=await User.findById(token.id);
        if(!joUserFollowKarRaha){
            return res.status(404).json({
                success:false,
                message:"Invalid User"
            })
        }
        
        //4. Now find wether the user has already followed or not ?
        const alreadyFollowed = await User.findOne({
            _id: heroId,
            followers: { $elemMatch: { _id: token.id } }
        });

        //if already follow then unfollow the user
        if(alreadyFollowed){
            //update the user model
            const removeFollow = await User.findByIdAndUpdate(
                heroId,
                { $pull: { followers: { _id: joUserFollowKarRaha._id } } },
                { new: true }
            );

            if(!removeFollow){
                return res.status(500).json({
                    success:false,
                    message:"Error occured in unfollowing in user model"
                })
            }

            //remove from following
            const removeFollowing = await User.findByIdAndUpdate(
                token.id,
                { $pull: { following: { _id: existingUser._id } } },
                { new: true }
            );

            if(!removeFollowing){
                return res.status(500).json({
                    message:false,
                    message:"User following error"
                })
            }

            return res.status(200).json({
                success:true,
                message:"Following",
                data:removeFollow
            })
        }else{

            const updateUser=await User.findByIdAndUpdate(
                heroId,
                {
                    $push:{
                        followers:joUserFollowKarRaha
                    }
                },
                {new:true}
            );

            if(!updateUser){
                return res.status(304).json({
                    success:false,
                    message:"User db not udpated"
                })
            }

            //also update the following
            const updateFollwoing=await User.findByIdAndUpdate(
                token.id,
                {
                    $push:{
                        following:existingUser,
                    }
                },
                {new:true}
            );

            if(!updateFollwoing){
                return res.status(500).json({
                    success:false,
                    message:"following creation errror",
                })
            }

            return res.status(200).json({
                success:true,
                message:"Follow",
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

exports.findUsersNotFollowed = async (req, res) => {
    try {
        const token = req.user;

        // Find the current user to get their followers
        const currentUser = await User.findById(token.id);

        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Get the IDs of users already followed by the current user
        const followedUserIds = currentUser.following.map(follower => follower._id);
        console.log(followedUserIds)

        // Find users who are not followed by the current user
        const usersNotFollowed = await User.find({
            $and: [
                { _id: { $nin: followedUserIds } }, // Not in the followedUserIds array
                { _id: { $ne: token.id } }, // Exclude the current user from the results
            ]
        });

        console.log(usersNotFollowed)
        return res.status(200).json({
            success: true,
            message: "Users not followed by the current user",
            data: usersNotFollowed,
        });
    } catch (error) {
        console.error("Error occurred while finding users not followed:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
