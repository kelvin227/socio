/* eslint-disable */
import { auth } from "@/auth";
import { getAllAds, getUserByEmail } from "@/functions/user";
import React from "react";
import AtokHolder from "@/components/atok_holder";
// import { useCopyToClipboard } from "@uidotdev/usehooks";

// const randomHash = crypto.randomUUID();

export default async function Profile() {
  const session= await auth()
  const profile = session?.user?.email as string
  const username = await getUserByEmail(profile);
  const data = await getAllAds()
  if(!username){
    throw new Error("an unexpected error occurred can't get username")
  }
  
  return (
    <AtokHolder data={data.ads as any} email={profile} name={username.userName as string}/>
    
  );
};
