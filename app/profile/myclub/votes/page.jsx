"use client";
import { useState } from "react";
import {
  FaChartSimple,
  FaChartPie,
  FaTrash,
  FaClock,
  FaXmark,
  FaPlus,
} from "react-icons/fa6";

export default function VoteTab() {
  const [showModal, setShowModal] = useState(false);
  const [polls, setPolls] = useState([
    {
      id: 1,
      title: "Next Event Topic",
      description: "What should be the focus of our next club event?",
      deadline: "28-Jul-2023",
      totalVotes: 24,
      options: [
        { text: "Web Development Workshop", votes: 12 },
        { text: "AI and Machine Learning", votes: 8 },
        { text: "Game Development", votes: 4 },
      ],
    },
    {
      id: 2,
      title: "Meeting Schedule",
      description: "When should we schedule our weekly meetings?",
      deadline: "30-Jul-2023",
      totalVotes: 18,
      options: [
        { text: "Tuesday, 5:00 PM", votes: 7 },
        { text: "Wednesday, 4:00 PM", votes: 6 },
        { text: "Friday, 3:00 PM", votes: 5 },
      ],
    },
  ]);

  const [newPoll, setNewPoll] = useState({
    title: "",
    description: "",
    deadline: "",
    options: ["", ""],
  });

  const addOption = () => {
    setNewPoll({ ...newPoll, options: [...newPoll.options, ""] });
  };

  const handleOptionChange = (index, value) => {
    const updated = [...newPoll.options];
    updated[index] = value;
    setNewPoll({ ...newPoll, options: updated });
  };

  const handleAddPoll = (e) => {
    e.preventDefault();
    const newId = polls.length + 1;
    const newPollObj = {
      id: newId,
      title: newPoll.title,
      description: newPoll.description,
      deadline: new Date(newPoll.deadline).toLocaleDateString("en-GB"),
      totalVotes: 0,
      options: newPoll.options.map((opt) => ({ text: opt, votes: 0 })),
    };
    setPolls([newPollObj, ...polls]);
    setNewPoll({ title: "", description: "", deadline: "", options: ["", ""] });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setPolls(polls.filter((poll) => poll.id !== id));
  };

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">So'rovlar</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
        >
          <FaChartSimple className="mr-2" /> Yangi so'rov
        </button>
      </div>

      <div className="space-y-4">
        {polls.map((poll) => (
          <div key={poll.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{poll.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{poll.description}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <FaClock className="mr-1" /> Tugash vaqti: {poll.deadline}
                </div>
              </div>
              <div className="flex">
                <button className="text-primary-600 p-2">
                  <FaChartPie />
                </button>
                <button
                  onClick={() => handleDelete(poll.id)}
                  className="text-red-500 p-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Jami ovozlar:</span>
                <span className="font-medium text-black">
                  {poll.totalVotes}
                </span>
              </div>
              <div className="mt-2 space-y-2 text-black">
                {poll.options.map((opt, idx) => {
                  const percent =
                    poll.totalVotes > 0
                      ? (opt.votes / poll.totalVotes) * 100
                      : 0;
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{opt.text}</span>
                        <span className="text-sm font-medium">{opt.votes}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex backdrop-blur-sm items-center justify-center z-50 bg-black/10 bg-opacity-50">
          <div className=" w-11/12 backdrop-blur-sm  bg-black/10 bg-opacity-50 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-[90vh]">
            <div className="py-4 px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-lg font-bold">Yangi so'rov</p>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 text-2xl hover:text-gray-800"
                >
                  <FaXmark />
                </button>
              </div>

              <form onSubmit={handleAddPoll} className="mt-2">
                <div className="mb-4">
                  <label className="block text-md font-bold text-gray-700 mb-2 ">
                    Savol
                  </label>
                  <input
                    type="text"
                    className="border-2 border-gray-200 text-black font-extrabold rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    placeholder="So'rov savoli"
                    value={newPoll.title}
                    onChange={(e) =>
                      setNewPoll({ ...newPoll, title: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block  text-md font-bold text-gray-700 mb-2">
                    Variantlar
                  </label>
                  {newPoll.options.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="mb-2 text-black font-extrabold border-2 border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                      placeholder={`Variant ${idx + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={addOption}
                    className="mt-2 text-blue-600 font-bold text-sm flex items-center"
                  >
                    <FaPlus className="mr-1" /> Variant qo'shish
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    Tugash muddati
                  </label>
                  <input
                    type="datetime-local"
                    className="border-2 border-gray-200 rounded-md w-full py-2 px-3"
                    value={newPoll.deadline}
                    onChange={(e) =>
                      setNewPoll({ ...newPoll, deadline: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 font-extrabold text-gray-600 mr-2"
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
