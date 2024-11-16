import React from 'react'

const BottomBtn = ({setClicked}) => {
  return (
    <div className="space-y-6 py-4 bottom-0 flex flex-col ">
        {/* <button className="py-2 w-[89%]  text text-[#7501E9] border-[#7501E9] border-2   font-medium rounded-xl text-lg">
          Create Project
        </button> */}
        <button onClick={() => setClicked(1)} className="bg-[#7501E9] py-2  w-[89%] text-md  font-medium text-white border-none  rounded-xl">
          Create Post
        </button>
      </div>
  )
}

export default BottomBtn