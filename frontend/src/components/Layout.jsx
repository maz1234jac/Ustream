import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import CreatePost from './CreatePost/CreatePost'

const Layout = () => {
  const [createPost,setCreatePost]=useState(false);
  console.log(createPost)
  return (
    <>
        <div className={`flex justify-between ${createPost ? "h-[100vh] overflow-hidden" : ""}`}>
        {/* sidebar */}
            <div className='hidden sm:block bg-opacity-25 '>
                <Sidebar setCreatePost={setCreatePost}/>
            </div>
            <Outlet/>
        </div>
        {
          createPost && <div className='absolute top-0 bg-gray-500/[.5]'>
          <CreatePost setCreatePost={setCreatePost}/>
          </div>
        }
        
    </>
 
  )
}

export default Layout