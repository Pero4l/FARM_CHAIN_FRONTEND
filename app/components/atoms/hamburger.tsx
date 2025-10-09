'use client'
import { useState, useRef, useEffect } from 'react';
import React from 'react'
import {
   Menu, X
} from "lucide-react";

const Hamburger = () => {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
        <p onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden text-3xl'>{!isMenuOpen ? <Menu/> : <X/>}</p>
    </div>
  )
}

export default Hamburger
