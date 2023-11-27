import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import UserWidget from './userWidget';
import Mypostswidget from './Mypostswidget';
import Posts from './posts';
import { Box } from '@mui/material';
const Profilepage = () => {
  const {userId}=useParams();
  const [user,setUser]=useState(null)
  const token=useSelector(state=>state.token)
  let data=""
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
     data = await response.json();
    setUser(data);
    console.log(data)
  };
  useEffect(()=>{
    getUser()
  },[])

  return (

    <div>
      {user?<>
        <Navbar />
      <UserWidget userId={user._id}/>
      {/* <Mypostswidget userId={user._id} picturepath={user.picturePath}/> */}
      <Posts userId={user._id} isProfile={true}/>
      </>:<>
      </>}
    
    
      
    </div>
  );
}

export default Profilepage;
