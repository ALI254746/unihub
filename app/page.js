// app/page.js
"use client";

import Navbar from "./components/navbar";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CoustomLink from "./components/LoadingOverlay";
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useGSAP(() => {
    gsap.fromTo(
      ".box",
      { rotation: 0, opacity: 0.1 },
      {
        rotation: 360,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.05,
        delay: 0.1,
      }
    );
    // Har bir box'ga alohida scrollTrigger
    gsap.utils.toArray(".box").forEach((box) => {
      gsap.fromTo(
        box,
        { rotation: 0 },
        {
          rotation: 360,
          opacity: 1,
          scrollTrigger: {
            trigger: box,
            start: "top 80px", // ilgari "80%", endi tezroq boshlanadi
            end: "bottom 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // section.boxes qismiga umumiy scrollTrigger
    gsap.to(".box", {
      rotation: 360,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".section.boxes",
        start: "top top+=80",
        end: "+=470%",
        scrub: 1.5,
        pin: true,
        markers: false,
      },
    });
  });

  return (
    <main className="pt-20 bg-gray-50 min-h-screen p-6">
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-sm shadow">
        <Navbar />
      </nav>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎓 UniHub Talabalar Platformasi
        </h1>

        <section className="section boxes grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="box">
              <CoustomLink
                href={card.href}
                className={`block p-6 rounded-2xl shadow border 
              ${card.bgColor} ${card.borderColor} ${card.hoverBgColor}
              bg-white/1 backdrop-blur-sm transition duration-300`}
              >
                <h2 className={`text-xl font-semibold ${card.titleColor}`}>
                  {card.title}
                </h2>
                <p className="text-sm text-gray-700 mt-2">{card.desc}</p>
              </CoustomLink>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

const cards = [
  {
    title: "📢 Elonlar",
    desc: "Universitetdagi so‘nggi yangilik va e'lonlar bilan tanishing",
    href: "/elonlar",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
    hoverBgColor: "hover:bg-blue-200",
    titleColor: "text-blue-800",
  },
  {
    title: "📚 Talabalar Resurs Markazi",
    desc: "Kurslar bo‘yicha materiallar va darsliklar",
    href: "/darsresurslari",
    bgColor: "bg-green-100",
    borderColor: "border-green-200",
    hoverBgColor: "hover:bg-green-200",
    titleColor: "text-green-800",
  },
  {
    title: "🗓️ Joy band qilish",
    desc: "Kutubxona, sport zali yoki o‘quv xonani onlayn bron qiling",
    href: "/booking",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
    hoverBgColor: "hover:bg-blue-200",
    titleColor: "text-blue-800",
  },
  {
    title: "🙋‍♂️ Profilim",
    desc: "Shaxsiy ma’lumotlaringiz va statistika",
    href: "/profile",
    bgColor: "",
    borderColor: "border-yellow-200",
    hoverBgColor: "hover:bg-yellow-200",
    titleColor: "text-yellow-800",
  },
  {
    title: "💬 Chat",
    desc: "Random suhbatlar orqali boshqa talabalar bilan muloqot qiling",
    href: "/chat",
    bgColor: "bg-pink-100",
    borderColor: "border-pink-200",
    hoverBgColor: "hover:bg-pink-200",
    titleColor: "text-pink-800",
  },
  {
    title: "🎯 Talabalar klublari",
    desc: "Dasturchilar, dizaynerlar va boshqa klublarga a’zo bo‘ling",
    href: "/talabalarkulubi",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-200",
    hoverBgColor: "hover:bg-purple-200",
    titleColor: "text-purple-800",
  },

  {
    title: "🚨 Muammolar",
    desc: "Talabalar duch kelayotgan muammolarni muhokama qiling",
    href: "/muammolar",
    bgColor: "bg-red-100",
    borderColor: "border-red-200",
    hoverBgColor: "hover:bg-red-200",
    titleColor: "text-red-800",
  },
  {
    title: "👨‍🏫 Ustozlar reytingi",
    desc: "Ustozlar haqida fikr bildiring va reyting bering",
    href: "/ustozreyting",
    bgColor: "bg-indigo-100",
    borderColor: "border-indigo-200",
    hoverBgColor: "hover:bg-indigo-200",
    titleColor: "text-indigo-800",
  },
  {
    title: "👨‍🏫 Xodimlar",
    desc: "Xodimlar haqida fikr bildiring va reyting bering",
    href: "/staff",
    bgColor: "bg-indigo-100",
    borderColor: "border-indigo-200",
    hoverBgColor: "hover:bg-indigo-200",
    titleColor: "text-indigo-800",
  },
];
