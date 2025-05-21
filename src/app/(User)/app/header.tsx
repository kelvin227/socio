import React from "react";
import { auth } from "@/auth";
import HeaderCom from "@/components/header_com";


export default async function Header(){
    const session = await auth();
  return(
    <HeaderCom email={session?.user?.email as string} />

  )

}


