"use client";
import { useState } from "react";
import {
  FaLightbulb,
  FaTrash,
  FaHeart,
  FaRegHeart,
  FaClock,
  FaXmark,
} from "react-icons/fa6";
import Image from "next/image";

export default function Ideas() {
  const [showModal, setShowModal] = useState(false);
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: "Tech Hackathon",
      description:
        "Let's organize a 48-hour hackathon focused on solving local community problems using technology. We can invite students from all departments.",
      author: "Bobur Asadov",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      time: "2 soat oldin",
      liked: true,
    },
    {
      id: 2,
      title: "Guest Speaker Series",
      description:
        "We should invite professionals from the industry to give talks about their experience and career paths. This would help students understand real-world applications.",
      author: "Sabina Rahimova",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      time: "Kecha, 15:30",
      liked: false,
    },
    {
      id: 3,
      title: "Workshop Series",
      description:
        "Let's organize a series of practical workshops on different technologies like AI, Web Development, and Mobile App Development. Senior students can lead these workshops.",
      author: "Dilshod Toshmatov",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      time: "2 kun oldin",
      liked: true,
    },
  ]);

  const [newIdea, setNewIdea] = useState({ title: "", description: "" });

  const handleAddIdea = (e) => {
    e.preventDefault();
    if (!newIdea.title || !newIdea.description) return;
    const idea = {
      id: ideas.length + 1,
      title: newIdea.title,
      description: newIdea.description,
      author: "Siz",
      avatar: "https://placehold.co/40x40", // Foydalanuvchi rasmi yo'q bo'lsa
      time: "Hozirgina",
      liked: false,
    };
    setIdeas([idea, ...ideas]);
    setNewIdea({ title: "", description: "" });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setIdeas(ideas.filter((idea) => idea.id !== id));
  };

  const toggleLike = (id) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, liked: !idea.liked } : idea
      )
    );
  };

  return (
    <section className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">G&apos;oyalar</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
        >
          <FaLightbulb className="mr-2" />
          Yangi g&apos;oya
        </button>
      </div>

      <div className="space-y-4">
        {ideas.map((idea) => (
          <div key={idea.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">{idea.title}</h3>
              <div className="flex">
                <button
                  onClick={() => handleDelete(idea.id)}
                  className="text-red-500 p-1"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => toggleLike(idea.id)}
                  className="p-1 ml-2"
                >
                  {idea.liked ? (
                    <FaHeart className="text-blue-600" />
                  ) : (
                    <FaRegHeart className="text-red-500" />
                  )}
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{idea.description}</p>
            <div className="flex items-center mt-3 text-xs text-gray-500">
              <Image
                src={idea.avatar}
                alt="Author"
                width={20}
                height={20}
                className="rounded-full mr-1"
              />
              <span>{idea.author}</span>
              <span className="mx-2">•</span>
              <FaClock className="mr-1" />
              <span>{idea.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 bg-opacity-10 flex items-center justify-center">
          <div className="bg-white/30 backdrop-blur-sm   shadow-xl w-[90%] max-w-md max-h-[80vh] overflow-hidden  md:max-w-md mx-auto rounded  z-50 overflow-y-auto">
            <div className="py-4 px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-lg font-bold">Yangi g&apos;oya</p>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <FaXmark />
                </button>
              </div>

              <form onSubmit={handleAddIdea} className="mt-2">
                <div className="mb-4">
                  <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    Sarlavha
                  </label>
                  <input
                    type="text"
                    className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={newIdea.title}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, title: e.target.value })
                    }
                    placeholder="G'oya sarlavhasi"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    Tavsif
                  </label>
                  <textarea
                    rows="4"
                    className="font-extrabold border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={newIdea.description}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, description: e.target.value })
                    }
                    placeholder="G'oya haqida batafsil ma'lumot"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 font-bold text-gray-600 mr-2"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 font-bold bg-blue-600 text-white rounded-md"
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
