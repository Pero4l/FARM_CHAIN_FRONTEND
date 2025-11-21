"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { MapPin, CheckCircle, Briefcase } from "lucide-react";
import { SlSettings } from "react-icons/sl";
import { useTheme } from "next-themes";
import { useCurrentUser } from "@/app/components/currentUser";

interface EditData {
  bio: string;
  organization: string;
}

const Profile = () => {
  const { theme } = useTheme();
  const { userProfile, setUserProfile } = useCurrentUser();

  const [profile, setProfile] = useState<EditData>({
    bio: "",
    organization: "",
  });
  const [edit, setEdit] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // initialize local form when modal opens or when userProfile changes
  useEffect(() => {
    if (edit) {
      setProfile({
        bio: userProfile?.bio ?? "",
        organization: userProfile?.organization ?? "",
      });
    }
  }, [edit, userProfile]);

  // handle Esc to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEdit(false);
    };
    if (edit) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [edit]);

  console.log(userProfile);
  

  return (
    <div>
      <div className="flex justify-center lg:mt-2 mb-2 md:mb-3">
        <div
          className={`${
            theme === "dark" ? "border-1" : "bg-white"
          } shadow-2xl rounded-2xl pb-5 w-full sm:max-w-[20rem] md:h-fit md:max-w-full lg:max-w-[1230px]`}
        >
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

              {userProfile?.verified === false && (
                <CheckCircle
                  aria-hidden="true"
                  className="absolute -bottom-8 left-[158px] sm:left-16 md:left-40 lg:left-[9.7rem] xl:left-[9.9rem] w-8 h-8 text-blue-500 bg-white rounded-full border-2 border-white p-[2px] shadow"
                />
              )}
            </div>

            {/*  */}

            <div className="mx-6 mt-12">
              <div className="flex items-center justify-between">
                {/* Name */}
                <p className="font-black text-3xl mb-2">
                  {userProfile?.name ?? "Anonymous User"}
                </p>

                <p onClick={() => setEdit(!edit)} className="text-3xl">
                  <SlSettings />
                </p>
              </div>

              {/* Edit Modal */}
              {edit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setEdit(false)}
                  />

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setSaving(true);
                      try {
                        // update local context/profile
                        setUserProfile?.({
                          name: userProfile?.name ?? "",
                          location: userProfile?.location ?? "",
                          avatar: userProfile?.avatar ?? "",
                          cover_avatar: userProfile?.cover_avatar ?? "",
                          bio: profile.bio,
                          organization: profile.organization,
                          verified: userProfile?.verified ?? false,
                          share_account: userProfile?.share_account ?? "",
                          followers: userProfile?.followers ?? 0,
                          following: userProfile?.following ?? 0,
                        });

                        // close modal after save
                        setEdit(false);
                      } finally {
                        setSaving(false);
                      }
                    }}
                    className={`relative w-full max-w-xl ${theme === 'dark' ? 'bg-black border-1 ' : 'bg-white'} rounded-2xl p-6 shadow-lg z-10 mx-5`}
                  >
                    <h3 className="text-lg font-bold mb-3">Edit Profile</h3>

                    <label className="block mb-3">
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                        Organization
                      </span>
                      <input
                        value={profile.organization}
                        onChange={(e) =>
                          setProfile((p) => ({
                            ...p,
                            organization: e.target.value,
                          }))
                        }
                        className="mt-1 w-full rounded-lg border px-3 py-2"
                        placeholder="Organization"
                      />
                    </label>

                    <label className="block mb-4">
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>Bio</span>
                      <textarea
                        value={profile.bio}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, bio: e.target.value }))
                        }
                        className="mt-1 w-full rounded-lg border px-3 py-2 h-28 resize-none"
                        placeholder="Tell people about yourself"
                      />
                    </label>

                    <div className="flex items-center justify-end space-x-3">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => setEdit(false)}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-60"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* followers */}
              <div className="flex text-sm gap-4 mb-4">
                <p className="">
                  <span className="font-bold">
                    {userProfile?.followers ?? 0}
                  </span>{" "}
                  followers
                </p>
                <p>
                  <span className="font-bold">
                    {userProfile?.following ?? 0}
                  </span>{" "}
                  following
                </p>
              </div>

              {/* location */}
              <p
                className={
                  theme === "dark" ? "text-gray-400 mb-2" : "text-gray-800 mb-2"
                }
              >
                <MapPin className="inline-block w-4 h-4 mr-1 mb-1" />
                {userProfile?.location ?? "Unknown Location"}
              </p>

              {/* organization */}
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-800"}
              >
                <Briefcase className="inline-block w-4 h-4 mr-1 mb-1" />
                {userProfile?.organization ?? "Organization"}
              </p>

              {/* bio */}
              <p
                className={
                  theme === "dark"
                    ? "text-gray-400 mt-4 mb-7 md:text-xl"
                    : "text-gray-800 mt-4 mb-7 md:text-xl"
                }
              >
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
