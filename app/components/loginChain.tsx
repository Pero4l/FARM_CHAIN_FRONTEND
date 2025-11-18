"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useCurrentUser} from '@/app/components/currentUser';




interface LoginData {
  user: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    user: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { setUser } = useCurrentUser();
  const { setUserProfile } = useCurrentUser();


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

   const router = useRouter();

  const handleLogin = async () => {
    setMessage("");

    setLoading(true);
    try {
      const res = await fetch("https://farmchain.onrender.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      console.log("Profile",data.profile);
      console.log("Users",data.user);
      

      
      setMessage("✅ Login successfully!");
      toast.success("Login successfully!");

      localStorage.setItem("farmchain_token", data.token ?? "");
      localStorage.setItem("farmchain_user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userProfile", JSON.stringify(data.profile));
      setUserProfile(data.profile);
       setUser(data.user);


      


      setTimeout(() => {
        router.push('/main');
      }, 2000);
      
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
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
      <div>
        <div className="lg:text-center lg:mb-8 pt-5 md:pt-0 mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600">Sign in to continue growing with us</p>
        </div>

        {message && (
          <div
            className={`mb-5 -mt-5 text-sm text-center p-3 rounded-lg ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Phone
            </label>
            <input
              type="text"
              name="user"
              value={loginData.user}
              onChange={handleChange}
              placeholder="Enter your email or phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
          
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                value={loginData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            {loading ? "Login..." : "Sign In"}
          </button>

          <p className="text-center text-black">
            Don't have an account?{" "}
            <Link className="text-green-800" href="/auth/register">
              {" "}
              sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
