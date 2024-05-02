import React from 'react';
import PartTwo from './Components/Parts/Part2';
import Features from './Components/Parts/Features';
import Footer from './Components/Footer/Footer';

const Page = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
        <h1 className="text-center text-8xl tracking-wide bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent">
          ChainConnect
        </h1>
        <div className="flex items-center justify-center text-3xl mt-5 opacity-80">
          <span className="text-center">
            a one-stop solution to finding the best influencers worldwide
          </span>
        </div>
        <div className="flex items-center justify-center mt-10">
          <button className="text-xl border border-white p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 transition-all duration-300 hover:scale-110">
            Get Started
          </button>
        </div>
      </div>
      <div className="min-h-screen">
        <PartTwo />
      </div>
      <div className='min-h-screen'>
        <Features />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
