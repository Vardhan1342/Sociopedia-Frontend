import React, { useState } from 'react';
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
    MenuBook
} from "@mui/icons-material";
import { useDispatch,useSelector } from 'react-redux';
import {setMode,setLogout} from "../state";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { FormControl, IconButton, InputBase, MenuItem, Select, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector((state)=>state.user);
  
  const theme=useTheme();
  const neutralLight=theme.palette.neutral.light;
  const dark=theme.palette.neutral.dark;
  const background=theme.palette.background.default;
  const primaryLight=theme.palette.primary.light
  const alt=theme.palette.background.alt;
  const fullname=user ?`${user.firstName +" " +user.lastName} `:"userName";
  const [menu,setMenu]=useState(true);
  const icon=document.getElementById("icons")
  
  
  
 
 

const handleMenuclick=()=>{
  if(menu){
    setMenu(!menu)
    icon.classList.remove('hidden')
    icon.classList.add('flex')

  }
  else{
   
    icon.classList.add('hidden')
    setMenu(!menu)

  }
    
}

   return (
    <div className={`flex flex-nowrap  justify-between px-2 py-5 lg:p-5  items-center bg-[${alt}]`}>
      <div className='flex justify-between gap-5'>
         <h1 className={`text-cyan-400 text-xl md:text-2xl lg:text-3xl lg:ml-16 font-extrabold cursor-pointer tracking-wide hover:text-cyan-300`} onClick={()=>navigate("/home")}>SOCIOPEDIA</h1>
         <div className={"flex"}>

         <InputBase placeholder='Search...' sx={{backgroundColor:background,
        width:"10.5rem",
        padding:"5px 10px",
        borderRadius:"40px"}} >
        </InputBase>
         <IconButton>
          <Search />
         </IconButton>

         </div>

         </div>

       
         
      <div  id="icons" className='hidden absolute md:mr-10 top-20 right-0 z-10  md:static flex-col md:flex md:flex-row md:justify-between md:gap-2 lg:gap-5 duration-500'>
         <IconButton onClick={()=>dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <LightMode sx={{fontSize:"25px"}}/>
            ):<DarkMode sx={{fontSize:"25px",color:dark}}/>}
         </IconButton>
        <IconButton>
          <Message sx={{fontSize:"25px"}}/>
        </IconButton>
        <IconButton>
          <Notifications sx={{fontSize:"25px"}}/>
        </IconButton>
        <IconButton>
          <Help sx={{fontSize:"25px"}}/>
        </IconButton>
         <FormControl variant='standard' value={fullname}>
            
           <Select value={fullname}
           sx={{
             backgroundColor:neutralLight,
             width:"150px",
             borderRadius:"50px",
             p:"0.25rem 1rem",
             "& .MuiSvgIcon-root":{
               pr:"0.25rem",
               width:"3rem"
               
              },
              "& .MuiSelect-select:focus":{
                backgroundColor:neutralLight
              }
            }}
            input={<InputBase />}
            >
            <MenuItem value={fullname}>
              <Typography>{fullname}</Typography>
            </MenuItem>
            <MenuItem onClick={()=>dispatch(setLogout())}>
              Logout
            </MenuItem>
           </Select>
          </FormControl>
       
      </div>
      <span className=' pr-2 md:hidden' onClick={handleMenuclick}><MenuIcon fontSize="large" /></span>
      
    </div>
  );
}

export default Navbar;
