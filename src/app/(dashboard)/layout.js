"use client";
import { useState, useEffect } from "react";
import "./dashboard_layout.css";

import { Sidebar, RightSidebar, CreatePost } from "@/components";
import Link from "next/link";

import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../constants";
import abi from "../contract/abi.json";

export default function UserInfoLayout({ children }) {
  const { address } = useAccount();
  const [isAccount, setIsAccount] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isClicked, setClicked] = useState(false);
  const [isSidebar, setSidebar] = useState(false);
  const [userProfile, setUserProfile] = useState({
    owner: "",
    name: "",
    username: "",
    bio: "",
    image_cid: "",
    banner_cid: "",
    profile_id: "",
    following: [],
    followers: [],
  });

  // To check if the account has a profile
  const { data: isAccountData, error: isAccountError } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "doesAccountExist",
    args: [address],
  });

  useEffect(() => {
    if (isAccountData !== undefined) {
      setLoading(false);
      if (isAccountData == true) {
        setIsAccount(true);
        console.log("Account exist");
      } else {
        setIsAccount(false);
        console.log("Account does not exist");
      }
    }
  }, [isAccountData, isAccountError, address]);

  const { data: profileResource, error: isError } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getUserProfileByAddress",
    args: [address],
  });

  useEffect(() => {
    if (profileResource !== undefined) {
      console.log("ProfileResource:", profileResource);
      setUserProfile({
        owner: profileResource.userAddress,
        name: profileResource.name,
        username: profileResource.username,
        bio: profileResource.bio,
        image_cid: profileResource.imageCID,
        banner_cid: profileResource.bannerCID,
        profile_id: profileResource.userNumber,
        following: profileResource.following,
        followers: profileResource.followers,
      });
      setLoading(false);
    }
  }, [profileResource, isError]);

  useEffect(() => {
    if (address == undefined || address == "") {
      setLoading(false);
    }
  }, [address]);

  return (
    <>
      <div>
        {userProfile.owner == "" ? (
          <>
            {isLoading == true ? (
              <div className="flex jus justify-center h-[100vh] width-[100vw] align-middle ">
                <h1 className=" m-auto p-6 text-center colwhite">Loading...</h1>
              </div>
            ) : (
              <>
                <div className="flex jus flex-col  justify-center h-[100vh] width-[100vw] align-middle ">
                  <div className="flex jus flex-col  justify-center align-middle ">
                    <h3 className=" m-auto p-6 text-center">
                      Create an account or log in to continue to Wizz.
                    </h3>
                    <Link
                      className="bg-[#7501E9] py-3 w-48 text-center text text-white border-none m-auto rounded-xl "
                      href="/"
                    >
                      Register | Login
                    </Link>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div
            className={`w-full h-full flex bg-[#14161b] lg:justify-between pt-4 md:pt-0  min-h-screen ${
              isClicked == 1 || isClicked == 2 ? "bg-[#212121]  opacity-80" : ""
            }`}
          >
            {!isSidebar ? (
              <div className="md:hidden absolute left-4 top-4 ">
                <button onClick={() => setSidebar(true)}>
                  <svg
                    width="26"
                    height="22"
                    viewBox="0 0 26 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.625 0H25.375V2.75H0.625V0ZM0.625 9.625H17.125V12.375H0.625V9.625ZM0.625 19.25H25.375V22H0.625V19.25Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            ) : null}

            <div className="lg:w-[24%] md:w-[35%] hidden  md:block bg-[#14161b] ">
              <Sidebar setClicked={setClicked} userProfile={userProfile} />
            </div>
            <div className="lg:w-[55%] md:w-[65%] w-full  h-full flex flex-col  items-center  align-middle bg-[#14161b]">
              {isClicked == 1 ? (
                <CreatePost setClicked={setClicked} userProfile={userProfile} />
              ) : null}

              {isSidebar ? (
                <div className=" block md:hidden w-full">
                  {" "}
                  <Sidebar
                    setClicked={setClicked}
                    setSidebar={setSidebar}
                    isSidebar={isSidebar}
                    userProfile={userProfile}
                  />{" "}
                </div>
              ) : null}
              {children}
              </div>

            <div className="w-[30%] lg:flex hidden bg-[#14161b] mr-4 0">
              <div className="fixed w-[30%] right-2">
                <RightSidebar userProfile={userProfile} />
              </div>{" "}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
