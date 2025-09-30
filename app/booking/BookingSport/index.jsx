import { useState } from "react";
import {
  FaBuilding,
  FaChevronDown,
  FaBasketballBall,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaCalendarCheck,
} from "react-icons/fa";
import { FaUser, FaUsers, FaPhone, FaTimes } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";

import { FaPlus } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
const bookedSlots = [
  {
    time: "08:00 - 09:00",
    name: "Ali Mamatov",
    group: "221-20",
    phone: "+998 90 123 45 67",
  },
  {
    time: "09:30 - 10:30",
    name: "Dilshod Rahimov",
    group: "319-21",
    phone: "+998 93 456 78 90",
  },
  {
    time: "11:00 - 12:00",
    name: "Sevara Karimova",
    group: "415-22",
    phone: "+998 99 765 43 21",
  },
  {
    time: "13:30 - 14:30",
    name: "Bekzod Tursunov",
    group: "118-19",
    phone: "+998 97 234 56 78",
  },
  {
    time: "15:00 - 16:00",
    name: "Malika Azizova",
    group: "220-20",
    phone: "+998 94 876 54 32",
  },
];
const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const startHour = 8 + i;
  const endHour = startHour + 1;
  return `${startHour.toString().padStart(2, "0")}:00 - ${endHour
    .toString()
    .padStart(2, "0")}:00`;
});

export default function BookingFormResponsive() {
  const [form, setForm] = useState({
    hall: "",
    sport: "",
    date: "",
    time: "",
    people: "",
    status: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (slot) => {
    setForm({ ...form, time: slot });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking data:", form);
  };

  const renderSelect = (id, label, icon, options) => (
    <div className="mb-4 w-full">
      <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <div className="relative">
        <select
          name={id}
          value={form[id]}
          onChange={handleChange}
          className="block w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        >
          {options.map(({ value, label }, idx) => (
            <option key={idx} value={value} disabled={value === ""}>
              {label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <FaChevronDown className="text-xs" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-[70vh] rounded-2xl shadow-md font-sans p-4 md:p-8">
      <form className="text-black" onSubmit={handleSubmit}>
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {renderSelect(
            "hall",
            "Hall Selection",
            <FaBuilding className="text-blue-600" />,
            [
              { value: "", label: "Select a hall" },
              { value: "hall1", label: "Main Sports Hall" },
              { value: "hall2", label: "Indoor Court" },
              { value: "hall3", label: "Olympic Hall" },
              { value: "hall4", label: "Training Center" },
            ]
          )}

          {renderSelect(
            "sport",
            "Sport Type",
            <FaBasketballBall className="text-blue-600" />,
            [
              { value: "", label: "Select a sport" },
              { value: "basketball", label: "Basketball" },
              { value: "volleyball", label: "Volleyball" },
              { value: "tennis", label: "Tennis" },
              { value: "badminton", label: "Badminton" },
              { value: "soccer", label: "Indoor Soccer" },
            ]
          )}

          {/* Date */}
          <div className="mb-4 w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaCalendarAlt className="text-blue-600" />
              <span className="ml-2">Date</span>
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="block w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Number of People */}
          {renderSelect(
            "people",
            "Number of People",
            <FaUsers className="text-blue-600" />,
            [
              { value: "", label: "Select number of people" },
              { value: "1", label: "1 person" },
              { value: "2", label: "2 people" },
              { value: "3-5", label: "3-5 people" },
              { value: "6-10", label: "6-10 people" },
              { value: "10+", label: "More than 10 people" },
            ]
          )}

          {/* Status */}
          {renderSelect(
            "status",
            "Status",
            <FaTag className="text-blue-600" />,
            [
              { value: "", label: "Select status" },
              { value: "public", label: "Public (Others can join)" },
              { value: "private", label: "Private (Invitation only)" },
              { value: "team", label: "Team Practice" },
            ]
          )}
        </div>

        {/* Time Slot Full Width */}
        <div className="mb-4 mt-2">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FaClock className="text-blue-600" />
            <span className="ml-2">Time Slot</span>
          </label>
          <div className="overflow-x-auto pb-2">
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => handleTimeSelect(slot)}
                  className={`${
                    form.time === slot
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } text-xs py-2 px-3 rounded-md shadow-sm transition`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out"
        >
          <FaCalendarCheck className="mr-2 inline" /> Book Now
        </button>
        <div className="fixed bottom-6 right-6 z-20">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
          >
            <FaCalendarTimes className="text-xl" />
          </button>
        </div>
      </form>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0  bg-black/30 backdrop-blur-sm flex justify-center items-center z-30">
          <div className="bg-white/30 backdrop-blur-md  rounded-2xl  shadow-xl w-[90%] max-w-md max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg text-blue-400 flex items-center">
                <FaCalendarDays className="text-blue-600 mr-2" />
                Already Booked Time Slots
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[60vh] p-4">
              {bookedSlots.map((slot, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-blue-700">
                      {slot.time}
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded-lg">
                      Join
                    </button>
                  </div>
                  <div className="text-sm text-gray-700 mb-1 flex items-center">
                    <FaUser className="mr-2 text-gray-500" /> {slot.name}
                  </div>
                  <div className="text-sm text-gray-700 mb-1 flex items-center">
                    <FaUsers className="mr-2 text-gray-500" /> Group:{" "}
                    {slot.group}
                  </div>
                  <div className="text-sm text-gray-700 flex items-center">
                    <FaPhone className="mr-2 text-gray-500" /> {slot.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
