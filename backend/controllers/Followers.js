const {Followers,Following}=require("../models/Follow");
const User=require("../models/User");

//follow user
exports.followUser = async (req, res) => {
    try{
        //1. fetch userId of user whom to follow
        const {userId}=req.body;
  
        //2 Check if the user exists
        const userToFollow = await User.findById(userId);
        if (!userToFollow) {
            return res.status(404).json({
            success: false,
            message: 'User doesnot exist in the User model',
            });
        }

        //TODO --> ADD a functionalites to follow the user only once.
       
  
        //3. Create a follower entry
        const newFollower = await Followers.create({ follow: userId });
  
        //4. Update the following list of the current user
        await User.findByIdAndUpdate(
            req.user.id,
            { 
                $push:{ 
                    following: newFollower._id 
                }
            },
            {new:true});

        //5. create a following entry
        const newFollowing = await Following.create({ following:req.user.id});

        //6. Update the followers list of the user being followed
        await User.findByIdAndUpdate(
            userId, 
            { 
                $push: { 
                    followers: newFollowing._id 
                }
            },
            {new:true});
        
        //7. return success response
        return res.status(200).json({
            success: true,
            message: 'User followed successfully',
            data: {newFollower,newFollowing},
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error occurred while following user',
        });
    }
};

//unfollow the user