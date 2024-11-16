"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { JOBS_CONTRACT_ADDRESS, PINATA_JWT } from "../../../constants";
import abi from "../../../contract/jobsabi.json";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const CreateJob = () => {
  const { address } = useAccount();

  const [job, setJob] = useState({
    title: "",
    description: "",
    type: "",
    reward: "",
    detailedDiscription: "",
    bannerURL: "",
  });
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // const editor = Jodit.make();

  const placeholder =
    "Detailed Description: Provide a detailed job description, perks and rewards, requirements, deadlines, and more.";

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typing...",
      width: "100%",
      height: 300,
      theme: "dark",
      className: "some_my_class",
      style: {
        backgroundColor: "#34374d",
        color: "white",
        maxWidth: "100%",
      },
    }),
    [placeholder]
  );

  const {
    data: createJobData,
    error: createJobError,
    isPending: createJobIsPending,
    writeContract: createJobWriteContract,
  } = useWriteContract();

  useEffect(() => {
    if ( createJobData !== undefined) {
      toast.success("Job Created successfully");
      redirect('/opportunities');

    } else if (createJobError !== null) {
      toast.error("Error while creating job");
    }
  }, [createJobData, createJobError]);

  const handleSubmission = async () => {
  if(job.detailedDiscription !==undefined && job.detailedDiscription !==null){
    try {
       const detailedDescriptionData =  {
        detailedDescription: job.detailedDiscription,
        bannerURL: job.bannerURL,
        jobStatus: "active",
      };

      const detailedDescriptionJSON = JSON.stringify(detailedDescriptionData);

      const formData = new FormData();
      formData.append(
        "file",
        new Blob([detailedDescriptionJSON], { type: "application/json" })
      );

      const metadata = JSON.stringify({
        name: "Detailed Description",
        keyvalues: {
          title: job.title,
          type: job.type,
        },
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const resData = await res.json();
      console.log("Detailed description IPFS CID:", resData.IpfsHash);

      return resData.IpfsHash;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  };


  const createJobFunc = async (disCID) => {
    try {
      createJobWriteContract({
        abi,
        address: JOBS_CONTRACT_ADDRESS,
        functionName: "createJob",
        args: [
          job.title,
          job.description,
          disCID,
          job.reward,
          job.type,
        ],
      });
    } catch (error) {
      console.error("Error during create job:", error);
    }
  };
  if (typeof window !== "undefined") {
  return (
    <div className=" ">
      <div className="w-full h-full flex-[0.7] flex flex-col justify-center align-middle mt-8 mb-6 ">
        <div className="flex justify-between w-full">
          <div className="m-4">
            <div className="text-white text-3xl font-bold">
              Create a New Opportunity
            </div>
            <div className=" text-[#cbcbcb]">
              Provide details to post a job, internship, freelancing gig, or
              bounty
            </div>
          </div>
        </div>
        <>
          <div className="flex md:flex-row flex-col">
            <input
              onChange={(e) => setJob({ ...job, title: e.target.value })}
              type="text"
              className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Job Title"
            />
          </div>

          <div className="flex md:flex-row flex-col">
            <input
              onChange={(e) => setJob({ ...job, description: e.target.value })}
              type="text"
              className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Short Description: Provide a brief overview"
            />
          </div>

          <div className="flex md:flex-row flex-col">
            <select
              onChange={(e) => setJob({ ...job, type: e.target.value })}
              className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option
                className="text-[#c3c3c3] pt-4 pb-4"
                disabled
                selected
                value=""
              >
                Select Type of Opportunity
              </option>
              <option className="text-white pt-10 pb-10" value="Job">
                Job
              </option>
              <option className="text-white pt-10 pb-10" value="Internship">
                Internship
              </option>
              <option className="text-white pt-10 pb-10" value="Freelancing">
                Freelancing Gig
              </option>
              <option className="text-white pt-10 pb-10" value="Bounty">
                Bounty
              </option>
            </select>

            <input
              onChange={(e) => setJob({ ...job, reward: e.target.value })}
              type="number"
              min="0"
              className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Reward (USD)"
            />
          </div>

          <div className="flex md:flex-row flex-col">
            <input
              onChange={(e) => setJob({ ...job, bannerURL: e.target.value })}
              type="text"
              className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Banner Image URL"
            />
          </div>

          <div className="flex  max-w-fit justify-center align-middle overflow-hidden max-w-full pl-3 mt-3">
            {/* <textarea
          onChange = {(e) => setJob({...job, detailedDiscription: e.target.value})}
          className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          rows="6"
          placeholder="Detailed Description: Provide a detailed job description, perks and rewards, requirements, deadlines, and more."
        ></textarea> */}
            <JoditEditor
              className="jodit_theme_summer"
              id="editor"
              ref={editor}
              value={job.detailedDiscription}
              config={config}
              tabIndex={1} // tabIndex of textarea
              // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) =>
                setJob({ ...job, detailedDiscription: newContent })
              }
            />
          </div>

          {/* <div className="flex md:flex-row flex-col">
        <input
          type="file"
          className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Upload Supporting Files (Optional)"
        />
      </div> */}

          {/* <!-- Submit Button --> */}
          <div className="w-[30%] m-4">
            <div className="space-y-6 py-4 bottom-0 flex flex-col">
              <button
                className="bg-[#7501E9] py-3 w-[90%] text-white border-none rounded-xl"
                onClick={async () => {
                  try {
                    let disCID = await handleSubmission();
                    console.log("Job:", job);

                    createJobFunc(disCID);
                  } catch (error) {
                    console.error("Error during submission:", error);
                  }
                }}
              >
                Post Work
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
};

export default CreateJob;
