import React from "react";
import Link from "next/link";
import { NEXT_PUBLIC_GATEWAY_URL } from "../../app/constants";
import { useAccount, useReadContract } from "wagmi";

const Topbar = ({ profile }) => {
  const { address } = useAccount();
  // console.log("profileowner:", profile.owner, "address:", address);
  return (
    <div className="text-white  flex flex-col ">
      <div>
        <img
          className="w-full h-36 rounded-xl"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_bVcPNq-HujfJEYAb6H1G1yHOK4rM0YJeZQ&s"
          alt=""
        />
      </div>
      <div className="px-4">
        <div>
          <div className=" py-2 -mt-16 flex space-x-4  justify-between align-baseline ">
            <div className="flex space-x-4 align-end">
              <img
                className="rounded-full h-28 w-28"
                src={`${NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profile.image_cid}`}
                alt=""
              />
            </div>
            <div className="flex flex-row  justify-items-end justify-self-end  align-bottom ">
              {/* {profile.owner == address ? ( */}|
              <Link href={`/${profile.username}/opportunities`}>
                <button className="py-2 px-5 flex-col align-bottom justify-end text-white border-while border-2  rounded-lg font-normal max-h-10 mt-16 text-sm mr-2">
                  Job Posted
                </button>
              </Link>
              <Link href={`/${profile.username}/applications`}>
                <button className="py-2 px-4 flex-col align-bottom justify-end text-white border-while border-2  rounded-lg font-normal max-h-10 mt-16 text-sm">
                  Job Applied
                </button>
              </Link>
              {/* ) : (
                <></>
              )} */}
            </div>
          </div>
        </div>
        <div className="flex flex-col text-white justify-center">
          <div className="text-3xl font-semibold">{profile.name}</div>
          <div className=" text-[#A4A4A4]">@{profile.username}</div>
        </div>
        <div className=" my-2">{profile.bio}</div>
        <div className="flex space-x-4">
          <div className="flex space-x-2 align-middle">
            <div className="text-md text-[#a6a6a6] ">
              {profile.following ? profile.following.length : 0}
            </div>
            <div className="flex flex-col  justify-center text-[#979797] text-opacity-90 text-md">
              Followings
            </div>
          </div>
          <div className="flex space-x-2 align-middle">
            <div className="text-md  text-[#a6a6a6]">
              {profile.followers ? profile.followers.length : 0}
            </div>
            <div className="flex flex-col  justify-center text-[#979797] text-opacity-90 text-md">
              Followers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
