"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  CheckCircle,
  Briefcase,
  Camera,
  Heart,
  MessageSquare,
  Share,
  DollarSign,
  Eye,
  ClockFading,
  EllipsisVertical,
} from "lucide-react";
import { SlSettings } from "react-icons/sl";
import { useTheme } from "next-themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useCurrentUser } from "@/app/components/currentUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

  // console.log(userProfile);

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
              src={
                coverPreview ||
                "https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y292ZXIlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              }
              alt="Cover"
              width={100}
              height={100}
              className="rounded-b-3xl rounded-t-2xl mx-auto w-[100%] h-[90%] md:h-[230px] object-cover"
            />

            {/* Avatar */}
            <div className="absolute bottom-0 translate-y-1/4 translate-x-7 w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
              <img
                src={avatarPreview || "https://i.pravatar.cc/300"}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
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
                      <Image
                        src={avatarPreview}
                        alt=""
                        width={50}
                        height={50}
                        unoptimized
                      />
                      <label className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-bold bg-white/20 backdrop-blur-md px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-white/30 transition cursor-pointer shadow-lg">
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className=" xs:inline">Change</span>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleAvatarChange(e.target.files?.[0] ?? null)
                          }
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
                      <Image
                        src={coverPreview}
                        alt=""
                        width={50}
                        height={60}
                        unoptimized
                      />
                      <label className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-bold bg-white/20 backdrop-blur-md px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-white/30 transition cursor-pointer shadow-lg">
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className=" xs:inline">Change</span>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleCoverChange(e.target.files?.[0] ?? null)
                          }
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
                        setProfile((p) => ({
                          ...p,
                          organization: e.target.value,
                        }))
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
                      className={`px-4 py-2 rounded-lg ${
                        theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-black"
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
                <span className="font-bold">{userProfile?.followers ?? 0}</span>{" "}
                followers
              </p>
              <p>
                <span className="font-bold">{userProfile?.following ?? 0}</span>{" "}
                following
              </p>
            </div>

            {/* Location */}
            <p
              className={
                theme === "dark" ? "text-gray-400 mb-2" : "text-gray-800 mb-2"
              }
            >
              <MapPin className="inline-block w-4 h-4 mr-1 mb-1" />
              {userProfile?.location ?? "Unknown Location"}
            </p>

            {/* Organization */}
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-800"}>
              <Briefcase className="inline-block w-4 h-4 mr-1 mb-1" />
              {userProfile?.organization ?? "Organization"}
            </p>

            {/* Bio */}
            <p
              className={
                theme === "dark"
                  ? "text-gray-400 mt-4 mb-7 md:text-xl"
                  : "text-gray-800 mt-4 mb-7 md:text-xl"
              }
            >
              {userProfile?.bio ?? "No bio available."}
            </p>

            {/*  */}

            <div className="flex justify-between items-center mb-8">
              <div className=" flex flex-col items-center">
                <p className="font-black">72.89K</p>
                <p className="text-gray-400">Likes</p>
              </div>

              <div className=" flex flex-col items-center">
                <p className="font-black">{userProfile?.totalPost ?? 0}</p>
                <p className="text-gray-400">Posts</p>
              </div>

              <div className=" flex flex-col items-center">
                <p className="font-black">2.6K</p>
                <p className="text-gray-400">Views</p>
              </div>
            </div>


            {/* POSTS */}

            <div>
              <h1 className="text-center text-5xl pt-5 mb-10 underline">
                Posts
              </h1>
            </div>

            {userProfile?.posts?.map((post) => (
              <div
                key={post.id}
                className={`${
                  theme === "dark" ? "" : "bg-white"
                } rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 mb-8`}
              >
                <div className="p-3 py-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        {/* profile post img */}
                        <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full ">
                          <img
                            className="h-[55px] w-[70px] rounded-full"
                            src={post.avatar || "https://i.pravatar.cc/300"}
                            alt=""
                          />
                        </div>
                        {post.verified === false && (
                          <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center w-full">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className="min-w-0">
                              <h3
                                className={`font-bold text-lg truncate ${
                                  theme === "dark" ? "" : "text-gray-900"
                                }`}
                              >
                                {post.farmer}
                              </h3>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              {post.category}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 ml-18 lg:ml-[560px]">
                            {/* <button
                              className="p-1 text-gray-100 hover:text-gray-500 rounded-full"
                              aria-label="more"
                              onClick={(e) => {
                                e.stopPropagation();
                                const m = document.getElementById(
                                  `post-modal-${post.id}`
                                );
                                if (m) m.classList.remove("hidden");
                              }}
                            >
                              <EllipsisVertical />
                            </button> */}

                            {/* Modal (hidden by default) */}
                            <div
                              id={`post-modal-${post.id}`}
                              className=" hidden fixed inset-0 z-50 flex items-center justify-center"
                              onClick={(e) => {
                                // click on overlay closes modal
                                if (e.target === e.currentTarget) {
                                  const m = document.getElementById(
                                    `post-modal-${post.id}`
                                  );
                                  m?.classList.add("hidden");
                                }
                              }}
                            >
                              <div className="absolute inset-0 bg-black/50" />

                              <div
                                className={`relative z-10 ${
                                  theme === "dark"
                                    ? "border-1 bg-black"
                                    : " bg-white dark:bg-slate-900"
                                } rounded-xl shadow-lg p-6 w-[90%] max-w-md`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <h4 className="text-lg font-bold mb-2">
                                  Manage post
                                </h4>

                                {/* <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 truncate">
                            {post.content}
                          </p> */}

                                <div className="flex justify-end gap-3">
                                  {/* <button
                            className="px-3 py-2 rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            onClick={async (e) => {
                              e.stopPropagation();
                              // simple inline edit using prompt to avoid extra hooks/state
                              const newContent = window.prompt(
                              "Edit post content",
                              post.content
                              );
                              if (newContent === null) return;
                              try {
                              await axios.patch(
                                `https://farmchain.onrender.com/post/${post.id}`,
                                { content: newContent },
                                {
                                headers: token
                                  ? { Authorization: `Bearer ${token}` }
                                  : undefined,
                                }
                              );
                              // refresh posts list
                              await fetchPosts();
                              const m = document.getElementById(
                                `post-modal-${post.id}`
                              );
                              m?.classList.add("hidden");
                              } catch (err) {
                              console.error(err);
                              alert("Failed to update post");
                              }
                            }}
                            >
                            Edit
                            </button> */}

                                  <button
                                    className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      if (
                                        !window.confirm(
                                          "Are you sure you want to delete this post?"
                                        )
                                      )
                                        return;

                                      try {
                                        await axios.delete(
                                          `https://farmchain.onrender.com/post/delete`,
                                          {
                                            headers: token
                                              ? {
                                                  Authorization: `Bearer ${token}`,
                                                }
                                              : undefined,
                                            data: { id: post.id },
                                          }
                                        );

                                        toast.success(
                                          "Post deleted successfully!"
                                        );

                                        const m = document.getElementById(
                                          `post-modal-${post.id}`
                                        );
                                        m?.classList.add("hidden");
                                      } catch (err) {
                                        console.error(err);
                                        alert("Failed to delete post");
                                      }
                                    }}
                                  >
                                    Delete
                                  </button>

                                  <button
                                    className="px-3 py-2 rounded-lg bg-green-400 hover:bg-green-800"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const m = document.getElementById(
                                        `post-modal-${post.id}`
                                      );
                                      m?.classList.add("hidden");
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`flex flex-col-reverse  md:space-x-7 text-sm ${
                            theme === "dark" ? "" : "text-gray-500"
                          }`}
                        >
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 " />
                            {post.location}
                          </div>
                          {/*  */}
                          <div className="flex items-center ">
                            <ClockFading className="w-3 h-3 mr-1" />
                            {dayjs(post.createdAt).fromNow()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p
                      className={` leading-relaxed ${
                        theme === "dark" ? "" : "text-gray-700"
                      }`}
                    >
                      {post.content}
                    </p>

                    {/* PRICE */}
                    {post.price && (
                      <div className="mt-3 inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                        <DollarSign className="w-4 h-4" />
                        <span>{post.price}</span>
                      </div>
                    )}
                  </div>

                  {/* TAGS */}
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-green-600 hover:text-green-700 font-semibold text-sm cursor-pointer hover:underline"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* IMAGE */}
                  {post.images && post.images.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {post.images.map((img: string, i: number) => (
                        <div
                          key={i}
                          className="rounded-2xl w-full relative overflow-hidden"
                        >
                          <img
                            src={img}
                            alt="Images"
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* VIDEO */}
                  {post.video && (
                    <div className=" rounded-2xl   grid md:grid-cols-2 gap-3 text-white relative overflow-hidden">
                      <div className="absolute inset-0 "></div>
                      {post.video.map((vid: string, i: number) => (
                        <div
                          key={i}
                          className="relative w-full rounded-2xl overflow-hidden"
                        >
                          <video
                            autoPlay
                            controls
                            playsInline
                            src={vid}
                            className="h-[500px] object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action btn */}
                <div className="border-t border-gray-100 px-3 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 lg:space-x-10">
                      <button
                        className={`flex items-center space-x-2 ${
                          theme === "dark" ? "" : "text-gray-600"
                        } hover:text-red-500 transition-colors`}
                      >
                        <Heart className="w-5 h-5" />
                        <span className="font-semibold">{post.likes}</span>
                      </button>
                      <button
                        className={`flex items-center space-x-2 ${
                          theme === "dark" ? "" : "text-gray-600"
                        } hover:text-blue-500 transition-colors`}
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-semibold">{post.comments}</span>
                      </button>
                      <button
                        className={`flex items-center space-x-2 ${
                          theme === "dark" ? "" : "text-gray-600"
                        } hover:text-green-500 transition-colors`}
                      >
                        <Share className="w-5 h-5" />
                        <span className="font-semibold">{post.shares}</span>
                      </button>
                    </div>

                    <div
                      className={`text-sm ${
                        theme === "dark" ? "" : " text-gray-500"
                      } hover:text-green-500 transition-colors`}
                    >
                      <Eye className="w-4 h-4 inline mr-1" />
                      {post.likes + post.comments * 3} views
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
