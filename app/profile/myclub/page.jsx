"use client";

import { useState, useEffect } from "react";
import {
  FaPlus,
  FaPenToSquare,
  FaTrash,
  FaClock,
  FaDownload,
  FaXmark,
  FaCloudArrowUp,
} from "react-icons/fa6";
import Image from "next/image";

// AssignmentsTab - asosiy komponent
export default function AssignmentsTab({}) {
  const [assignments, setAssignments] = useState([]); // Topshiriqlar state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal ochiq/yorug
  const [selectedFile, setSelectedFile] = useState(null); // Tanlangan fayl
  const [clubId, setClubId] = useState(null);
  // URL dan clubId oladi
  // 1️⃣ Assignments API dan olish
  useEffect(() => {
    console.log("📡 useEffect start");
    const fetchClubId = async () => {
      console.log("🚀 fetchClubId chaqirildi");
      try {
        const res = await fetch("/api/myclubs", { credentials: "include" });
        console.log("📥 Javob status:", res.status);
        const data = await res.json();
        console.log("🔍 /api/myclubs dan kelgan data:", data);
        if (data?.clubs?.length) {
          setClubId(data.clubs[0]._id);
        }
      } catch (err) {
        console.error("❌ Xatolik:", err);
      }
    };
    fetchClubId();
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch("/api/tasks"); // sizning API endpoint
        const data = await res.json();
        if (res.ok) setAssignments(data.tasks || []);
      } catch (err) {
        console.error("Assignments fetch error:", err);
      }
    };
    fetchAssignments();
  }, []);

  // 2️⃣ Fayl tanlanganda state ga saqlash
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // 3️⃣ Form submit - task yaratish va fayl yuklash
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clubId) {
      console.error("❌ clubId hali yuklanmadi, task yaratilmadi!");
      alert("Klub ma'lumotlari yuklanmadi, biroz kuting.");
      return;
    }
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const deadline = form.deadline.value;
    console.log("📦 Yuborilayotgan clubId:", clubId);

    try {
      // 3a️⃣ Task yaratish
      const resTask = await fetch(`/api/clubEnviroment/clubTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, deadline, clubId }),
      });

      const dataTask = await resTask.json();
      if (!resTask.ok) throw new Error(dataTask.error || "Task yaratilmadi");

      const taskId = dataTask.task._id;
      let fileUrl = null;

      // 3b️⃣ Fayl yuklash (agar tanlangan bo'lsa)
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("firstName", "Alina"); // dinamik foydalanuvchi ma'lumotlari kerak
        formData.append("lastName", "Karimova");

        const resUpload = await fetch(
          `/api/clubEnviroment/clubTask/${taskId}/upload`,
          { method: "POST", body: formData }
        );

        const dataUpload = await resUpload.json();
        if (!resUpload.ok)
          throw new Error(dataUpload.error || "Fayl yuklanmadi");

        fileUrl = dataUpload.fileUrl; // fayl URL serverdan
      }

      alert("Topshiriq muvaffaqiyatli yaratildi!");
      setIsModalOpen(false);
      setSelectedFile(null);

      // 3c️⃣ Yangi taskni state ga qo‘shish
      setAssignments((prev) => [
        ...prev,
        { ...dataTask.task, uploadedFiles: fileUrl ? [{ fileUrl }] : [] },
      ]);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Xatolik yuz berdi: " + err.message);
    }
  };

  return (
    <section className="">
      {/* Topshiriqlar header */}
      <div className="flex  justify-between items-center mb-4 ">
        <h2 className="font-semibold text-gray-800">Topshiriqlar</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
        >
          <FaPlus className="mr-2" />
          Yangi topshiriq qo'shish
        </button>
      </div>

      {/* Assignments list */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            {/* Task info */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">
                  {assignment.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {assignment.description}
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <FaClock className="mr-1" />
                  <span>Deadline: {assignment.deadline}</span>
                </div>
              </div>
              <div className="flex">
                <button className="text-blue-600 p-2">
                  <FaPenToSquare />
                </button>
                <button className="text-red-500 p-2">
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Submitted files */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Topshirilgan ishlar ({assignment.uploadedFiles?.length || 0})
              </p>
              <div className="space-y-2">
                {assignment.uploadedFiles?.map((sub, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <div className="flex items-center">
                      <Image
                        src={sub.avatar || "/default-avatar.png"}
                        alt={sub.firstName + " " + sub.lastName}
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                      <div>
                        <p className="text-sm text-black font-medium">
                          {sub.firstName} {sub.lastName}
                        </p>
                        <span className="text-sm text-blue-600 cursor-pointer">
                          {sub.fileUrl?.split("/").pop()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <button className="text-blue-600 p-1 text-md">
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Yangi task yaratish */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex items-center justify-center">
          <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl w-[90%] max-w-md max-h-[80vh] overflow-hidden">
            <div className="py-4 px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-lg font-bold">Yangi topshiriq</p>
                <button onClick={() => setIsModalOpen(false)}>
                  <FaXmark className="text-gray-500 text-2xl hover:text-gray-800" />
                </button>
              </div>

              <form className="mt-2" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-extrabold mb-2">
                    Sarlavha
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Topshiriq sarlavhasi"
                    className="w-full font-extrabold border-2 border-gray-200 rounded-md py-3 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block font-extrabold text-gray-700 text-sm mb-2">
                    Tavsif
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    placeholder="Topshiriq haqida batafsil ma'lumot"
                    className="w-full font-extrabold border-2 border-gray-100 rounded-md py-3 px-4 text-gray-700 focus:outline-none focus:border-primary-500"
                  ></textarea>
                </div>

                {/* Deadline */}
                <div className="mb-4">
                  <label className="block font-extrabold text-gray-700 text-sm mb-2">
                    Tugash muddati
                  </label>
                  <input
                    type="datetime-local"
                    name="deadline"
                    className="w-full border-2 border-gray-200 rounded-md py-3 px-4 text-gray-700 focus:outline-none focus:border-primary-500"
                  />
                </div>

                {/* File Upload */}
                <div className="mb-4">
                  <label className="block font-extrabold text-gray-700 text-sm mb-2">
                    Faylni yuklash
                  </label>
                  <div className="border-3 border-dashed border-gray-200 rounded-md p-4 text-center">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      accept=".pdf,.doc,.docx,.zip"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <FaCloudArrowUp className="text-3xl text-gray-400 mb-2" />
                      <span className="text-sm font-extrabold text-gray-500">
                        PDF, DOC yoki ZIP fayllarni yuklang
                      </span>
                      <span className="mt-2 text-xs text-blue-600">
                        Fayl tanlash
                      </span>
                    </label>
                    {/* Tanlangan fayl nomini ko‘rsatish */}
                    {selectedFile && (
                      <p className="mt-2 text-sm text-gray-700 font-medium">
                        Tanlangan fayl: {selectedFile.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedFile(null);
                    }}
                    className="px-4 py-2 font-bold rounded-md text-gray-600 mr-2"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
