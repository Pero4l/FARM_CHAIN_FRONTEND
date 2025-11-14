"use client";

import { useEffect, useState } from "react";

const CurrentUser = ({ children }: { children: React.ReactNode }) => {

    const user = localStorage.getItem("farmchain_user");
    if (!user) {
        return <></>;
    }




  return  <>{children}</>
}

export default CurrentUser
