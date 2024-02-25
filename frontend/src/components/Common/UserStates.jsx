import React from 'react'

const UserStates = ({user}) => {
  return (
    <div className='flex gap-5'>
        <p>{`${user?.posts?.length || 0} post`}</p>
        <p>{`${user?.followers?.length || 0} followers`}</p>
        <p>{`${user?.following?.length || 0} following`}</p>
    </div>
  )
}

export default UserStates