import React from 'react';
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    LinkedCamera,
    ShareOutlined,
   
  } from "@mui/icons-material";
  import FavoriteIcon from '@mui/icons-material/Favorite';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import Friend from './Friend';


const Postwidget = ({ 
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,}) => {

        const [isComments, setIsComments] = useState(false);
        const dispatch = useDispatch();
        const token = useSelector((state) => state.token);
        const loggedInUserId = useSelector((state) => state.user._id);
        let isLiked = Boolean(likes[loggedInUserId]);
        const likeCount = Object.keys(likes).length;
       const [Liked,setLiked]=useState(false)
        const { palette } = useTheme();
        const main = palette.neutral.main;
        const primary = palette.primary.main;
        const alt=palette.background.alt

  const patchLike=async()=>{
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body:JSON.stringify({userId:loggedInUserId}),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setLiked(true)
   
  }

  return (
    <div>
       <div className={`bg-[${alt}] rounded-lg p-6 mr-10 my-2 `}>
       <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "2rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assests/${picturePath}`}
        />
      )}
      <div className='flex justify-between items-center mt-1' >
        <div className='flex justify-between items-center gap-4' >
          <div className='flex justify-between items-center gap-1' >
            <IconButton onClick={patchLike}>
              {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                  ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </div>

          <div className='flex justify-between items-center gap-1' >
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </div>
        </div>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </div>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
       
       </div>
    </div>
  );
}

export default Postwidget;
