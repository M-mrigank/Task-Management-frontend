import React, { useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBirthdayCake, faPen} from "@fortawesome/free-solid-svg-icons"
import moment from "moment"
import ProfileBio from './ProfileBio'
import EditProfile from './EditProfile'
import "./UsersProfile.css";

const UserProfile = () => {
    const user=useSelector((state)=>state.usersReducer);
    const {id}=useParams();
    const currentProfile=user.filter((user)=>user._id===id)[0];
    console.log("profile",currentProfile);
    const currentUser=useSelector((state)=>state.currentUserReducer);

    const [Switch, setSwitch]=useState(false);

  return (
    <div className='home-container-1'>
      <LeftSidebar/>
      <div className="home-container-2">
        <section>
            <div className="user-details-container">
                <div className="user-details">
                    <Avatar backgroundColor={"purple"} color={"white"} fontSize={"50px"} px={"40px"} py={"30px"}>
                    {currentProfile?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="user-name">
                        <h1>{currentProfile?.name}</h1>
                        <p>
                            <FontAwesomeIcon icon={faBirthdayCake}/> Joined {moment(currentProfile?.joinedOn).fromNow()}
                        </p>
                    </div>
                </div>
                {
                    (currentUser?.result._id===id || currentUser?.result?.accountType==='Admin') && (
                        <button type='button' onClick={(()=>setSwitch(true))} className='edit-profile-btn'>
                            <FontAwesomeIcon icon={faPen}/> Edit Profile
                        </button>
                    ) 
                }
            </div>
            <>
                {
                    Switch?(
                        <EditProfile currentUser={currentUser} setSwitch={setSwitch} currentProfile={currentProfile}/>
                    ):(
                        <ProfileBio currentProfile={currentProfile}/>
                    )
                }
            </>
        </section>
      </div>
    </div>
  )
}

export default UserProfile
