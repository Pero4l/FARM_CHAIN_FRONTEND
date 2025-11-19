'use client';

import React from "react";
import Image from "next/image";
import {MapPin, CheckCircle, Briefcase} from "lucide-react";
import { SlSettings } from "react-icons/sl";
import { useTheme } from 'next-themes';
import { useCurrentUser } from "@/app/components/currentUser";

const Profile = () => {
  const { theme } = useTheme();
  const { userProfile } = useCurrentUser(); 

  return (
    <div>
      <div className="flex justify-center lg:mt-2 mb-2 md:mb-3">
        <div className={`${theme === 'dark' ? 'border-1' : 'bg-white'} shadow-2xl rounded-2xl pb-5 w-full sm:max-w-[20rem] md:h-fit md:max-w-full lg:max-w-[1230px]`}>
          
          <div>
            <div className="relative">
              <img
                src={userProfile?.cover_avatar ?? "/pexels-pixabay-209831.jpg"}
                alt="profile"
                width={100}
                height={100}
                className="rounded-b-3xl rounded-t-2xl mx-auto w-[100%] h-[90%] md:h-[230px] object-cover"
              />

              <div className="absolute bottom-0 translate-y-1/4 translate-x-7 w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center">
                <img
                  src={userProfile?.avatar ?? "https://i.pravatar.cc/300"}
                  alt="User Avatar"
                  className="w-38 rounded-full object-cover"
                />
              </div>

              {/* <CheckCircle className="absolute -bottom-9 right-50 w-7 h-7 text-blue-500 bg-white rounded-full" /> */}

              {userProfile?.verified === true && (
                <CheckCircle className="absolute -bottom-9 right-50 w-7 h-7 text-blue-500 bg-white rounded-full" />
                // <div className="absolute bottom-7 left-44 bg-blue-500 text-white rounded-full p-1 border-2 border-white">
                //   <svg
                //     xmlns="http://www.w3.org/2000/svg"
                //     className="h-5 w-5"
                //     viewBox="0 0 20 20"
                //     fill="currentColor"
                //   >
                //     <path
                //       fillRule="evenodd"
                //       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                //       clipRule="evenodd"
                //     />
                //   </svg>
                // </div>
              )}
            </div>



            {/*  */}

            <div className="mx-6 mt-12">
              <div className="flex items-center justify-between">
                {/* Name */}
                <p className="font-black text-3xl mb-2">
                  {userProfile?.name ?? "Anonymous User"}
                </p>

                <p className="text-3xl">
                  <SlSettings />
                </p>
              </div>


              {/* followers */}
              <div className="flex text-sm gap-4 mb-4">
                <p className=""><span className="font-bold">{userProfile?.followers ?? 0 }</span> followers</p>
                <p><span className="font-bold">{userProfile?.following ?? 0 }</span> following</p>
              </div>


              {/* location */}
              <p className={theme === 'dark' ? 'text-gray-400 mb-2' : 'text-gray-800 mb-2'}>
                <MapPin className="inline-block w-4 h-4 mr-1 mb-1" />
                {userProfile?.location ?? "Unknown Location"}
              </p>


              {/* organization */}
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}>
                <Briefcase className="inline-block w-4 h-4 mr-1 mb-1" />
                {userProfile?.organization ?? "Organization"}
              </p>

                {/* bio */}
              <p className={theme === 'dark' ? 'text-gray-400 mt-4 mb-7 md:text-xl' : 'text-gray-800 mt-4 mb-7 md:text-xl'}>
                {userProfile?.bio ?? "No bio available."}
              </p>

              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="font-black">72.89K</p>
                  <p className="text-gray-500">Likes</p>
                </div>
                <div>
                  <p className="font-black">7.9K</p>
                  <p className="text-gray-500">Posts</p>
                </div>
                <div>
                  <p className="font-black">2.6K</p>
                  <p className="text-gray-500">Views</p>
                </div>
              </div>
            
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
