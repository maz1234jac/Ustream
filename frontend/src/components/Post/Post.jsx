import React,{useState,useEffect} from 'react'
import PostCard from './PostCard'
import TopNav from '../Navbar/TopNav'
import BottomNav from '../Navbar/BottomNav'
import { getAllPost, getUser } from '../../services/operations/postAPI'
import {useDispatch, useSelector} from "react-redux"
import { setRefresh } from '../../slices/refreshSlice'
import FollowCard from '../Common/FollowCard'
import { setUserInfo } from '../../slices/profileSlice'

const Post = () => {
  const [posts, setPosts] = useState([]);
  const refresh=useSelector((state)=>state.refresh.postRefresh);
  const dispatch=useDispatch();
  const [userId,setUserId]=useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPost();
        setPosts(response.data.data.reverse());

        const userData=await getUser();
        setUserId(userData.data.data);
        //console.log(userData)
        dispatch(setUserInfo(userData.data.data));
      } catch (error) {
        console.log("Error occurred while fetching the posts:", error);
      }
    };
    
    fetchData();
  }, [refresh]);

  useEffect(()=>{
    //console.log(userId)
  },[userId])

  return (
    <>
        <div className='mt-2 max-w-[500px] mx-auto  px-2'>
          <TopNav/>
          {
            posts.map((post,ind)=>{
              return <PostCard  post={post} key={ind}/>
            })
          }
          <BottomNav/>
        </div>

        {/* sidebar */}
        <div className='py-8 w-[350px] px-4 hidden sm:block border-2 sticky right-0'>
          <FollowCard/>

          <h1 className='mt-5 font-semibold'>Suggested </h1>
          <div className='mt-5 flex flex-col gap-2'>
            <FollowCard/>
            <FollowCard/>
            <FollowCard/>
            <FollowCard/>
          </div>
          
        </div>

    </>
    
  )
}

export default Post