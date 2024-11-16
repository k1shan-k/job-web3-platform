import Link from "next/link";
import React from "react";

const CreateJob = () => {
  return (
    <div className="space-y-6 py-4 bottom-0 flex flex-col ">
      {/* <button className="py-2 w-[89%]  text text-[#eedeff] border-[#8106fb] border-2   font-medium rounded-xl text-lg">
        Post Work
        </button> */}
      <Link href="/jobs/create">
        <button className="bg-[#ffffffdd] py-2  w-[89%] text-md  font-medium text-[#7501E9] border-none  rounded-xl">
          Post Work
        </button>
      </Link>
    </div>
  );
};

export default CreateJob;
