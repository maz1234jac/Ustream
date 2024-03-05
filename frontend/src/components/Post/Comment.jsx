import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { viewComment } from '../../services/operations/postAPI';

const Comment = ({post,setCommData,commData}) => {
  console.log(commData)
  const postId=commData._id;
  //console.log(postId)
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await viewComment(postId);
        setComments(response);
      }catch (error){
        console.log("Error occurred while fetching the comments data");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Comments data == ", comments);
  }, [comments]); 

  
  return (
    <>
      <button
          onClick={()=>setCommData({})}
          >Get back</button>
   
    <div className='absolute sm:top-[50%] sm:left-[50%] bg-gray-200 p-2 sm:-translate-x-[50%] sm:-translate-y-[50%] w-full sm:w-[80vw] rounded-md bg-opacity-50'>
      <div className='grid grid-cols-1 sm:grid-cols-2 '>
        <PostCard post={post} setCommData={setCommData}/>
        <div className='p-2'>
          {/* username */}
          <h1 className='text-center '>{commData.createdBy.userName}</h1>
          <div className='bg-gray-500 h-[1px] w-full'></div>

          {/* comments data */}
          <div>
            <div>
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </div>
     
    </div>
    </>
  )
}

export default Comment