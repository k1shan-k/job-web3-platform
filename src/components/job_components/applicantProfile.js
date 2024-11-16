"use client";
import React from "react";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, NEXT_PUBLIC_GATEWAY_URL } from "../../app/constants";
import abi from "../../app/contract/abi.json";
import { useParams } from "next/navigation";

const ApplicantProfile = (props) => {
    
    const { jobid } = useParams();
  const { data: profileResource, error: isError } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getUserProfileByUsername",
    args: [props.item],
  });

  //updateApplicationStatus (Submitted/in review-> accepted/rejected) & (accepted-> Submitted/rejected) & (rejected-> Submitted/accepted)
  //button to view full applicatation

  return (
    <>
      {profileResource ? (
        <div className=" rounded-md pt-2 pb-2">
          <div className=" py-2 flex space-x-4 align-middle justify-between ">
            <Link href={`/profile/${props.item}`} passHref>
              <div className="flex space-x-4 align-middle">
                <div className="">
                  <img
                    className="rounded-full h-12 w-12"
                    src={`${NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileResource.imageCID}`}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-white justify-center">
                  <div className="text-lg font-medium text-[#F3F3F3] text-opacity-90">
                    {profileResource.name}
                  </div>
                  <div className="text-sm font-light text-[#D9D9D9]">
                    @{props.item}
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex flex-row justify-center">
              {/* <button className=" border-[1px] mr-4 py-2 border-white px-4 w-full max-h-fit text-sm text-white  rounded-full font-medium">
                Submitted
              </button> */}
              <Link href={`/jobs/${jobid}/applicants/${props.item}`} passHref>
              <button className="bg-[#193cff]  py-2 px-4 w-full min-w-fit  max-h-fit text-sm text-white border-none rounded-full font-normal">
                View Application
              </button>
              </Link>
            </div>
          </div>
          <div className=" text-[#D9D9D9] text-sm mb-6 pl-0">
            {profileResource.bio}
          </div>

          {/* <div className="flex flex-row justify-start">
            <button className=" border-[1px] mr-4 py-2 max-w-32 border-[#028a1d] px-4 w-full max-h-fit text-sm text-[#028a1d]  rounded-full font-normal">
              Accept
            </button>
            <button className=" border-[1px] mr-4 py-2 max-w-32 border-[#074bd4] px-4 w-full max-h-fit text-sm text-[#074bd4]  rounded-full font-normal">
              Submitted
            </button>
            <button className=" border-[1px] mr-4 py-2 max-w-32 border-[#d20404] px-4 w-full max-h-fit text-sm text-[#d20404]  rounded-full font-normal">
              Reject
            </button>
          </div> */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ApplicantProfile;
