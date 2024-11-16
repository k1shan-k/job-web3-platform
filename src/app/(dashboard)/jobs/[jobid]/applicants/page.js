"use client";
import React from "react";
import { ApplicantProfile } from "@/components";
import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import {
  JOBS_CONTRACT_ADDRESS,
} from "../../../../constants";
import abi from "../../../../contract/jobsabi.json";
import { useParams } from "next/navigation";

const Page = () => {
  const { jobid } = useParams();
  const { address } = useAccount();

  const { data, error } = useReadContract({
    abi,
    address: JOBS_CONTRACT_ADDRESS,
    functionName: "getJobByJobID",
    args: [jobid],
  });

  useEffect(() => {
    // console.log("data:", data);
    console.log("error:", error);
    console.log("data:", data);
  }, [data, error]);

  return (
    <div className="ld:w-3/4   md:w-[80%] w-[85%] flex flex-col   p-4 pt-28">
      <div className="flex justify-between w-full">
        <div className="y-4">
          <div className="text-white text-3xl font-bold">Applicants</div>
          <div className=" text-[#cbcbcb]">
            View all applicants for this opportunity
          </div>
        </div>
      </div>
      <hr className="my-6 opacity-40" />
      {data && data.applicantsUsername.length > 0 ? (
        data.applicantsUsername.map((item, index) => (
          <div key={index}>
            {data.employer == address ? (
              <ApplicantProfile item={item} isCreator={true} />
            ) : (
              <ApplicantProfile item={item} isCreator={false} />
            )}
          </div>
        ))
      ) : (
        <div className="text-white w-full mt-6 text-center font-semibold">
          No Applicants Yet
        </div>
      )}
    </div>
  );
};

export default Page;
