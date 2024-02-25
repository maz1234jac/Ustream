import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../assests/text_logo.png'
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { MdOutlineExplore } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { logout } from '../../services/operations/authAPI';

const Sidebar = ({setCreatePost}) => {
    const menus=[
        {
            title:"Home",
            element:<GoHome/>,
            route:"/"
        },
        {
            title:"Search",
            element:<CiSearch/>,
            route:"/",
        },
        {
            title:"Explore",
            element:<MdOutlineExplore/>,
            route:"/",
        },
        {
            title:"Notification",
            element:<IoMdNotificationsOutline/>,
            route:"/",
        },
        {
            title:"Reels",
            element:<SiYoutubeshorts/>,
            route:"/reels"
        },
        {
            title:"Messeges",
            element:<BsSend />,
            route:"/messages"
        },
        {
            title:"Create",
            element:< GoPlusCircle  />
        },
        {
            title:"Profile",
            element:< FaRegUserCircle  />,
            route:"/user"
        },
    ]
    const navigate=useNavigate();
    const [select,setSelect]=useState("Home");

    const createPostBtnHandle = (elem) => {
        if (elem.title === "Create") {
            setSelect(elem.title)
            setCreatePost(true);
        } else {
            setCreatePost(false);
            setSelect(elem.title);
            navigate(elem.route);
        }
    }
    
  return (
    <>
        <div className='w-[250px] h-[100vh] border sticky top-0 pl-3 flex flex-col justify-between py-4 font-sans'>
            {/* image */}
            <div className='w-[55%] mt-2 ml-2'>
                <img src={logo} alt="" className='w-[100%]' />
            </div>

            {/* menu */}
            <div className='flex-1 flex flex-col gap-2 p-1 pr-5 mt-6'>
                {
                    menus.map((elem,ind)=>{      
                        return (
                            <div 
                            onClick={()=>createPostBtnHandle(elem)}
                            className={`${select===elem.title ? "bg-gray-200" :"bg-transparen"} text-3xl flex gap-4 items-center hover:bg-gray-200 cursor-pointer  p-1 rounded-lg`}
                             key={ind} >
                                {
                                    elem.element
                                }
                                <p className='text-[15px]'>{elem.title}</p>
                            </div>
                        )
                    })
                }        
            </div>

            {/* thread and more */}
            <div className='flex flex-col gap-6'>
                <div className='text-3xl flex gap-2 items-center '>
                    <RxHamburgerMenu/>
                    <p className='text-lg'>More</p>
                </div>
                <div className='w-full flex justify-center '>
                    <p
                    onClick={()=>logout(navigate)}
                    className=' bg-red-600 hover:bg-red-500 font-semibold py-2 px-8 cursor-pointer rounded-2xl text-white'>
                        Logout
                    </p>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar