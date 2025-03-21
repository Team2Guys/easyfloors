import React from 'react'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../app/api/auth/[...nextauth]/route"; 
import ProfileComponent from './profileComponent';
import { redirect } from 'next/navigation';





const Profile = async() => {
  const session = await getServerSession(authOptions)
if(!session){
  redirect('/login')
}

  return (
    <ProfileComponent loggedInUser={session}/>
  )
}

export default Profile