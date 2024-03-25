import React, { useEffect, useState } from 'react'
import { getAllUsers, userNotFollowed } from '../services/operations/userAPI';
import FollowCard from '../components/Common/FollowCard';
import { getUser } from '../services/operations/postAPI';

const Search = () => {
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
    const [allUser,setAllUser]=useState([]);
    const [followingUser,setFollowingUser]=useState([]);
    const [followers,setFollowers]=useState([]);
    const [userNotFollow,setUserNotFollow]=useState([]);

   useEffect(()=>{
    const fetch=async()=>{
        try{
            const response=await getUser(token);
            //console.log(response.data.data.following);
            setFollowingUser(response.data.data.following);
            setFollowers(response.data.data.followers);
        }catch(error){
            console.log("Error occured in setting logged in user");
        }

        try{
            const response=await getAllUsers();
            //console.log(response.data.data);
            setAllUser(response.data.data);
        }catch(error){
            console.log(error);
        }

        try{
            const response=await userNotFollowed(token);
            //console.log(response.data.data);
            setUserNotFollow(response.data.data)
          }catch(error){
            console.log("Error in fetching the user who are not followed");
          }

    }
    fetch();
   },[allUser])
  return (
    <div className='flex flex-col justify-start items-start w-full p-8'>
        <h1 className='my-1 font-semibold underline'>Followers</h1>
        <div className='flex flex-col gap-4 mt-2'>
        {
            followers.length > 0 ?
            followers.map((user, ind) => (
                <div key={ind}>
                    <FollowCard user={user} choice={"follower"}/>
                </div>
            )) : <h1 className='text-md font-semibold text-gray-600'>No one has followed you</h1>
        }
        </div>

        <h1 className='my-1 font-semibold underline'>Following</h1>
        <div className='flex flex-col gap-4 mt-2'>
        {
            followingUser.length > 0 &&
            followingUser.map((user, ind) => (
                <div key={ind}>
                    <FollowCard user={user} choice={"unfollow"}/>
                </div>
            ))
        }
        </div>

        <h1 className='my-1 font-semibold underline'>Follow a new User</h1>
        <div className='flex flex-col gap-4 mt-2'>
        {
            userNotFollow.length > 0 &&
            userNotFollow.map((user, ind) => (
                <div key={ind}>
                    <FollowCard user={user} choice={"follow"}/>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default Search