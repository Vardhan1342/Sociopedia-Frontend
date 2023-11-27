import { TextField, Typography ,Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {setLogin}  from "../state"

const Loginpage = () => {
const [credintials ,setCredinitials]=useState({email:"",password:""})
const dispatch=useDispatch();
const navigate=useNavigate();


const handleonchange=(e)=>{
  
  setCredinitials({...credintials,[e.target.name]:e.target.value})
}


const handleSubmit=async(e)=>{
   e.preventDefault();

   const response = await fetch(`http://localhost:3001/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credintials.email,
      password: credintials.password,
    }),
  });
  const json=await response.json()
  
  
  if(!json.msg){
    dispatch(
     setLogin({
      user:json.user,
      token:json.token,
     })
    )
    navigate("/home")
  }
  else{
    alert(json.msg)
    navigate("/")
  }



}


  return (
    <form onSubmit={handleSubmit}>
    <div className='text-center  '>

    
    <div className='flex flex-col'>
      <Typography sx={{
        fontSize:"45px",
        fontWeight:"500",
        color:"cyan",
        margin:"40px",
        padding:"10px"
      }}>Login</Typography>
      <TextField 
      type='email'
      sx={{margin:"5px auto 10px",width:"200px"}} id="standard-basic" 
      label="Email" 
      variant="standard" 
      name='email'
      value={credintials.email}
      onChange={handleonchange}/>
      <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          name='password'
          value={credintials.password}
          onChange={handleonchange}
          sx={{margin:"20px auto 10px",width:"200px"}}
        /> 
             
        <Button 
        type='submit'
        sx={{margin:"30px auto 30px"}} variant="contained">Login</Button>

        <p className='text- tracking-wider'>Don't have an account<Link to="/register" className='text-cyan-400 hover:underline-offset-4'> Register</Link></p>
    </div>
    </div>
    </form>
  );
}

export default Loginpage;
