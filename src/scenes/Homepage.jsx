import React from 'react';
import Navbar from "./Navbar"
import UserWidget from './userWidget';
import Mypostswidget from './Mypostswidget';
import Posts from './posts';
import Friendlist from './Friendlist';
import { useSelector } from 'react-redux';

const Homepage = () => {
  const {_id,picturePath}=useSelector(state=>state.user);
 

  return (
    <div>
      <Navbar />
      <div className='flex gap-3 sm:flex-row flex-col  '>
        <div className='md:fixed'> <UserWidget userId={_id}/></div>
      
      <div className=' space-y-3 basis-1/2 relative ml-12 sm:ml-0 md:left-1/4'>

      <Mypostswidget userId={_id} picturepath={picturePath}/>
      <Posts userId={_id}/>
      </div>
      <div className='basis-1/4  sm:ml-0 md:fixed md:right-20'>

        <Friendlist userId={_id}/>
      </div>
      </div>
     
    </div>
  );
}

export default Homepage;
