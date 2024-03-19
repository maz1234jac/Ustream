import React, { useState, useEffect } from 'react';
import dp from '../components/assests/dp.jpg';
import { CiSettings } from "react-icons/ci";
import { IoMdGrid } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTag } from "react-icons/fa6";
import { getUser } from '../services/operations/postAPI';
import UserStates from '../components/Common/UserStates';
import { NavLink } from 'react-router-dom';

const Profile = () => {
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
    const menuList=[
        {
            name:"posts",
            element:<IoMdGrid/>
        },
        {
            name:"saved",
            element:<FaRegBookmark/>
        },
        {
            name:"reels",
            element:<FaTag/>
        }
    ];
    const [choice,setChoice]=useState("posts");
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser(token);
                setUser(response.data.data);
            } catch (error) {
                console.log("Error occurred while fetching the user details:", error);
            }
        };
    
        fetchUser();
    }, [token,choice]);

    useEffect(() => {
        setUserPosts(user[choice] || []);
        //console.log(user)
        //console.log(userPosts)
    }, [user,choice]);

    return (
        <>
            <div className='mt-8 flex-1 w-[100vw] mx-auto sm:w-[60%]  px-2'>
                <div className='flex sm:w-[80%] items-center justify-evenly'>
                    {/* left image */}
                    <div className='border-2 sm:w-[150px] w-[75px] h-[75px] sm:h-[150px] overflow-hidden rounded-full'>
                        <img src={user.image ? user.image : dp} alt="user" className='w-full h-full  ' />
                    </div>

                    {/* right */}
                    <div className=' px-5 py-3 flex flex-col sm:justify-between '>
                        <div className='flex flex-wrap gap-8 items-center text-lg'>
                            <h1>{user.userName}</h1>
                            <div className='flex gap-8 items-center'>
                                <NavLink 
                                to={"/user/editProfile"}
                                className='bg-gray-200 p-1 px-5 rounded-md text-sm font-semibold'> Edit Profile</NavLink>
                                <button className='text-2xl bg-gray-200 p-1 rounded-full'>
                                    <CiSettings/>
                                </button>
                            </div>
                            
                        </div>
                        
                        <div className='hidden sm:block'>
                            <UserStates user={user}/>
                        </div>

                        <div>
                            <h1 className='uppercase font-semibold text-sm'>{user.fullName}</h1>
                            <h2 className='text-sm'>{`${user?.additionDetails?.about || "Bio"}`}</h2>
                        </div>
                    </div>
                </div>

                <div className='sm:hidden flex justify-center gap-5'>
                    <UserStates user={user}/>
                </div>

                <hr className='mt-10' />

                <div className='text-sm flex justify-center gap-10 mt-2'>
                    {menuList.map((menu, ind) => (
                        <button
                            onClick={()=>setChoice(menu.name)}
                            key={ind}
                            className={`${choice===menu.name ? "font-bold" :"" } flex gap-2 items-center hover:font-bold uppercase`}
                        >
                            {menu.element}
                            <h1>{menu.name}</h1>
                        </button>
                    ))}
                </div>

                {/* post shown */}
                {userPosts.length !== 0 ? (
                    <div className='mt-6 w-full grid grid-cols-3 md:grid-cols-4 gap-1  px-5'>
                        {userPosts.map((post, ind) => (
                            <div key={ind} className='cursor-pointer hover:opacity-50 bg-gray-200  max-h-[300px] border-2 flex justify-center'>
                                <img src={post.postImage} alt="" className='  bg-cover h-[100%] ' />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-4xl text-center mt-5'>No Post found</div>
                )}
            </div>
        </>
    );
};

export default Profile;
