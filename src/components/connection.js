"use client";
import { useState, useEffect } from "react";
import { CONTRACT_ADDRESS } from "../app/constants";
import ShortProfile from "./rightsidebar_compnents/ShortProfile";
import { useAccount, useReadContract } from "wagmi";
import abi from "../app/contract/abi.json";


const Connection = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true); 
  const [allProfilesToDisplay, setAllProfilesToDisplay] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: "",
    username: "",
    bio: "",
    image_cid: "",
    following: [],
    followers: [],
  });

  const { data: profileResource, error: isError } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getUserProfileByAddress",
    args: [address],
  });

  useEffect(() => {
    if (profileResource !== undefined) {
      setUserProfile({
        name: profileResource.name,
        username: profileResource.username,
        bio: profileResource.bio,
        image_cid: profileResource.imageCID,
        following: profileResource.following,
        followers: profileResource.followers,
      });
    }
  }, [profileResource, isError]);

 
//get all profiles
const { data: allProfiles, error: error } = useReadContract({
  abi,
  address: CONTRACT_ADDRESS,
  functionName: "getAllUserAccounts",
  args: [],
});

useEffect(() => {
  if (allProfiles !== undefined && userProfile.name !== "") {
    console.log("allProfiles:", allProfiles);
    // make all profile display that the user follows
    // const profiles = allProfiles.filter((item) => userProfile.following.includes(item.username));
    setAllProfilesToDisplay(allProfiles.filter((item) => userProfile.following.includes(item.username)));
  }
}, [allProfiles, userProfile]);

  useEffect(() => {
    if (userProfile && userProfile.following && allProfiles !== undefined) {
      setLoading(false);
    }
  }, [userProfile, userProfile.following, allProfiles]);

  if (loading) {
    return( <div className="flex justify-center h-[100vh] width-[100vw] align-middle ">
    <h1 className=" m-auto p-6 text-center">Loading....</h1>
  </div>); 
  }

  return (
    <div className="ld:w-3/4   md:w-[80%] w-[85%] flex flex-col   p-4 pt-28">
      {/* top */}
      {/* <Profile /> */}
      {/* list */}
      <h2 className='mb-6'>You Are Following</h2>
      <div className="flex flex-col ">
      {allProfilesToDisplay.length > 0 && allProfilesToDisplay.map((item, index) => (
          <div key={index}>
            <ShortProfile data={item} userProfile={userProfile} setbio={true}/>
          </div>
        )) }
      </div>
    </div>
  );
};

export default Connection;