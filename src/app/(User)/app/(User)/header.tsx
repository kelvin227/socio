import React from "react";
import { auth } from "@/auth";
import HeaderCom from "@/components/header_com";
import { getundeliveredNotifications } from "@/functions/user";


export default async function Header(){
    const session = await auth();

    const notificationIsRead = await getundeliveredNotifications(session?.user?.email as string)

  return(
  // eslint-disable-next-line
    <HeaderCom email={session?.user?.email as string} notificationIsRead={notificationIsRead.notifications as any}/>

  )

}


