"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, CheckCircle, Briefcase, Camera } from "lucide-react";
import { SlSettings } from "react-icons/sl";
import { useTheme } from "next-themes";
import { useCurrentUser } from "@/app/components/currentUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EditData {
  bio: string;
  organization: string;
}

const Profile = () => {
  const { theme } = useTheme();
  const { userProfile, setUserProfile, token } = useCurrentUser();

  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<EditData>({
    bio: "",
    organization: "",
  });

  // Live preview
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  // Initialize previews and local form
  useEffect(() => {
    if (userProfile) {
      setAvatarPreview(userProfile.avatar ?? "https://i.pravatar.cc/300");
      setCoverPreview(userProfile.cover_avatar ?? "/pexels-pixabay-209831.jpg");
      setProfile({
        bio: userProfile.bio ?? "",
        organization: userProfile.organization ?? "",
      });
    }
  }, [userProfile]);

  // Handle file selection and preview
  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleCoverChange = (file: File | null) => {
    setCoverFile(file);
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  // Handle Esc key to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEdit(false);
    };
    if (edit) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [edit]);

  // Submit changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();

      form.append("bio", profile.bio);
      form.append("organization", profile.organization);

      if (avatarFile) form.append("avatar", avatarFile);
      if (coverFile) form.append("cover_avatar", coverFile);

      const res = await fetch(`https://farmchain.onrender.com/profile/update`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }

      // Update context
      setUserProfile?.((prev) => ({
        ...prev!,
        avatar: data.updatedProfile.avatar ?? prev?.avatar,
        cover_avatar: data.updatedProfile.cover_avatar ?? prev?.cover_avatar,
        bio: data.updatedProfile.bio ?? prev?.bio,
        organization: data.updatedProfile.organization ?? prev?.organization,
      }));

      toast.success("Profile updated successfully!");

      setEdit(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
      <div className="flex justify-center lg:mt-2 mb-2 md:mb-3">
        <div
          className={`${
            theme === "dark" ? "border-1" : "bg-white"
          } shadow-2xl rounded-2xl pb-5 w-full sm:max-w-[20rem] md:h-fit md:max-w-full lg:max-w-[1230px]`}
        >
          <div className="relative">
            {/* Cover */}
            <img
              src={coverPreview || "https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y292ZXIlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80"}
              alt="Cover"
              width={100}
              height={100}
              className="rounded-b-3xl rounded-t-2xl mx-auto w-[100%] h-[90%] md:h-[230px] object-cover"
            />

            {/* Avatar */}
            <div className="absolute bottom-0 translate-y-1/4 translate-x-7 w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center">
              <img
                src={avatarPreview || "https://i.pravatar.cc/300"}
                alt="Avatar"
                className="w-38 rounded-full object-cover"
              />
            </div>

            {userProfile?.verified === false && (
              <CheckCircle
                aria-hidden="true"
                className="absolute -bottom-8 left-[158px] sm:left-16 md:left-40 lg:left-[9.7rem] xl:left-[9.9rem] w-8 h-8 text-blue-500 bg-white rounded-full border-2 border-white p-[2px] shadow"
              />
            )}
          </div>

          {/* Profile Info */}
          <div className="mx-6 mt-12">
            <div className="flex items-center justify-between">
              <p className="font-black text-3xl mb-2">{userProfile?.name ?? "Anonymous User"}</p>
              <p onClick={() => setEdit(!edit)} className="text-3xl">
                <SlSettings />
              </p>
            </div>

            {/* Edit Modal */}
            {edit && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50" onClick={() => setEdit(false)} />
                <form
                  onSubmit={handleSubmit}
                  className={`relative w-full max-w-xl ${
                    theme === "dark" ? "bg-black border-1" : "bg-white"
                  } rounded-2xl p-6 shadow-lg z-10 mx-5 mt-20`}
                >
                  <h3 className="text-lg font-bold mb-3">Edit Profile</h3>

                  {/* Avatar */}
                  <label className="mb-3">
                    <span
                      className={`text-sm pt-2 pb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Profile Picture
                    </span>
                    <div className="flex items-center space-x-4 mb-5">
                      <Image src={avatarPreview} alt="" width={50} height={50} unoptimized />
                      <label className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-bold bg-white/20 backdrop-blur-md px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-white/30 transition cursor-pointer shadow-lg">
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className=" xs:inline">Change</span>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => handleAvatarChange(e.target.files?.[0] ?? null)}
                        />
                      </label>
                    </div>
                  </label>

                  {/* Cover */}
                  <label className="mb-3">
                    <span
                      className={`text-sm pb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Cover Picture
                    </span>
                    <div className="flex items-center space-x-4 mt-">
                      <Image src={coverPreview} alt="" width={50} height={60} unoptimized />
                      <label className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-bold bg-white/20 backdrop-blur-md px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-white/30 transition cursor-pointer shadow-lg">
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className=" xs:inline">Change</span>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => handleCoverChange(e.target.files?.[0] ?? null)}
                        />
                      </label>
                    </div>
                  </label>

                  {/* Organization */}
                  <label className="block mb-3 mt-5">
                    <span
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Organization
                    </span>
                    <input
                      value={profile.organization}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, organization: e.target.value }))
                      }
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      placeholder="Organization"
                    />
                  </label>

                  {/* Bio */}
                  <label className="block mb-4">
                    <span
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Bio
                    </span>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                      className="mt-1 w-full rounded-lg border px-3 py-2 h-28 resize-none"
                      placeholder="Tell people about yourself"
                    />
                  </label>

                  <div className="flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg ${
                        theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                      }`}
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

            {/* Followers / Following */}
            <div className="flex text-sm gap-4 mb-4">
              <p>
                <span className="font-bold">{userProfile?.followers ?? 0}</span> followers
              </p>
              <p>
                <span className="font-bold">{userProfile?.following ?? 0}</span> following
              </p>
            </div>

            {/* Location */}
            <p className={theme === "dark" ? "text-gray-400 mb-2" : "text-gray-800 mb-2"}>
              <MapPin className="inline-block w-4 h-4 mr-1 mb-1" />
              {userProfile?.location ?? "Unknown Location"}
            </p>

            {/* Organization */}
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-800"}>
              <Briefcase className="inline-block w-4 h-4 mr-1 mb-1" />
              {userProfile?.organization ?? "Organization"}
            </p>

            {/* Bio */}
            <p className={theme === "dark" ? "text-gray-400 mt-4 mb-7 md:text-xl" : "text-gray-800 mt-4 mb-7 md:text-xl"}>
              {userProfile?.bio ?? "No bio available."}
            </p>


            {/*  */}

            <div className="flex justify-between items-center mb-8">
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
  );
};

export default Profile;