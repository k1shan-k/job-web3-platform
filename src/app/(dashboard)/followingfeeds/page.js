"use client";
import React from "react";
import { PostList } from "@/components";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../../constants";
import abi from "../../contract/abi.json";
import { useState, useEffect } from "react";

const FollowingFeeds = () => {
  const { address } = useAccount();
  const [userProfile, setUserProfile] = useState({
    owner: "",
    name: "",
    username: "",
    bio: "",
    image_cid: "",
    banner_cid: "",
    profile_id: "",
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
      console.log("ProfileResource:", profileResource);
      setUserProfile({
        owner: profileResource.userAddress,
        name: profileResource.name,
        username: profileResource.username,
        bio: profileResource.bio,
        image_cid: profileResource.imageCID,
        banner_cid: profileResource.bannerCID,
        profile_id: profileResource.userNumber,
        following: profileResource.following,
        followers: profileResource.followers,
      });
    }
  }, [profileResource, isError]);

  return (
    <>
      <div className="lg:w-[65%] md:w-[80%] w-[85%] flex flex-col align-middle my-3 h-full ">
        <div className="sticky md:top-0 top-0 bg-[#14161b] backdrop-blur-md my-3 bg-blend-saturation ">
          <div className="text-[#A4A4A4] text-opacity-90 font-bold  border-b-[#393C49] mt-3 pb-2  border-b-2    flex justify-between w-full">
            <Link href="/feeds" passHref>
              <button className="cursor-pointer">Feed</button>
            </Link>{" "}
            <Link href="/followingfeeds" passHref>
              <button className="cursor-pointer">Following</button>
            </Link>{" "}
            <Link href="/jobs" passHref>
              <button className="cursor-pointer">Jobs</button>
            </Link>{" "}
            <Link href="/trending" passHref>
              <button className="cursor-pointer">Trending</button>
            </Link>{" "}
          </div>{" "}
        </div>
        {userProfile.owner !== "" ? 
        <PostList userProfile={userProfile}/> : <></>
        }
      </div>
    </>
  );
};

export default FollowingFeeds;
