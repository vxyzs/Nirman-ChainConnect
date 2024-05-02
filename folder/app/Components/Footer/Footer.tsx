import React from 'react';

const Footer = () => {
  return (
    <div
      className="flex items-center justify-between p-16"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div>Logo</div>
      <div>
        <ul className="text-xl flex flex-col gap-4 opacity-85">
          <li>Contact Us</li>
          <li>About</li>
          <li>Log In</li>
          <li>Sign Up</li>
        </ul>
      </div>
      <div>
        <span className='text-xl tracking-wide'>
            Get started with ChainConnect and start your influencer Journey
        </span>
      </div>
    </div>
  );
};


export default Footer;
