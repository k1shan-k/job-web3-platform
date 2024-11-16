import React from "react";
import Logo from "../sidebar_components/Logo";

const Topnav = () => {
  return (
    <div className="w-full hidden  sticky z-20 top-3 pt-7 md:flex items-center justify-center align-middle ">
      <div className=" bg-blend-multiply  h-14 w-[60%] px-4 border flex justify-between align-middle items-center rounded-full  border-white border-opacity-30 bg-[#4D4D4D] bg-opacity-10">
        <div className="w-8 h-8">
          <svg
            width="30"
            height="30"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.06897 14.1429C2.54048 16.9046 2.87074 23.3855 8.41974 27.2151M8.41974 27.2151H28.8321M8.41974 27.2151L5.90535 34.1081C5.83424 34.3031 5.97626 34.51 6.18374 34.5138L32.3778 34.9907C32.607 34.9949 32.7572 34.7524 32.6513 34.549L28.8321 27.2151M28.8321 27.2151C33.2581 23.7783 39.6526 14.7689 29.823 6.22596C27.643 4.01658 21.4202 0.260629 13.9688 2.91189M13.254 17.8288L16.219 15.0742C16.3477 14.9547 16.3477 14.751 16.219 14.6314L13.254 11.8768C13.1381 11.7691 12.9586 11.7691 12.8427 11.8768L9.87769 14.6314C9.74901 14.751 9.74901 14.9547 9.87769 15.0742L12.8427 17.8288C12.9586 17.9365 13.1381 17.9365 13.254 17.8288ZM6.67996 11.0344L10.7102 7.29006C10.8389 7.17051 10.8389 6.96682 10.7102 6.84727L6.67996 3.10297C6.564 2.99524 6.38455 2.99524 6.26859 3.10297L2.2383 6.84727C2.10962 6.96682 2.10962 7.17051 2.2383 7.29006L6.26859 11.0344C6.38455 11.1421 6.56399 11.1421 6.67996 11.0344Z"
              stroke="white"
              strokeWidth="2.59886"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="text-white text-sm font-light flex space-x-7">
          <div>Who is this for</div>
          <div>Why Wizz</div>
          <div>Know More</div>
          <div>Support</div>
        </div>
        <div>
          <div className="relative rounded-full bg-[#faf1ff] box-border w-full h-[2.694rem] flex flex-row items-center justify-center py-[1.043rem] px-4 min-w-[4.508rem] border-2 border-solid border-[#7f00ff]">
            <button className="w-[8.688rem] relative text-lg  text-transparent !bg-clip-text [background:linear-gradient(90deg,_#7f00ff,_#e100ff)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]  inline-block">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
