"use client"
import React, { useEffect, useState } from 'react';
import { ModeToggle } from '../ModeToggle/Toggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 z-10 transition-all ${
        isScrolled
          ? 'bg-white/30 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between p-6 text-lg">
        <div>Logo</div>
        <div>
          <ul className="flex items-center justify-center gap-8">
            <li className='hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 transition-all duration-500 p-2 rounded cursor-pointer'>Home</li>
            <li className='hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 transition-all duration-500 p-2 rounded cursor-pointer'>About</li>
            <li className='hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 transition-all duration-500 p-2 rounded cursor-pointer'>Log in</li>
            <li className='hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 transition-all duration-500 p-2 rounded cursor-pointer'>Sign up</li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
