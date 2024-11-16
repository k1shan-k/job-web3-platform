"useClient";
import React from "react";
import { CONTRACT_ADDRESS, NEXT_PUBLIC_GATEWAY_URL } from "../../app/constants";
import { create } from "domain";
import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import abi from "../../app/contract/abi.json";
import Link from "next/link";

const JobCard = (props) => {
  const [detailedDescription, setDetailedDescription] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    if (props.item !== undefined) {
      setUrl(`${NEXT_PUBLIC_GATEWAY_URL}/ipfs/${props.item.descriptionIPFS}`);
    }
  }, [props.item]);

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
      <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mt-4 mb-4">
        {/* Banner Image */}
        {/* {job.bannerImage && ( */}
        <div className=" h-32 mb-4 rounded-t-xl overflow-hidden">
        {detailedDescription && detailedDescription.bannerURL ?
          <img
            src={detailedDescription.bannerURL}
            alt="Job Banner"
            className="w-full h-full object-cover object-center"
          />
          : <></> }
        </div>
        {/* )} */}

        {/* Job Title and Type */}
        <div className="flex justify-between items-center mb-3 pt-3">
          <h2 className="text-2xl text-white font-bold">{props.item.title}</h2>
          <div>
          <button className="bg-[#FFFFFF] bg-opacity-5 py-2 px-4 w-full text-xs text-[#A4A4A4] border-none rounded-lg">
            {props.item.jobType}
          </button>
        </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-4">{props.item.shortDescription}</p>

        {/* Reward and Employer */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400 text-sm">
            Reward: <strong className="text-white">${Number(props.item.reward)}</strong>
          </span>
          <Link href={`/profile/${props.item.employerUsername}`}>
          <span className="text-sm text-blue-400">Posted By: {props.item.employerUsername}</span>
            </Link>
        </div>

        {/* View Details Button */}
        <Link href={`/jobs/${props.item.jobId}`}>
        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
          View Details
        </button>
        </Link>
      </div>
    </>
  );
};

export default JobCard;
