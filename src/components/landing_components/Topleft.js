import React from "react";


const Topleft = () => {
  return (
    <>
    <div className="w-full flex flex-col justify-center align-middle">
       <div className="lg:p-36 p-10  pr-0 lg:w-[50%] ">
      <div className="flex items-center  space-x-3">
        <div className="flex">
          <img
            className=" border-2 rounded-full h-12 w-12"
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            alt=""
          />{" "}
          <img
            className=" border-2 rounded-full h-12 w-12 -mx-4"
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            alt=""
          />{" "}
          <img
            className=" border-2 rounded-full h-12 w-12"
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </div>
        <div>
          <div className="text-[#FFB774]">4.1 stars</div>
          <div className="text-[#AAAAAA] text-xs">by 1000+ users</div>
        </div>
        
      </div>
      <div style={{ fontFamily: 'Accelerator, sans-serif' }} className="font-black text-[50px] py-2 font-accelerator text-white">
        Showcase connect and grow your career
      </div>
      <div className="lg:flex lg:flex-row lg:space-x-6 lg:space-y-0 flex flex-col space-y-3">
        <div className="flex border-l space-x-2">
          <div className="">
            <img
              className="h-16 w-16 rounded-full "
              src="https://www.chainalysis.com/wp-content/uploads/2022/08/shutterstock-2176242673-scaled-1-1500x970.jpg"
              alt=""
            />
          </div>
          <div className="text-white">
            <div className="text-xl">Chinlink</div>
            <div>Vc funding round</div>
          </div>
        </div>
        <div className="flex border-l space-x-2">
          <div className="">
            <img
              className="h-16 w-16 rounded-full "
              src="https://www.chainalysis.com/wp-content/uploads/2022/08/shutterstock-2176242673-scaled-1-1500x970.jpg"
              alt=""
            />
          </div>
          <div className="text-white">
            <div className="text-xl">Chinlink</div>
            <div>Vc funding round</div>
          </div>
        </div>
      </div>
      </div>
      <div className='lg:hidden  animate-[bounce_8s_ease-out_infinite]  h-[80%] w-[85%] right-12 top-36'>
        <img className="md:w-[70%]" src="https://github.com/SingupalliKartik/wiz/blob/main/src/components/landing_components/Group%2010.png?raw=true" alt="" />
 

    </div>
    </div>
   
    </>
  );
};

export default Topleft;
