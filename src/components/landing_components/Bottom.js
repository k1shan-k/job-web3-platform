import React from "react";

const Bottom = () => {
  return (
    <>
      <div className=" relative lg:py-20 py-5">
      <svg className=" absolute z-10 bottom-0 left-0"
            width="477"
            height="506"
            viewBox="0 0 477 506"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-164.027 0.207817C189.6 0.0253784 476.453 352.924 476.678 788.429C476.902 1223.93 190.413 1577.13 -163.214 1577.31C-516.84 1577.49 -803.694 1224.59 -803.919 789.09C-804.143 353.585 -517.654 0.390256 -164.027 0.207817Z"
              fill="url(#paint0_radial_700_954)"
            />
            <defs>
              <radialGradient
                id="paint0_radial_700_954"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(-163.527 789.046) rotate(89.957) scale(676.597 549.392)"
              >
                <stop stop-color="#64209C" stop-opacity="0.8" />
                <stop offset="1" stop-color="#64209C" stop-opacity="0" />
              </radialGradient>
            </defs>
          </svg>
        <div className="z-20 flex lg:flex-row  flex-col-reverse space-y-10 lg:space-y-0 space-x-16 lg:pl-24 lg:pr-10">
          <div className="flex-1 animate-[bounce_8s_ease-out_infinite]">
            <img
              className="w-[70%] lg:w-full pl-10 pr-10 pt-28"
              src="https://github.com/SingupalliKartik/wiz/blob/main/src/components/landing_components/Group%20168.png?raw=true"
              alt=""
            />
          </div>
          <div className="flex flex-1 flex-col align-middle justify-center lg:w-[40%] space-y-4 lg:px-8 px-1">
            <div className="text-white text-3xl font-bold">Let Wizz Together</div>
            <div className="text-white font-light w-[90%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              iste deserunt. Quidem, dolores! Nam deserunt necessitatibus
              asperiores velit ipsa, alias iure perspiciatis architecto quia, id
              quam nostrum deleniti tempore dolores.
            </div>
            <div className="w-[40%]">
              <button className="py-2 w-[89%]  text text-[#8940D9] border-[#B236FF] border-2   font-medium rounded-xl text-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Bottom;
