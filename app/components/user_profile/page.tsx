'use client';

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
import { useTheme } from 'next-themes'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json } from "stream/consumers";


const UserProfile = () => {
const { theme, setTheme } = useTheme();
const [isFollowed, setIsFollowed] = useState(false);
const [loading, setLoading] = useState<boolean>(false);



const getUserById = async (id: string) => {
  setLoading(true);

  try {
    const res = await fetch(`https://farmchain.onrender.com/user/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch user");

    console.log("User:", data);
    return data;

  } catch (err: any) {
    console.error("❌", err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div className="flex justify-center lg:mt-2 mb-2 md:mb-3 px-">
        <div suppressHydrationWarning className={`${theme === 'dark' ? 'border-1' : 'bg-white'} shadow-2xl rounded-2xl p- pb-5 w-full sm:max-w-[20rem] md:h-fit md:max-w-full lg:max-w-[1230px]`}>
          <div>
            <div className="relative">
              <Image
                src="/pexels-pixabay-209831.jpg"
                alt="profile"
                width={100}
                height={100}
                className=" rounded-b-3xl rounded-t-2xl mx-auto  w-[100%] h-[90%] md:h-[230px] object-cover "
              />
              <div className="absolute top-3 right-4 lg:right-7">
                <button onClick={()=> setIsFollowed(!isFollowed)} className=" bg-green-600 text-white  flex gap-2 items-center py-1.5 px-4 rounded-full hover:text-white hover:bg-green-900">
                  <p className="text-sm font-bold">{isFollowed ? 'Unfollow' : 'Follow'}</p>
                  <FaPlus className={isFollowed ? 'hidden' : 'font-bold'} size={10} />
                </button>
              </div>
              <div className=" absolute bottom-0  translate-y-1/4 translate-x-7 w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center">
                <img
                  src="https://i.pravatar.cc/300"
                  alt="User Avatar"
                  className="w-38 rounded-full object-cover"
                />
              </div>
            </div>
            <div className=" mx-6 mt-12">
              <div className="">
                <div className="flex items-center justify-between">
                  <p className="font-black text-3xl mb-2"> Dev peter </p>

                  {/* <p className="text-3xl">
                    <SlSettings />
                  </p> */}
                </div>
                <p className="text-gray-400 text-sm mb-5 mt-2">
                  product Designer who focuses on simplicity and usability
                </p>
              </div>
              <div className="flex justify-between items-center mb-8 md:mb-">
                <div>
                  <p className="font-black">72.89K</p>
                  <p className="text-gray-400">Likes</p>
                </div>
                <div>
                  <p className="font-black">7.9K</p>
                  <p className="text-gray-400">Posts</p>
                </div>
                <div>
                  <p className="font-black">2.6K</p>
                  <p className="text-gray-400">Views</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
