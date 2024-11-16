import React from "react";
import BottomBtn from "./sidebar_components/bottomBtn";
import CreateJob from "./sidebar_components/createJob";
import Logo from "./sidebar_components/Logo";
import Navigation from "./sidebar_components/Navigation";

const Sidebar = ({ setClicked, setSidebar, isSidebar, userProfile }) => {
  const hidden = "hidden";
  const nothidden = "";

  return (
    <div
      className={`lg:fixed lg:w-[23%] md:w-[90%] w-full h-[100vh] py-10 px-6 md:flex ml-5  flex-col justify-between border-r-[#393C49] border-r-4 ${
        isSidebar == false ? "hidden" : ""
      }   `}
    >
      <div className="pb-20">
        <Logo setSidebar={setSidebar} />
        <Navigation userProfile={userProfile} />
      </div>
     <div>
      <BottomBtn setClicked={setClicked} />
      <CreateJob/>
      </div>
    </div>
  );
};

export default Sidebar;
