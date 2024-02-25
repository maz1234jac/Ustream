import React from 'react'
import PostCard from './PostCard'

const Comment = ({post}) => {
  return (
    <div>
      <PostCard post={post}/>
    </div>
  )
}

export default Comment