"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PostCard } from "@/components";
import { CONTRACT_ADDRESS } from "../../../../constants";
import { useReadContract } from "wagmi";
import abi from "../../../../../app/contract/abi.json";
import Link from "next/link";

const ProfileWork = () => {
  const { username } = useParams();
  const [allPosts, setAllPosts] = useState();

  const { data: Posts, error: isError } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getAllPosts",
    args: [],
  });

  useEffect(() => {
    if (Posts !== undefined) {
      console.log("Posts:", Posts);
      setAllPosts(
        Posts.filter((item) => item.category == "Work Experience" && item.creatorUsername == username).reverse()
      );
    }
  }, [Posts, isError]);

  return (
    
      <div className="flex flex-col space-y-7">
        {allPosts && Object.keys(allPosts).length > 0 ? (
          allPosts.map((item, index) => (
            <div key={index}>
              <PostCard item={item} />
            </div>
          ))
        ) : (
          <div className="text-white w-full mt-6 text-center font-semibold">No Work Experience Post Yet</div>
        )}
      </div>
  );
};

export default ProfileWork;
