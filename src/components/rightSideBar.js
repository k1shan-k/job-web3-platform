import Profile from "./rightsidebar_compnents/Profile";
import WhatHeppening from "./rightsidebar_compnents/WhatHeppening";
import WhomeToFollow from "./rightsidebar_compnents/WhomeToFollow";

const rightSideBar = ({userProfile}) => {
  return (
    <div className=" h-full  px-4  flex-col  justify-start">
      <Profile userProfile= {userProfile}/>
      {/* Whome to Followes */}
      <WhomeToFollow userProfile= {userProfile} />
      {/* what's happening */}
      <WhatHeppening />
    </div>
  );
};

export default rightSideBar;
