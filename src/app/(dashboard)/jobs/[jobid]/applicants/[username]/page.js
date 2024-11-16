"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import {
  JOBS_CONTRACT_ADDRESS,
  CONTRACT_ADDRESS,
  PINATA_JWT,
  NEXT_PUBLIC_GATEWAY_URL,
} from "../../../../../constants";
import abi from "../../../../../contract/jobsabi.json";
import abii from "../../../../../contract/abi.json";
import { useParams } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const { jobid, username } = useParams();
  const [url, setUrl] = useState();
  const [detailedDescription, setDetailedDescription] = useState();

  const { data: owner, error: isError } = useReadContract({
    abi: abii,
    address: CONTRACT_ADDRESS,
    functionName: "getUserProfileByUsername",
    args: [username],
  });

  const { data: ApplicationData, error: ApplicationDataError } =
    useReadContract({
      abi,
      address: JOBS_CONTRACT_ADDRESS,
      functionName: "getApplicationByJobIDAndUsername",
      args: [jobid, username],
    });

  useEffect(() => {
    console.log("ApplicationError:", ApplicationDataError);
    if (ApplicationData !== undefined) {
      console.log("ApplicationData:", ApplicationData);
      setUrl(
        `${NEXT_PUBLIC_GATEWAY_URL}/ipfs/${ApplicationData.applicationIPFS}`
      );
    }
  }, [ApplicationData, ApplicationDataError]);

  async function fetchDataFromUrl(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  useEffect(() => {
    if (url !== undefined) {
      fetchDataFromUrl(url).then((data) => {
        setDetailedDescription(data);
        console.log("Detailed discription:", data);
      });
    }
  }, [url]);

  return (
    <>
      {owner &&
      ApplicationData &&
      ApplicationData.applicationId !== undefined ? (
        <>
          <div className="lg:w-[65%] md:w-[80%] w-[85%] flex flex-col align-middle my-3 h-full min-h-screen p-t-20 ">
            <div className="bg-[#0b0b0b] mt-3 mb-3 rounded-md">
              <div className=" py-2 px-3 flex space-x-4 align-middle justify-between ">
                <Link href={`/profile/${owner.username}`}>
                  <div className="flex space-x-4 align-middle p-2 ">
                    <div>
                      <img
                        className="rounded-full h-12 w-12"
                        src={`${NEXT_PUBLIC_GATEWAY_URL}/ipfs/${owner.imageCID}`}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col text-white justify-center">
                      <div className="text-xl font-medium">{owner.name}</div>
                      <div className="text-xs font-normal text-[#D9D9D9]">
                        @{owner.username}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col justify-center">
                  {detailedDescription &&
                  detailedDescription.applicationStatus ? (
                    <button className="bg-[#7501E9] py-2 px-7 w-full text-sm text-white border-none rounded-full font-medium">
                      {detailedDescription.applicationStatus}
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className=" text-[#D9D9D9] text-sm mb-6 py-2 px-5">
                {owner.bio}
              </div>
            </div>
            {/* <div className="flex flex-row justify-start ">
              <button className=" border-[1px] mr-4 py-2 max-w-32 border-[#028a1d] px-4 w-full max-h-fit text-sm text-[#028a1d]  rounded-full font-medium">
                Accept
              </button> */}
              {/* <button className=" border-[1px] mr-4 py-2 max-w-32 border-[#074bd4] px-4 w-full max-h-fit text-sm text-[#074bd4]  rounded-full font-normal">
                Submitted
              </button> */}
              {/* <button className=" border-[1px] mr-4 py-2 max-w-32 border-[#d20404] px-4 w-full max-h-fit text-sm text-[#d20404]  rounded-full font-medium">
                Reject
              </button>
            </div> */}
            <hr className="opacity-40 my-4" />
            {detailedDescription && detailedDescription.applicationStatus ? (
              <div className="text-custom">
                <div className="text-[#cbcbcb] text-md font-normal mt-5">
                  Email :
                  <span className="text-[#ffffff] font-medium underline-offset-1 ">
                    <a href={`mailto:${detailedDescription.email}`}>
                      {detailedDescription.email}
                    </a>
                  </span>
                </div>
                <div className="text-[#cbcbcb] text-md font-normal mt-5">
                  Cover Letter Link :
                  <span className="text-[#ffffff] font-medium underline-offset-1 ">
                    <a href={`${detailedDescription.coverLetterLink}`}>
                      {detailedDescription.coverLetterLink}
                    </a>
                  </span>
                </div>
                <div className="text-white text-lg font-bold mt-5">
                  Why do you want to get this job?
                </div>
                <div className="text-[#cbcbcb]">
                  <p className="text-md text-gray-300  mt-3">
                    {detailedDescription.whyWantToJoin}
                  </p>
                </div>
                <div className="text-white text-lg font-bold mt-5">
                  Do you have any questions for us?
                </div>
                <div className="text-[#cbcbcb]">
                  <p className="text-md text-gray-300  mt-3">
                    {detailedDescription.anyQuestions !== "" ||
                    detailedDescription.anyQuestions !== " "
                      ? detailedDescription.anyQuestions
                      : "No"}
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Page;
