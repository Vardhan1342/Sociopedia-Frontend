import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, setPosts } from '../state';
import Postwidget from './postwidget';

const Posts = ({userId,isProfile=false}) => {
const dispatch=useDispatch();
const posts=useSelector(state=>state.posts);
const token=useSelector(state=>state.token);
// const {_id}=useSelector(state=>state.user);
const id=userId


const getPosts=async()=>{
    const res=await fetch("http://localhost:3001/posts",{
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data=await res.json()
    dispatch(setPosts({posts:data}))
   
}
const UserPosts=async()=>{
  const res=await fetch(`http://localhost:3001/posts/${id}/posts`,{
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
  const data=await res.json()
  console.log(data)
  dispatch(setPosts({posts:data}))

}
useEffect(()=>{
  if(isProfile){
    UserPosts()
  }else{
    getPosts()
  }
},[]);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
    {posts.map(({
      _id,
      userId,
      firstName,
      lastName,
      description,
      location,
      picturePath,
      userPicturePath,
      likes,
      comments,
    })=>(
      <Postwidget 
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
      />

    )
    )}
    </div>
  );
}

export default Posts;
