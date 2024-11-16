"use client";
import React from "react";
import { NEXT_PUBLIC_GATEWAY_URL } from "../../app/constants";
import Link from "next/link";

const Profile = ({ userProfile }) => {
  return (
    <Link href={`/profile/${userProfile.username}`}>
    <div className="mb-6 rounded-b-xl bg-[#3C404B] px-10 py-7 flex space-x-4 align-middle">
      
      <div className="">
        <img
          className="rounded-full h-16 w-16 object-cover"
          src={`${NEXT_PUBLIC_GATEWAY_URL}/ipfs/${userProfile.image_cid}`}
        />
      </div>
      <div className="flex flex-col text-white justify-center">
        <div className="text-xl font-semibold">{userProfile.name}</div>
        <div className="text-sm text-[#D9D9D9]">@{userProfile.username}</div>
      </div>
      
    </div>
    </Link>
  );
};

export default Profile;
