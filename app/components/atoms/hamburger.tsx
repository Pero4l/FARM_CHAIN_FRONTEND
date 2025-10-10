'use client'
import { useState } from 'react';
import React from 'react'
import {
   Menu, X
} from "lucide-react";

const Hamburger = () => {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
        <p onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden text-3xl'>{!isMenuOpen ? <X/> : <Menu/>}</p>
    </div>
  )
}

export default Hamburger
