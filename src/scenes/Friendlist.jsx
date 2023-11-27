import React from 'react';
import { useSelector } from 'react-redux';
import Friend from './Friend';
import { useTheme } from '@emotion/react';
import { Divider } from '@mui/material';
const Friendlist = () => {
const {friends}=useSelector(state=>state.user)
const {palette}=useTheme()
const alt=palette.background.alt
console.log(friends)
  return (
    <div className={`bg-[${alt}] mt-10 rounded-lg space-y-7 px-10 py-10 `}>
       <p className='font-semibold text-xl'>Friend List</p>
       {friends.map((friend)=> (<>
            <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
             />
             <Divider sx={{ margin: "1.25rem 0" }} />
             </>
        )
        
       )}
       
    </div>
  );
}

export default Friendlist;
