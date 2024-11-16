"use client";
import React, { useState } from "react";
import { Featured } from "@/components";
import Link from "next/link";

const Treanding = () => {
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
        <Featured />
      </div>
    </>
  );
};

export default Treanding;
