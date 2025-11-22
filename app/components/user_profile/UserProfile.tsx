// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { MapPin, CheckCircle, Briefcase } from "lucide-react";
// import { FaPlus } from "react-icons/fa";
// import { useTheme } from "next-themes";
// import { useSearchParams } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UserProfile: React.FC<{ userId?: string }> = ({ userId: propUserId }) => {
//   // avoid accessing localStorage during SSR/prerender
//   // token === undefined -> not loaded yet; null -> loaded & not present; string -> loaded
//   const [token, setToken] = useState<string | null | undefined>(undefined);
//   const { theme } = useTheme();
//   const searchParams = useSearchParams();
//   // prefer prop userId (passed from a parent/context). If not provided, fall back to query param.
//   const userId = propUserId ?? searchParams.get("id") ?? undefined;

//   const [isFollowed, setIsFollowed] = useState(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [user, setUser] = useState<any>(null);

//   const getUserById = async (id: string) => {
//     setLoading(true);

//     try {
//       const res = await fetch(`https://farmchain.onrender.com/user/${id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to fetch user");

//       return data;
//     } catch (err: any) {
//       console.error("❌", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

// const FollowUser = async (id: string) => {
//   try {
//     const res = await fetch(`https://farmchain.onrender.com/user/follow`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       body: JSON.stringify({ followed_id: Number(id) }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to follow user");

//     toast.success(data.message || "Action successful!");

//     return data;  // MUST RETURN isFollowed
//   } catch (err: any) {
//     console.error("❌", err.message);
//   }
// };


//   useEffect(() => {
//     // wait until token is loaded (could be null if not present)
//     if (!userId) return;
//     if (token === undefined) return; // still loading token from storage

//     getUserById(userId).then((data) => {
//       setUser(data);
//       setIsFollowed(data?.isFollowed ?? false);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId, token]);

//   // read token on client only
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const t = localStorage.getItem("farmchain_token");
//     setToken(t);
//   }, []);

//   console.log("P",user);


//   return (
//     <div>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       <div className="flex justify-center lg:mt-2 mb-2 md:mb-3 px-">
//         <div
//           suppressHydrationWarning
//           className={`${
//             theme === "dark" ? "border-1" : "bg-white"
//           } shadow-2xl rounded-2xl p- pb-5 w-full sm:max-w-[20rem] md:h-fit md:max-w-full lg:max-w-[1230px]`}
//         >
//           <div>
//             <div className="relative">
//               <img
//                 src={
//                   user?.cover_avatar ||
//                   "https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y292ZXIlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
//                 }
//                 alt="profile"
//                 width={100}
//                 height={100}
//                 className=" rounded-b-3xl rounded-t-2xl mx-auto  w-[100%] h-[90%] md:h-[230px] object-cover "
//               />

//               <div className="absolute top-3 right-4 lg:right-7">
//                 <button
//                   disabled={loading}
//                   onClick={async () => {
//                     if (!userId) return;

//                     setLoading(true); // start loading

//                     const res = await FollowUser(userId);

//                     if (res) {
//                       // backend returns "following: true/false"
//                       setIsFollowed(res.following);
//                     }

//                     setLoading(false); // stop loading
//                   }}
//                   className=" bg-green-600 text-white flex gap-2 items-center py-1.5 px-4 rounded-full hover:text-white hover:bg-green-700 disabled:opacity-50"
//                 >
//                   <p className="text-sm font-bold">
//                     {loading
//                       ? isFollowed
//                         ? "Unfollowing..."
//                         : "Following..."
//                       : isFollowed
//                       ? "Unfollow"
//                       : "Follow"}
//                   </p>

//                   {/* Hide icon when loading or unfollowing */}
//                   {!loading && !isFollowed && (
//                     <FaPlus className="font-bold" size={10} />
//                   )}
//                 </button>
//               </div>

//               <div className=" absolute bottom-0  translate-y-1/4 translate-x-7 w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center">
//                 <img
//                   src={
//                     user?.avatar ||
//                     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s"
//                   }
//                   alt="User Avatar"
//                   className="w-38 rounded-full object-cover"
//                 />
//               </div>
//               {user?.verified === false && (
//                 <CheckCircle className="absolute -bottom-9 right-50 lg:right-[730px] w-7 h-7 text-blue-500 bg-white rounded-full" />
//               )}
//             </div>

//             <div className=" mx-6 mt-12">
//               <div className="">
//                 {/* Name */}
//                 <div className="flex items-center justify-between">
//                   <p className="font-black text-3xl mb-2">
//                     {user ? user.name : "Loading..."}
//                   </p>
//                 </div>

//                 {/* followers */}
//                 <div className="flex text-sm gap-4 mb-4">
//                   <p className="">
//                     <span className="font-bold">{user?.followers ?? 0}</span>{" "}
//                     followers
//                   </p>
//                   <p>
//                     <span className="font-bold">{user?.following ?? 0}</span>{" "}
//                     following
//                   </p>
//                 </div>

//                 {/* location */}
//                 <p
//                   className={
//                     theme === "dark"
//                       ? "text-gray-400 mb-2"
//                       : "text-gray-800 mb-2"
//                   }
//                 >
//                   <MapPin className="inline-block w-4 h-4 mr-1 mb-1" />
//                   {user?.location ?? "Unknown Location"}
//                 </p>

//                 {/* organization */}
//                 <p
//                   className={
//                     theme === "dark" ? "text-gray-400" : "text-gray-800"
//                   }
//                 >
//                   <Briefcase className="inline-block w-4 h-4 mr-1 mb-1" />
//                   {user?.organization ?? "Organization"}
//                 </p>

//                 <p
//                   className={
//                     theme === "dark"
//                       ? "text-gray-400 mt-4 mb-7 md:text-xl"
//                       : "text-gray-800 mt-4 mb-7 md:text-xl"
//                   }
//                 >
//                   {user?.bio ?? "No bio available."}
//                 </p>
//               </div>

//               <div className="flex justify-between items-center mb-8 md:mb-">
//                 <div>
//                   <p className="font-black">72.89K</p>
//                   <p className="text-gray-400">Likes</p>
//                 </div>
//                 <div>
//                   <p className="font-black">7.9K</p>
//                   <p className="text-gray-400">Posts</p>
//                 </div>
//                 <div>
//                   <p className="font-black">2.6K</p>
//                   <p className="text-gray-400">Views</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, CheckCircle, Briefcase } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile: React.FC<{ userId?: string }> = ({ userId: propUserId }) => {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const userId = propUserId ?? searchParams.get("id") ?? undefined;

  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  // ⭐ NEW: Followers local state for instant update
  const [followersCount, setFollowersCount] = useState(0);

  const getUserById = async (id: string) => {
    setLoading(true);

    try {
      const res = await fetch(`https://farmchain.onrender.com/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch user");

      return data;
    } catch (err: any) {
      console.error("❌", err.message);
    } finally {
      setLoading(false);
    }
  };

  const FollowUser = async (id: string) => {
    try {
      const res = await fetch(`https://farmchain.onrender.com/user/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ followed_id: Number(id) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to follow user");

      toast.success(data.message || "Action successful!");

      return data; 
    } catch (err: any) {
      console.error("❌", err.message);
    }
  };

  useEffect(() => {
    if (!userId) return;
    if (token === undefined) return;

    getUserById(userId).then((data) => {
      setUser(data);
      setIsFollowed(data?.isFollowed ?? false);
      setFollowersCount(data?.followers ?? 0); // ⭐ sync followers
    });
  }, [userId, token]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = localStorage.getItem("farmchain_token");
    setToken(t);
  }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="flex justify-center lg:mt-2 mb-2 md:mb-3">
        <div
          suppressHydrationWarning
          className={`${
            theme === "dark" ? "border-1" : "bg-white"
          } shadow-2xl rounded-2xl pb-5 w-full sm:max-w-[20rem] md:h-fit md:max-w-full lg:max-w-[1230px]`}
        >
          <div>
            <div className="relative">
              <img
                src={
                  user?.cover_avatar ||
                  "https://images.unsplash.com/photo-1503264116251-35a269479413?..."
                }
                alt="profile"
                className="rounded-b-3xl rounded-t-2xl w-full md:h-[230px] object-cover"
              />

              {/* ⭐ FOLLOW BUTTON */}
              <div className="absolute top-3 right-4 lg:right-7">
                <button
                  disabled={loading}
                  onClick={async () => {
                    if (!userId || loading) return;

                    setLoading(true);

                    // ⭐ OPTIMISTIC UPDATE
                    if (!isFollowed) {
                      setIsFollowed(true);
                      setFollowersCount(prev => prev + 1); // +1 instantly
                    } else {
                      setIsFollowed(false);
                      setFollowersCount(prev => prev - 1); // -1 instantly
                    }

                    const res = await FollowUser(userId);

                    if (!res) {
                      // ❌ Backend failed → revert UI
                      setIsFollowed(prev => !prev);
                      setFollowersCount(prev =>
                        isFollowed ? prev + 1 : prev - 1
                      );
                      setLoading(false);
                      return toast.error("Failed, try again.");
                    }

                    // ✔ Sync if backend returns updated count
                    setIsFollowed(res.following);
                    if (typeof res.followers === "number") {
                      setFollowersCount(res.followers);
                    }

                    setLoading(false);
                  }}
                  className="bg-green-600 text-white flex gap-2 items-center py-1.5 px-4 rounded-full hover:bg-green-700 disabled:opacity-50"
                >
                  <p className="text-sm font-bold">
                    {loading
                      ? isFollowed
                        ? "Unfollowing..."
                        : "Following..."
                      : isFollowed
                      ? "Unfollow"
                      : "Follow"}
                  </p>

                  {!loading && !isFollowed && (
                    <FaPlus className="font-bold" size={10} />
                  )}
                </button>
              </div>

              <div className="absolute bottom-0 translate-y-1/4 translate-x-7 w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center">
                <img
                  src={
                    user?.avatar ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT..."
                  }
                  alt="User Avatar"
                  className="w-38 rounded-full object-cover"
                />

                 {/* {user?.verified === false && (
                    <CheckCircle
                   aria-hidden="true"
                  className="absolute -bottom-8 left-[158px] sm:left-16 md:left-40 lg:left-[9.7rem] xl:left-[9.9rem] w-8 h-8 text-blue-500 bg-white rounded-full border-2 border-white p-[2px] shadow"
                      />
                  )} */}
              </div>
                {user?.verified === false && (
                    <CheckCircle
                   aria-hidden="true"
                  className="absolute -bottom-8 left-[158px] sm:left-16 md:left-40 lg:left-[9.7rem] xl:left-[9.9rem] w-8 h-8 text-blue-500 bg-white rounded-full border-2 border-white p-[2px] shadow"
                      />
                  )}
            </div>

            <div className="mx-6 mt-12">
              {/* name */}
              <p className="font-black text-3xl mb-2">
                {user ? user.name : "Loading..."}
              </p>

              {/* ⭐ FOLLOWERS USING LOCAL STATE */}
              <div className="flex text-sm gap-4 mb-4">
                <p>
                  <span className="font-bold">{followersCount}</span> followers
                </p>
                <p>
                  <span className="font-bold">{user?.following ?? 0}</span>{" "}
                  following
                </p>
              </div>

              <p className={theme === "dark" ? "text-gray-400 mb-2" : "text-gray-800 mb-2"}>
                <MapPin className="inline-block w-4 h-4 mr-1 mb-1" />
                {user?.location ?? "Unknown Location"}
              </p>

              <p className={theme === "dark" ? "text-gray-400" : "text-gray-800"}>
                <Briefcase className="inline-block w-4 h-4 mr-1 mb-1" />
                {user?.organization ?? "Organization"}
              </p>

              <p
                className={
                  theme === "dark"
                    ? "text-gray-400 mt-4 mb-7 md:text-xl"
                    : "text-gray-800 mt-4 mb-7 md:text-xl"
                }
              >
                {user?.bio ?? "No bio available."}
              </p>

              {/* bottom stats */}
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
    </div>
  );
};

export default UserProfile;
