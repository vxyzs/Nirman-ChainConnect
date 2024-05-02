import React from 'react'
import Image from 'next/image'

const Features = () => {
  return (
    <div>
      <div className='p-5 overflow-x-hidden'>
        <div className='overflow-x-hidden' data-aos="fade-right" data-aos-duration="1000">
            <span className='text-3xl bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent'>Connect your wallet</span>
            <div className='flex items-center'>
              <p className='mt-5 text-2xl'>
                Connect your metamask wallet with our web application and save your tokens that you get from your work directly into your wallet !
                Don't worry! We have ensured that this process is absolutely safe and secure.
              </p>
              <Image src="/gif/gifimage.gif" alt='gifimage' width={750} height={750}/>
            </div>
        </div>
        <div className='mt-5 overflow-x-hidden' data-aos="fade-left" data-aos-duration="1000">
            <span className='text-3xl bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent'>Share your posts with the world and get paid</span>
            <p className='mt-4 text-2xl'>
                Get paid for the post you make here and the reach you gain. The payment will be made in the form of token which you can use anywhere you want!
            </p>
        </div>
        <div className='mt-5 overflow-x-hidden' data-aos="fade-right" data-aos-duration="1000">
            <span className='text-3xl bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent'>Chat with fellow influencers and companies</span>
            <p className='mt-4 text-2xl'>
                Chat with fellow influencers as well as with companies directly to expand your network and reach
            </p>
        </div>
        <div className='mt-5 overflow-x-hidden' data-aos="fade-left" data-aos-duration="1000">
            <span className='text-3xl bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent'>Buy / Sell and transfer tokens</span>
            <p className='mt-4 text-2xl'>
                Buy, Sell and transfer tokens on our platform completely securely. We leverage the power of blockchain technology, It's completely secure!
            </p>
        </div>
      </div>
    </div>
  )
}

export default Features
