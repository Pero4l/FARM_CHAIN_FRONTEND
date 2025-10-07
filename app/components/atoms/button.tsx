"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
// Add type for props
type ButtonProps = {
  onClose?: () => void;
};
// import ThemeToggle from '../toggle'

const Button = ({ onClose }: ButtonProps) => {
  return (
    <div>
      {/* <ThemeToggle/> */}

      {/* BUTTONS */}
      <div className="flex  justify-center lg:flex relative lg:left-10">
        <Link
          href="/auth/register"
          className="bg-green-600 text-white lg:px-12 md:w-full px-12 py-3 rounded-l-full hover:bg-green-700 transition"
          onClick={onClose}
        >
          Sign Up
        </Link>
        <Link
          href="/auth/register"
          className="border border-green-600 text-green-600 lg:px-12 md:w-full px-10 py-3 rounded-full hover:bg-green-600 hover:text-white transition bg-white relative md:right-4 lg:right-7 right-7"
          onClick={onClose}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Button;
