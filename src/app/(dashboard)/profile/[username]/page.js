"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PostCard } from "@/components";
import { CONTRACT_ADDRESS } from "../../../../app/constants";
import { useReadContract, useAccount } from "wagmi";
import abi from "../../../../app/contract/abi.json";
import Link from "next/link";
import { PostList } from "@/components";


const Profile = () => {

  const { address } = useAccount();
  const { username } = useParams();
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
    functionName: "getUserProfileByUsername",
    args: [username],
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
      {userProfile.owner !== "" ? (
        <PostList userProfile={userProfile} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
