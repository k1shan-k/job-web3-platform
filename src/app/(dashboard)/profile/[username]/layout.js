"use client";
import Link from "next/link";
import "./profile_layout.css";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Topbar } from "@/components";
import { CONTRACT_ADDRESS } from "../../../../app/constants";
import { useReadContract } from "wagmi";
import abi from "../../../../app/contract/abi.json";

export default function ProfileLayout({ children }) {
  const { username } = useParams();

  const [userProfile, setUserProfile] = useState({
    owner: "",
    name: "",
    username: "",
    bio: "",
    image_cid: "",
    banner_cid: "",
    time_created: "",
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
      setUserProfile({
        owner: profileResource.userAddress,
        name: profileResource.name,
        username: profileResource.username,
        bio: profileResource.bio,
        image_cid: profileResource.imageCID,
        banner_cid: profileResource.bannerCID,
        time_created: profileResource.timeCreated,
        following: profileResource.following,
        followers: profileResource.followers,
      });
    }
  }, [profileResource, isError]);

  return (
    <>
      <div className="lg:w-[65%] md:w-[80%] w-[85%] flex flex-col align-middle my-3 h-full min-h-screen p-t-20 ">
        <div className="profile_container">
          {userProfile.name !== "" ? <Topbar profile={userProfile} /> : <></>}
        </div>
        <div className="profile_menu mt-5 mb-5">
          <ul>
            <Link href={`/profile/${username}`}>
              <li>All</li>
            </Link>
            <Link href={`/profile/${username}/workexperience`}>
              <li>Work Exp.</li>
            </Link>
            <Link href={`/profile/${username}/achievement`}>
              <li>Achievement</li>
            </Link>
            <Link href={`/profile/${username}/project`}>
              <li>Project</li>
            </Link>
            <Link href={`/profile/${username}/certification`}>
              <li>Certification</li>
            </Link>
          </ul>
        </div>
        <div className="user_posts_content">{children}</div>
      </div>
    </>
  );
}
