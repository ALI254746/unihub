"use client";

import { useRouter } from "next/navigation";
import { useLoading } from "../context/LoadingContext"; // 👈

export default function CustomLink({ href, children, className = "" }) {
  const router = useRouter();
  const { setLoading } = useLoading(); // 👈

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true); // 👈 loader chiqadi
    router.push(href); // sahifani o‘zgartiramiz
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
