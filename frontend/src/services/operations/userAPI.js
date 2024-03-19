import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { updateAddDeatailsEndpoints } from "../apis";

const {
    CREATE_ADDITIONAL_DETAILS,
}=updateAddDeatailsEndpoints;

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
            navigate("/user")
        }catch(error){
            console.log("Error occured while updating the user additional detials");
            console.log(error);
        }
    }
    create();
}