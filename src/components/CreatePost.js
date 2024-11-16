"use client";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CONTRACT_ADDRESS, NEXT_PUBLIC_GATEWAY_URL, PINATA_JWT } from "../app/constants";
import { useWriteContract } from "wagmi";
import abi from "../app/contract/abi.json";

const CreatePost = ({ setClicked, userProfile }) => {
  const { data, error, isPending, writeContract: post } = useWriteContract();

  const [content, setContent] = useState("");
  const [type, setType] = useState("Genral Post");

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  function changeHandler(e) {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
  }

  const handleSubmission = async () => {
    try {
      if (
        selectedFile &&
        selectedFile !== "undefined" &&
        selectedFile !== "null" &&
        selectedFile !== "" &&
        selectedFile !== null
      ) {
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
      } else {
        return "null";
      }
    } catch (error) {
      console.log(error);
      return "null";
    }
  };

  const createPostFun = async (cid) => {
    post({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "createPost",
      args: [content, cid, true, type],
    });
  };

  useEffect(() => {
    console.log("createPostData:", data);
    console.log("createPostError:", error);
    if (data !== undefined) {
      toast.success("Post created successfully");
      setClicked(null);
    }
  }, [data, error]);

  return (
    <div className="w-[65%] flex flex-col align-middle my-3 h-full  ">
      <div className="fixed bottom-0 bg-black rounded-t-3xl w-[33%] p-6 z-40">
        <div className="flex flex-row-reverse items-end">
          <button
            onClick={() => {
              setClicked(null);
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.6588 1.98696C17.7669 1.87901 17.8526 1.75083 17.9112 1.60974C17.9697 1.46864 17.9999 1.3174 18 1.16465C18.0001 1.01189 17.9701 0.860613 17.9117 0.719449C17.8534 0.578285 17.7678 0.45 17.6598 0.341919C17.5519 0.233838 17.4237 0.148077 17.2826 0.0895332C17.1415 0.0309894 16.9903 0.000808877 16.8375 0.000714989C16.6847 0.000621101 16.5335 0.0306156 16.3923 0.088986C16.2511 0.147356 16.1228 0.232959 16.0148 0.340908L8.99985 7.35583L1.98696 0.340908C1.76868 0.122628 1.47263 -2.29995e-09 1.16393 0C0.855238 2.29995e-09 0.559187 0.122628 0.340908 0.340908C0.122628 0.559187 2.29995e-09 0.855238 0 1.16393C-2.29995e-09 1.47263 0.122628 1.76868 0.340908 1.98696L7.35582 8.99985L0.340908 16.0127C0.232827 16.1208 0.147092 16.2491 0.0885989 16.3904C0.0301058 16.5316 0 16.6829 0 16.8358C0 16.9886 0.0301058 17.14 0.0885989 17.2812C0.147092 17.4224 0.232827 17.5507 0.340908 17.6588C0.559187 17.8771 0.855238 17.9997 1.16393 17.9997C1.31678 17.9997 1.46813 17.9696 1.60935 17.9111C1.75056 17.8526 1.87888 17.7669 1.98696 17.6588L8.99985 10.6439L16.0148 17.6588C16.233 17.8768 16.529 17.9992 16.8375 17.999C17.146 17.9988 17.4418 17.8761 17.6598 17.6578C17.8778 17.4395 18.0002 17.1436 18 16.8351C17.9998 16.5266 17.8771 16.2308 17.6588 16.0127L10.6439 8.99985L17.6588 1.98696Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-3 p-4 ">
          <div className="  flex space-x-4 align-middle justify-between ">
            <div className="flex space-x-4 align-middle">
              <div className="">
                <img
                  className="rounded-full h-14 w-14"
                  src={`${NEXT_PUBLIC_GATEWAY_URL}/ipfs/${userProfile.image_cid}`}
                  alt=""
                />
              </div>
              <div className="flex flex-col text-white justify-center">
                <div className="text-lg font-medium text-[#F3F3F3] text-opacity-90">
                  {userProfile.name}
                </div>
                <div className="text-sm text-[#D9D9D9] font-light">
                  @{userProfile.username}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <button
                onClick={async () => {
                  try {
                    const cid = await handleSubmission();
                    console.log("CID:", cid);

                    await createPostFun(cid);
                  } catch (error) {
                    console.log(error);
                    toast.error("Error creating post");
                  }
                }}
                className="bg-[#7501E9] py-2 px-7 w-full text-sm text-white border-none rounded-xl font-semibold"
              >
                Post
              </button>
            </div>
          </div>
          <div className="">
            <select
              onChange={(e) => setType(e.target.value)}
              className="appearance-none block w-full bg-[#1f212d] text-white rounded-xl py-4 px-4 my-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option
                className="text-[#c3c3c3] pt-4 pb-4"
                disabled
                selected
                value="Genral Post"
              >
                Select Type of Opportunity
              </option>
              <option className="text-white pt-10 pb-10" value="Genral Post">
                Genral Post
              </option>
              <option
                className="text-white pt-10 pb-10"
                value="Work Experience"
              >
                Work Experience
              </option>
              <option className="text-white pt-10 pb-10" value="Achievement">
                Achievement
              </option>
              <option className="text-white pt-10 pb-10" value="Project">
                Project
              </option>
              <option className="text-white pt-10 pb-10" value="Certification">
                Certification
              </option>
            </select>
          </div>
          <div>
            <textarea
              name=""
              id=""
              placeholder="Add your Caption"
              className="p-3 rounded-xl bg-[#1F212D] w-full h-28 text-white"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div></div>
          <div>
            <div className="flex px-2">
              <input
                type="file"
                accept="image/*"
                onChange={changeHandler}
                id="file"
                className="hidden"
              />

              <label for="file">
                <div className="flex space-x-2 text-white mr-3 align-middle">
                  <div className="flex align-middle justify-center flex-col">
                    <svg
                      width="22"
                      height="20"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 3.06389C0 1.5668 1.21719 0.349609 2.71429 0.349609H19C20.4971 0.349609 21.7143 1.5668 21.7143 3.06389V16.6353C21.7143 18.1324 20.4971 19.3496 19 19.3496H2.71429C1.21719 19.3496 0 18.1324 0 16.6353V3.06389ZM13.7326 7.58064C13.5417 7.30073 13.2279 7.13532 12.8929 7.13532C12.5578 7.13532 12.2397 7.30073 12.0531 7.58064L8.36339 12.9922L7.23951 11.5884C7.04442 11.3467 6.75179 11.2068 6.44643 11.2068C6.14107 11.2068 5.8442 11.3467 5.65335 11.5884L2.93906 14.9813C2.69308 15.2867 2.64643 15.7065 2.81607 16.0585C2.98571 16.4105 3.34196 16.6353 3.73214 16.6353H17.9821C18.3596 16.6353 18.7074 16.4275 18.8812 16.0925C19.0551 15.7574 19.0339 15.3545 18.8219 15.0449L13.7326 7.58064ZM4.75 7.13532C5.2899 7.13532 5.8077 6.92085 6.18947 6.53908C6.57124 6.15731 6.78571 5.63951 6.78571 5.09961C6.78571 4.5597 6.57124 4.04191 6.18947 3.66014C5.8077 3.27837 5.2899 3.06389 4.75 3.06389C4.21009 3.06389 3.6923 3.27837 3.31053 3.66014C2.92876 4.04191 2.71429 4.5597 2.71429 5.09961C2.71429 5.63951 2.92876 6.15731 3.31053 6.53908C3.6923 6.92085 4.21009 7.13532 4.75 7.13532Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </label>
              <button
              // onClick={() => setClicked(2)}
              >
                <div className="flex space-x-2 text-white mr-3 align-middle ">
                  <div className="flex align-middle justify-center flex-col ">
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.19215 0.952148C4.18882 0.952148 0.144531 5.02358 0.144531 9.99977C0.144531 12.3993 1.09776 14.7006 2.79452 16.3974C3.63467 17.2375 4.63207 17.904 5.72978 18.3587C6.82748 18.8134 8.004 19.0474 9.19215 19.0474C11.5917 19.0474 13.893 18.0942 15.5898 16.3974C17.2865 14.7006 18.2398 12.3993 18.2398 9.99977C18.2398 8.81162 18.0057 7.6351 17.5511 6.53739C17.0964 5.43969 16.4299 4.44228 15.5898 3.60213C14.7496 2.76199 13.7522 2.09554 12.6545 1.64086C11.5568 1.18617 10.3803 0.952148 9.19215 0.952148ZM12.3588 6.38072C12.7188 6.38072 13.0639 6.5237 13.3185 6.77822C13.573 7.03273 13.716 7.37793 13.716 7.73786C13.716 8.0978 13.573 8.44299 13.3185 8.69751C13.0639 8.95202 12.7188 9.09501 12.3588 9.09501C11.9989 9.09501 11.6537 8.95202 11.3992 8.69751C11.1447 8.44299 11.0017 8.0978 11.0017 7.73786C11.0017 7.37793 11.1447 7.03273 11.3992 6.77822C11.6537 6.5237 11.9989 6.38072 12.3588 6.38072ZM6.02548 6.38072C6.38542 6.38072 6.73062 6.5237 6.98513 6.77822C7.23964 7.03273 7.38263 7.37793 7.38263 7.73786C7.38263 8.0978 7.23964 8.44299 6.98513 8.69751C6.73062 8.95202 6.38542 9.09501 6.02548 9.09501C5.66555 9.09501 5.32035 8.95202 5.06584 8.69751C4.81132 8.44299 4.66834 8.0978 4.66834 7.73786C4.66834 7.37793 4.81132 7.03273 5.06584 6.77822C5.32035 6.5237 5.66555 6.38072 6.02548 6.38072ZM9.19215 14.976C7.08406 14.976 5.29263 13.655 4.56882 11.8093H13.8155C13.0826 13.655 11.3002 14.976 9.19215 14.976Z"
                        fill="#999999"
                      />
                    </svg>
                  </div>
                </div>
              </button>
              <button>
                <div className="flex space-x-2 text-white mr-3 align-middle">
                  <div className="flex align-middle justify-center flex-col">
                    <svg
                      width="25"
                      height="11"
                      viewBox="0 0 25 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0729 0.174805H14.6579V10.5149H12.0729V0.174805ZM9.48787 0.174805H0.871094V10.5149H9.48787V5.34487H6.90284V7.92991H3.45613V2.75984H9.48787V0.174805ZM24.9981 2.75984V0.174805H17.243V10.5149H19.828V7.06823H23.2747V4.48319H19.828V2.75984H24.9981Z"
                        fill="#999999"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div>
            <div className=" w-full min-h-44 createpostwrapperimg">
              {/* {imageCID && imageCID.length > 0 && imageCID !== "undefined" && imageCID !== "null" && imageCID !== "" && imageCID !==  null ? */}
              {/* <img
                   className="w-full rounded-2xl"
                   src={`${NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageCID}`}
                   alt=""
                 /> */}
              {preview &&
              preview.length > 0 &&
              preview !== "undefined" &&
              preview !== "null" &&
              preview !== "" &&
              preview !== null ? (
                <img
                  className="w-full rounded-2xl"
                  src={preview}
                  alt="hellow"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
