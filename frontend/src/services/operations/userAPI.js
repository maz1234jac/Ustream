import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { followUserEndpoints, updateAddDeatailsEndpoints } from "../apis";

const {
    CREATE_ADDITIONAL_DETAILS,
}=updateAddDeatailsEndpoints;

const {
    FOLLOW_USER_API,
    GET_USER_NOT_FOLLOWED,
}=followUserEndpoints

const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

export function updateAdditionalDetails(profileData,navigate){
    const create=async()=>{
        try{
            const response=await apiConnector("post",CREATE_ADDITIONAL_DETAILS,profileData,
            {
                Authorization:`Bearer ${token}`
            })
            if(!response){
                throw new Error("Error occured in user details",response);
            }
            toast.success("User details updated succesfullly");
            console.log(response)
            navigate("/user")
        }catch(error){
            console.log("Error occured while updating the user additional detials");
            console.log(error);
        }
    }
    create();
}

export const userNotFollowed=async()=>{
    try{
        const response=await apiConnector("post",GET_USER_NOT_FOLLOWED,"",
        {
            Authorization:`Bearer ${token}`
        })

        if(!response){
            throw new Error("Didn't fetch the user");
        }

        return response;
    }catch(error){
        console.log("Error in not followed user");
        console.log(error);
    }
}

export const followUser=async(heroId)=>{
    try{
        const response=await apiConnector("post",FOLLOW_USER_API,{heroId:heroId},
        {
            Authorization:`Bearer ${token}`
        })

        if(!response){
            throw new Error("Follow User Error");
        }
        toast.success(response.data.message);
        //console.log(response.data.message)
    }catch(error){
        console.log("Follow Error");
    }
}