import React from 'react'

const WhatHeppening = () => {
    const arr= ["a","b","c"]
    const arr2= ["a","b"]
  return (
    <div>
    <div className="text-[#A4A4A4]  text-opacity-90  mb-3"> What&apos;s happening</div>
    <div>
        {arr2.map((item, index) => (
            <div key={index}>
<div className=" bg-[#F0F0F0] bg-opacity-5 p-3 px-4 my-3 rounded-xl text-[#EDEDED] space-y-1">
    <div className="font-semibold text-lg text-white">
    #BockchainCoders
    </div>
    <div className="  truncate">Stop scratching your head all day, searching right tool to start with, betterbuild is your all in one place.</div>
           <div className="text-sm">3.8K people</div>
            </div>
            </div>
        ))}
    </div>
</div>
  )
}

export default WhatHeppening