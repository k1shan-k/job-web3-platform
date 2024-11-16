"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function OpportunitiesLayout({ children }) {

  return (
    <>
      <div className="lg:w-[65%] md:w-[80%] w-[85%] flex flex-col align-middle my-3 h-full ">
        <div className="sticky md:top-0 top-0 bg-[#14161b] backdrop-blur-md my-3 bg-blend-saturation ">
          <div className="text-[#A4A4A4] text-opacity-90 font-bold  border-b-[#393C49] mt-3 pb-2  border-b-2    flex justify-between w-full">
            <Link href="/opportunities" passHref>
              <button className="cursor-pointer">All</button>
            </Link>{" "}
            <Link href="/opportunities/job" passHref>
              <button className="cursor-pointer">Jobs</button>
            </Link>{" "}
            <Link href="/opportunities/internship" passHref>
              <button className="cursor-pointer">Internships</button>
            </Link>{" "}
            <Link href="/opportunities/freelancing" passHref>
              <button className="cursor-pointer">Freelancing</button>
            </Link>{" "}
            <Link href="/opportunities/bounty" passHref>
              <button className="cursor-pointer">Bountyies</button>
            </Link>{" "}
          </div>{" "}
        </div>
        {children}
      </div>
    </>
  );
}
