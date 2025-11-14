"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("farmchain_token");

    if (!token) {
      router.replace("/auth/login"); // redirect user to login/register
    } else {
      setAllow(true); // allow showing the page
    }
  }, [router]);

  if (!allow) return null; // can show a loader if you want

  return <>{children}</>;
}
