"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { JOBS_CONTRACT_ADDRESS, PINATA_JWT } from "../../../../constants";
import abi from "../../../../contract/jobsabi.json";
import { redirect, useParams } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const { address } = useAccount();
  const { jobid } = useParams();
  const [application, setApplication] = useState({
    email: "",
    whyWantToJoin: "",
    coverLetterLink: "",
    anyQuestions: "",
  });

  const {
    data,
    error: applyError,
    isPending,
    writeContract: createJobWriteContract,
  } = useWriteContract();

  useEffect(() => {
    console.log("createJobData:", data);
    console.log("createJobError:", applyError);
    if (data !== undefined) {
      toast.success("Application submitted successfully!");
      redirect(`/jobs/${jobid}`);
    } else if (applyError !== null) {
      toast.error("Error submitting application!");
    }
  }, [data, applyError]);

  const applyFun = async (cid) => {
    try {
      createJobWriteContract({
        abi,
        address: JOBS_CONTRACT_ADDRESS,
        functionName: "applyForJob",
        args: [jobid, cid],
      });
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const handleSubmission = async () => {
    try {
      const applicationData = {
        email: application.email,
        whyWantToJoin: application.whyWantToJoin,
        coverLetterLink: application.coverLetterLink,
        anyQuestions: application.anyQuestions,
        applicationStatus: "Pending",
      };

      const applicationDataJSON = JSON.stringify(applicationData);

      const formData = new FormData();
      formData.append(
        "file",
        new Blob([applicationDataJSON], { type: "application/json" })
      );

      const metadata = JSON.stringify({
        name: "application Data",
        keyvalues: {
          email: application.email,
          jobid: jobid,
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
      console.log("Application IPFS CID:", resData.IpfsHash);

      return resData.IpfsHash;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <div className="lg:w-[65%] md:w-[80%] w-[85%] flex flex-col align-middle my-3 h-full min-h-screen p-t-20 ">
      <div className="w-full h-full  flex flex-col justify-center align-middle mt-8 mb-6 ">
        <div className="flex justify-between w-full">
          <div className="">
            <div className="text-white text-3xl font-bold">
              Apply for Your Next Opportunity!
            </div>
            <div className=" text-[#cbcbcb]">
              <p className="text-md text-gray-300  mt-4">
                Our application process is straightforward and designed to bring
                out the best in you. We value creativity, dedication, and the
                unique perspectives that each candidate brings.
              </p>
            </div>
          </div>
        </div>
        <>
          <div className="flex md:flex-row flex-col">
            <input
              onChange={(e) =>
                setApplication({ ...application, email: e.target.value })
              }
              type="email"
              className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 mt-4 mb-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email address:"
            />
          </div>

          <div className="flex md:flex-row flex-col">
            <input
              onChange={(e) =>
                setApplication({
                  ...application,
                  coverLetterLink: e.target.value,
                })
              }
              type="text"
              className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 mt-4 mb-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide a public link to your cover letter."
            />
          </div>

          <div className="flex md:flex-row flex-col">
            <textarea
              onChange={(e) =>
                setApplication({
                  ...application,
                  whyWantToJoin: e.target.value,
                })
              }
              className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 mt-4 mb-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              rows="5"
              placeholder="Why do you want to get this job?"
            ></textarea>
          </div>

          <div className="flex md:flex-row flex-col">
            <textarea
              onChange={(e) =>
                setApplication({
                  ...application,
                  anyQuestions: e.target.value,
                })
              }
              className="appearance-none block w-full bg-[#34374D] text-white rounded-xl py-4 px-4 mt-4 mb-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Do you have any questions for us? Feel free to ask!"
            ></textarea>
          </div>

          {/* <!-- Submit Button --> */}
          <div className="w-[30%] mb-4">
            <div className="space-y-6 py-4 bottom-0 flex flex-col">
              <button
                className="bg-[#7501E9] py-3 w-[90%] text-white border-none rounded-xl"
                onClick={async () => {
                  try {
                    let cid = await handleSubmission();

                    await applyFun(cid);
                  } catch (error) {
                    console.error("Error during submission:", error);
                  }
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Page;
