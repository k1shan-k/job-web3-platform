import React from "react";

const Mid = () => {
  return (
    <>
      <div className="relative z-10 w-full flex flex-row-reverse ">
        <div className="w-[65%] rounded-lg bg-[#1E1623] flex flex-col space-y-4 lg:flex-row justify-around p-4">
          <div className="flex flex-col align-middle justify-around">
            <div className="text-[#BEBEBE] text-sm">Community</div>
            <div>
                <div className="text-[#8940D9] text-4xl font-bold">1M+ Users</div>
                <div className="text-sm text-[#8B8B8B]">$500,000 in trasaction</div>
              </div>
          </div>
          <div className="h-28 w-1 bg-[#42344A] hidden lg:block "></div>
          <div className="flex flex-col align-middle justify-around">
            <div className="text-[#BEBEBE] text-sm">Engagemet</div>
            <div className="flex space-x-3">
              <div>
                <div className="text-[#8940D9] text-4xl font-bold">5K</div>
                <div className="text-sm text-[#8B8B8B]">Project</div>
              </div>
              <div>
                <div className="text-[#8940D9] text-4xl font-bold">32K</div>
                <div className="text-sm text-[#8B8B8B]">userProject</div>
              </div>
              <div>
                <div className="text-[#8940D9] text-4xl font-bold">32K</div>
                <div className="text-sm text-[#8B8B8B]">userProject</div>
              </div>
            </div>
          </div>
          <div className="h-28 w-1 bg-[#42344A] hidden lg:block"></div>
          <div className=" space-y-3  ">
            <button className="py-2 w-[89%]  text text-[#8940D9] border-[#B236FF] border-2   font-medium rounded-xl text-lg">
              Get Started
            </button>
            <button className="py-2 w-[89%]  text text-[#8940D9] border-[#E0ADFF] border-2   font-medium rounded-xl text-lg">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mid;
