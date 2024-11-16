import React, { useState, useEffect } from "react";
import JobCard from "./jobCard";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { JOBS_CONTRACT_ADDRESS, PINATA_JWT } from "../../app/constants";
import abi from "../../app/contract/jobsabi.json";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

const JobList = () => {
  const pathname = usePathname().split("/");
  const { username } = useParams();
  const [allJobs, setAllJobs] = useState();

  const { data, error } = useReadContract({
    abi,
    address: JOBS_CONTRACT_ADDRESS,
    functionName: "getAllJobs",
    args: [],
  });

  useEffect(() => {
    console.log("data:", data);
    console.log("error:", error);
    if (data !== undefined) {
      if (pathname[1] == "opportunities") {
        if (pathname[2] == "job") {
          setAllJobs(data.filter((item) => item.jobType == "Job").reverse());
        } else if (pathname[2] == "internship") {
          setAllJobs(
            data.filter((item) => item.jobType == "Internship").reverse()
          );
        } else if (pathname[2] == "freelancing") {
          setAllJobs(
            data.filter((item) => item.jobType == "Freelancing").reverse()
          );
        } else if (pathname[2] == "bounty") {
          setAllJobs(data.filter((item) => item.jobType == "Bounty").reverse());
        } else {
          setAllJobs(data.reverse());
        }
      } else if (pathname[2] == "opportunities") {
        setAllJobs(
          data.filter((item) => item.employerUsername == username).reverse()
        );
      } else if (pathname[2] == "applications") {
        setAllJobs(
          data.filter((item) => item.applicantsUsername.includes(username)).reverse()
        );
        console.log("test condition run")
        console.log(username)
        console.log(data)
        console.log("allJobs:", data.filter((item) => item.applicantsUsername.includes(username)).reverse());
      } else {
        setAllJobs(data.reverse());
      }
    }
  }, [data, error]);

  return (
    <div>
      {allJobs && Object.keys(allJobs).length > 0 ? (
        allJobs.map((item, index) => (
          <div key={index}>
            <JobCard item={item} />
          </div>
        ))
      ) : (
        <div className="text-white w-full mt-6 text-center font-semibold">
          No Job Post Yet
        </div>
      )}
    </div>
  );
};

export default JobList;
