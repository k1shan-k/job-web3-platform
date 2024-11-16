"use client";
// import { BlueCreateWalletButton } from "./smartWalletButton";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { CONTRACT_ADDRESS, PINATA_JWT } from "./constants";
import abi from "./contract/abi.json";

export default function Home() {
  const { address } = useAccount();
  const [isAccount, setIsAccount] = useState();

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [newUser, setNewUser] = useState({
    username: "",
    fullname: "",
    bio: "",
    imagecid: "",
    bannercid: "",
  });

  const { data: isAccountData, error: isAccountError } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "doesAccountExist",
    args: [address],
  });

  useEffect(() => {
    if (isAccountData !== undefined) {
      console.log("isAccountData:", isAccountData);
      if (isAccountData == true) {
        redirect("/feeds");
      } else {
        setIsAccount(false);
        console.log("Account does not exist");
      }
    }
  }, [isAccountData, isAccountError, address]);

  const {
    data: createUserData,
    error: createUserError,
    isPending: createUserIsPending,
    writeContract: createUserWriteContract,
  } = useWriteContract();

  const createUser = async (cid) => {
    try {
      console.log("createUser function called");

      createUserWriteContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "createUser",
        args: [newUser.username, newUser.fullname, newUser.bio, cid, "null"],
      });

      console.log("createUser function called 2");
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  useEffect(() => {
    console.log("createUserData:", createUserData);
    console.log("createUserError:", createUserError);
    if (createUserData !== undefined) {
      toast.success("User created successfully");
      if (window !== "undefined") {
        location.reload();
      }
    } else if (createUserError !== null) {
      toast.error("Error creating user");
    }
  }, [createUserData, createUserError]);

  function changeHandler(e) {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
  }

  const handleSubmission = async () => {
    try {
      console.log(selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: "File name",
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
      console.log("image response", resData.IpfsHash);
      return resData.IpfsHash;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      <div className="flex jus justify-center h-[100vh] width-[100vw] align-middle  lg:hidden">
        <h1 className=" m-auto p-6 text-center">
          Currently, Wizz UI works only with large screen devices.
        </h1>
      </div>
      <div className="hidden  h-[80%] sm:hidden md:hidden lg:flex">
        <div className="w-full h-[100vh] flex-[0.7]  flex flex-col justify-center  align-middle p-32">
          <div className="flex justify-between w-full ">
            <div className="m-4">
              <div className="text-white text-3xl font-bold">
                Create your account | Login
              </div>
              <div className="text-white">get started with wizz</div>
            </div>
            <div>
              <div className="w-48">
                <div className="space-y-6  py-4 bottom-0 flex flex-col ">
                  {/* <BlueCreateWalletButton /> */}
                  <ConnectButton />
                </div>
              </div>
            </div>
          </div>
          {address && isAccount == false ? (
            <>
              <div className="flex md:flex-row flex-col">
                <input
                  type="text"
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullname: e.target.value })
                  }
                  className="appearance-none block w-full bg-[#34374D]  text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Display Name"
                />
                <input
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  type="text"
                  className="appearance-none block w-full bg-[#34374D]  text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                />
              </div>
              <div className="flex">
                <input
                  onChange={(e) =>
                    setNewUser({ ...newUser, bio: e.target.value })
                  }
                  className="appearance-none block w-full bg-[#34374D]  text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write a crazy bio"
                />
              </div>
              <div className="flex md:flex-row flex-col">
                <input
                  type="file"
                  onChange={changeHandler}
                  className="appearance-none block w-full bg-[#34374D]  text-white rounded-xl py-4 px-4 m-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Choose Profile Image"
                />
              </div>
              <div className="w-[30%] m-4">
                <div className="space-y-6 py-4 bottom-0 flex flex-col ">
                  <button
                    onClick={async () => {
                      try {
                        const cid = await handleSubmission();
                        console.log("CID", cid);
                        await createUser(cid);
                      } catch (error) {
                        console.error("Error during submission:", error);
                      }
                    }}
                    className="bg-[#7501E9] py-3  w-[90%] text text-white border-none  rounded-xl"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex-[0.5] h-[100vh] ">
          <div className="  bg-[url(https://w0.peakpx.com/wallpaper/914/142/HD-wallpaper-cool-blue-purple-abstract-dark-glow-loveurhunny-pink.jpg)] top-[6rem] right-[16rem] flex flex-col justify-between h-[100vh] bg-cover pl-20">
            <div className="h-36 w-36 mt-60">
              {address &&
              preview &&
              preview !== null &&
              preview !== "" &&
              preview !== "null" &&
              preview !== undefined ? (
                <img
                  className="rounded-full h-36 w-36 object-cover"
                  src={preview}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="text-white pb-20">
              <div className="font-medium text-lg text-opacity-60">
                Welcome to
              </div>
              <div className="font-bold text-2xl text-opacity-90">Wizz</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
