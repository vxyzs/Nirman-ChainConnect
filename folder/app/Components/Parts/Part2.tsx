"use client"
import React, { useEffect } from 'react'
import Aos from 'aos';
import 'aos/dist/aos.css';

const PartTwo = () => {
    useEffect(() => {
        Aos.init();
      }, [])
  return (
    <div className='min-h-screen overflow-x-hidden'>
        <div data-aos="fade-up" data-aos-duration="1000" className='flex flex-col items-center justify-center text-4xl p-8 tracking-wider'>
            <p className='text-center'>
                <span className='bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent'>ChainConnect</span> is an all-in-one platform where users can find the best influencers to advertise their products. Connect with potential partners, negotiate deals, and create smart contracts with ease.
            </p>
            <p className='text-center mt-10'>
                Whether you're a business looking to expand your reach or an influencer seeking collaborations, <span className='bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent'>ChainConnect</span> offers a seamless experience to build meaningful connections and grow your brand. 
            </p>
        </div>
    </div>
  )
}

export default PartTwo
