import React from 'react'
import { getServerSession } from "next-auth/next";
import ProfileComponent from './profileComponent';
import { redirect } from 'next/navigation';
import { authOptions } from 'auth/authOptions';





const Profile = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }



  console.log(session, "session")


  return (
    <ProfileComponent loggedInUser={session} />
  )
}

export default Profile