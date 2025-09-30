import React from "react";
import Link from "next/link";
const clubs = [
  {
    name: "Debate Society",
    description: "Engaged in weekly debates and public speaking events.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNAS0xYd1UybWOegNYvju0BweEVwLUy3JMnWbxJmycbBFsrV1YS3z1vCT1jv3P9qY032NK95BDjdgSu01SiGQV9_OaT0yWEpjEBopmpuwEU7mvzHjBaxuPfeZ26GIBqtPZlaIUeFkSDM3sXD1HZnS_b5rdTi_VmZuY0MBY6a1jc0ffFj9jjs1BHPP9SUuKYaXFDexDbf89Mavr-cQdqX5NOzfEWWRYpM4-5rPw2MUqXU1MitWow1vWBc3klytmgoFhAexbwigTvBoK",
  },
  {
    name: "Student Government",
    description: "Organizing campus-wide events and volunteering.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm97pJDsV3qhxCM_yBFH6z_lHCUDUSL1N84FAD-PX79_G_u3mWzCuofrRHmtwg0dsF7k_Jw4jwafG1UQRTOJFkIhnpk_xJmT4QzjRuuq3qHQVewOUUwaysgIaQQGZVYyLfDXcRfBBS9A8qq1jpEJKc27JAndwzexsLsPtfwrWEdfiuodYMSM_umCrWANr3bzCH0Y0Prmf6hKvadR3jmQzDCEuUHuMM0smYXEGG7FUSujj1VP_TPPleOwdAqB8NSgMmXHOV1KW1MG4f",
  },
  {
    name: "Tech Innovators Club",
    description: "Exploring innovative tech solutions and projects.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmI-Rdz2W0jRpXrHjQAuQhfEuFHoOSWf7JdUJrp1Jv4yZLaTmHh2ufyyYr2iGENRKen-sowO-NeMz_p-euJ53zMlXzaaxqcIlCqwSXNzgDNxh1choK2TPZhOkAHKYtHNe3YBJukPR2G5kB-RBJyXexaamLNAmHPB4iQ8QFuTZV6pfWxDrj2_AorpuEBhnAadHE-gtitvUm9iffT8jerrtGHITH94ovmoHwDXu1tZdHIGZqEIISozxROc5jgxEV9i3f_jEMu97hBGiL",
  },
  {
    name: "Green Initiative",
    description: "Promoting environmental awareness and sustainability.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC20gNtYuOHh9JMxwhE1mMRpLHrAI-_FI2YLWRr63THv6K7W3iOpRs4ju0DMAvY3xL4KQEqDpYIqCnkK4qUQ9w4icTwzoO2R9rWXeHMZpNQgbHD2ACpSb0B-K8uru8FZINmFtw0j1dGMJFzlGzMvIOBds9bfJ9rCnPkM7Lfsp4YDhZFrLurjWRy70APCUlgZ3Py2OzsDyV6udy8JXIr8nQGy6JDzcJgfDG_i5Q8EAp4lWMb_ghWCFdvMSHG9yUOfiqpI5r1ZEtSurpp",
  },
  {
    name: "Cultural Exchange Group",
    description: "Celebrating diverse cultures through events and discussions.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCs5vgf7pt8o9f_62YFIVAy8tir5GnUjYwhh24vJ79S1eRMHcyzyGT_o1mn3VxZQniAXahcIse8yX7rPGr5erxz2HXDKGO_TbN7XzrHNXH1Q0hyM4ICt-NJwv5iOqqVOv3dgTzNPEATRAVHLdzMHWOEVCghEy7r1Xbs7OApwdHJZnnyy1BBIeokro1nQizZLw0V3ejd89E-2RDPdUdwS3QVbxSQgvYtbRJY9l2YD11pRKsVt55PaSteyFFhoi36wANksavIAlaNjQy-",
  },
];

const Clubs = () => {
  return (
    <div className="relative  flex-col bg-[#111d22] justify-between overflow-x-hidden font-['Lexend','Noto_Sans',sans-serif]">
      {/* Header */}
      <div className="flex items-center bg-[#111d22] p-4 pb-2 justify-between">
        <div className="text-white flex size-12 shrink-0 ">
          <Link href={"/profile"}>
            {" "}
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
        <h2 className="text-white text-lg font-bold text-center flex-1 pr-12 tracking-[-0.015em]">
          Clubs
        </h2>
      </div>

      {/* Clubs List */}
      <div className="px-4">
        {clubs.map((club, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-[#111d22] py-2 max-h-screen"
          >
            <div
              className="bg-center bg-no-repeat bg-cover rounded-lg size-14 aspect-square"
              style={{ backgroundImage: `url(${club.image})` }}
            />
            <div className="flex flex-col justify-center">
              <p className="text-white text-base font-medium line-clamp-1">
                {club.name}
              </p>
              <p className="text-[#92b8c9] text-sm font-normal line-clamp-2">
                {club.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
