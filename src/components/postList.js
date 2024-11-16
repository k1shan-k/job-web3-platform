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

const PostList = ({userProfile}) => {
  const [allPosts, setAllPosts] = useState();
  const pathname = usePathname().split("/");

  const { data: Posts, error: isError } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getAllPosts",
    args: [],
  });

  useEffect(() => {
    if (Posts !== undefined) {
        console.log(pathname)
        console.log("Posts:", Posts);
        if (pathname[1] == "followingfeeds") {
            setAllPosts(Posts.filter((item) => userProfile.following.includes(item.creatorUsername)));
            console.log("Posts:", Posts.filter((item) => userProfile.following.includes(item.creatorUsername)));
        }
        else if (pathname[1] == "profile") {

            if(pathname[3] && pathname[3] == "work") {
                console.log("condition 1 run")
                setAllPosts(Posts.filter((item) => item.category == "work" && item.creatorUsername == userProfile.username));
            } else if(pathname[3] && pathname[3] == "certificates") {
                console.log("condition 2 run")
                setAllPosts(Posts.filter((item) => item.category == "certificatation" && item.creatorUsername == userProfile.username));
            } else {
                console.log("condition 3 run")
                setAllPosts(Posts.filter((item) => item.creatorUsername == userProfile.username).reverse());
            }
        }
        else {
            console.log("condition 4 run")
            setAllPosts(Posts);
        }
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

          <div className="text-white w-full mt-6 text-center font-semibold">No Post Yet</div>
        )}
      </div>
    </>
  );
};

export default PostList;
