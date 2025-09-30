import React from "react";
import Link from "next/link";
const FriendList = () => {
  const friends = [
    {
      name: "Dr. Anya Sharma",
      title: "Professor, Computer Science",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD2ZkIY5MPX8jXuFyVcoJHBSVou3c_l1AVuRWm8XgZ219dfBHdo_Zqk0HAKXGrSCoxVNoh5qxlrrsDVvQmjVjiXxrai4_LX-trP2vhG8AYCyMcTlyWZt-WFXjWwlsAOus9qlbjPNfYnMd-JhCSFO4cmvF0LUHjSD1wdNLU8xroZPtCChnY8NvrYGdqXZ09QeOZxgLg5XIxmHoOKP78Uzbe2AIbUs-cY78z1Y-o94D9xnsxSFxR2twIgKlgI44mIun8IN42vXYfFEa0o",
    },
    // boshqa dostlar...
  ];
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#151b1e] justify-between overflow-x-hidden"
      style={{ fontFamily: "Lexend, 'Noto Sans', sans-serif" }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center bg-[#151b1e] p-4 pb-2 justify-between">
          <div className="text-white flex size-12 shrink-0 items-center">
            {/* Back Arrow Icon */}
            <Link href={"/profile"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
              </svg>
            </Link>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight flex-1 text-center pr-12">
            Friends
          </h2>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex items-stretch rounded-xl h-full bg-[#2b3940]">
              <div className="text-[#9eb3bd] flex items-center pl-4">
                {/* Search Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                placeholder="Search friends"
                className="form-input w-full bg-[#2b3940] text-white px-4 border-none outline-none rounded-r-xl placeholder:text-[#9eb3bd]"
              />
            </div>
          </label>
        </div>

        {/* Friend List */}
        <div className="px-4">
          {friends?.map((friend, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-[#151b1e] py-2"
            >
              <div
                className="aspect-square bg-cover bg-center rounded-full h-14 w-14"
                style={{ backgroundImage: `url(${friend.image})` }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-white text-base font-medium">
                  {friend.name}
                </p>
                <p className="text-[#9eb3bd] text-sm">{friend.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-5 bg-[#151b1e]"></div>
    </div>
  );
};

export default FriendList;
