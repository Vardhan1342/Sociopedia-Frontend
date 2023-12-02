import React, { useEffect } from "react";
import {
    ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import UserImg from "./userImg";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsLinkedin ,BsTwitter} from 'react-icons/bs'
import { setProfile } from "../state";

const UserWidget = ({userId}) => {

  const Profile=userId;

  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const token = useSelector((state) => state.token);

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const alt=palette.background.alt
  let profileuser=useSelector(state=>state.profile)
  let data="";

  const getuser = async () => {
    const response = await fetch(`http://localhost:3001/user/${Profile}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    data = await response.json();
    console.log(data)
   dispatch(setProfile({profile:data}))
  
    

  };

  useEffect(() => {
    getuser(); // eslint-disable-line react-hooks/exhaustive-deps
  }, []);


  const {
    _id,
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    picturePath
  } = profileuser;


  return (
<>
{profileuser ? <>

  <div className={`flex  md:mt-11 md: lg:ml-16 flex-col p-5  bg-[${alt}] mx-2 mt-5   h-1/5 rounded-lg text-left space-y-6`}>

      <div className="flex">
       <UserImg image={picturePath} /> 
        <div className="ml-3">
          <div className={`font-semibold cursor-pointer text-lg text-[${dark}]  hover:scale-0`} onClick={()=>navigate(`/profile/${_id}`)}>
            {firstName} {lastName}
          </div>
          <div className={`text-[${medium}]`}>{friends.length} friends</div>
        </div>
        <div className="ml-2 mt-1" onClick={()=>navigate(`/profile/${_id}`)}>
         
        <ManageAccountsOutlined />
        </div>
      </div>

      <hr/>

      <div className="flex flex-col text-xs font-medium space-y-3">
        <div className="space-x-5">
        <LocationOnOutlined fontSize="large" sx={{ color: main }}  />
        <span className={`text-[${medium}]`}> 
         {location.toUpperCase()}
        </span>

        </div>
        <div className="space-x-5">
        <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
        <span  className={`text-[${medium}]`}>{occupation.toUpperCase()}</span>
        </div>
      </div>
      <hr />

      <div className="flex flex-col space-y-2">
        <div className={`flex justify-between text-[${medium}]`}>
        <p>Who's Viewed Profile</p>
        <span className={`text-[${main}]`}> {viewedProfile}</span>
        </div>
        <div className={`flex justify-between text-[${medium}]`}>
        <p>Impressions of your posts</p>
        <span className={`text-[${main}]`}> {impressions}</span>
        </div>
      </div>

 <hr/>
      <div className="flex">
        
       <p className="text-xl font-semibold">Social Profiles
       <br />Follow on</p>
      </div>
      <div className="flex flex-col text-xs font-medium space-y-6">
        <div className="flex space-x-5">
            <div className="text-2xl">
                <BsLinkedin />
            </div>
            <span className="text-sm">Linkedin</span>
        </div>
        <div className=" flex space-x-5">
            <div className="text-2xl">
            <BsTwitter/>
            </div>
       
            <span className="text-sm">Twitter</span>
        </div>
      </div>
      
    </div> 

</>:<> no user</>} 
</>
   
  );
};

export default UserWidget;
