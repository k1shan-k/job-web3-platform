"use client";
import React, { useEffect } from "react";
import { JobList } from "@/components";
import { useParams } from "next/navigation";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, NEXT_PUBLIC_GATEWAY_URL } from "../../../constants";
import abi from "../../../contract/abi.json";
import Link from "next/link";

const Page = () => {
  const { username } = useParams();

  const { data: profileResource, error: isError } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getUserProfileByUsername",
    args: [username],
  });

  return (
    <>
      <div className="lg:w-[65%] md:w-[80%] w-[85%] flex flex-col align-middle my-3 h-full ">
        <div className="flex justify-between w-full">
          <div className="my-4">
            <div className="text-white text-lg font-semibold mb-4">
              Opportunity Created By:
            </div>
            {profileResource !== undefined ? (
              <Link href={`/profile/${profileResource.username}`} passHref>
                <div className="flex space-x-4 align-middle">
                  <div className="">
                    <img
                      className="rounded-full h-14 w-14"
                      src={`${NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileResource.imageCID}`}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col text-white justify-center">
                    <div className="text-lg font-medium text-[#F3F3F3] text-opacity-90">
                      {profileResource.name}
                    </div>
                    <div className="text-sm font-light text-[#D9D9D9]">
                      @{profileResource.username}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
        <hr className=" opacity-40  mt-2" />
        <div className="my-5">
          <JobList />
        </div>
      </div>
    </>
  );
};

export default Page;
