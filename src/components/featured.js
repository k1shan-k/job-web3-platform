"use client";
import React from "react";
import PostCard from "./postCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { CONTRACT_ADDRESS, NEXT_PUBLIC_GATEWAY_URL } from "../app/constants";
import { usePathname } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import abi from "../app/contract/abi.json";

const Featured = () => {
  const [allPosts, setAllPosts] = useState();
  // const pathname = usePathname().split("/");

  const { data: Posts, error: isError } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getAllPosts",
    args: [],
  });

  useEffect(() => {
    if (Posts !== undefined) {
      console.log("Posts:", Posts);
      setAllPosts(Posts.reverse());
    }
  }, [Posts, isError]);

  return (
    <>
      <div className="flex flex-col space-y-7">
        {allPosts && Object.keys(allPosts).length > 0 ? (
          allPosts.map((item, index) => (
            <div key={index}>
              <PostCard item={item} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Featured;
