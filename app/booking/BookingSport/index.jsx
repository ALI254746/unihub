import { useState } from "react";
import { FaChevronDown, FaCalendarCheck } from "react-icons/fa";

export default function BookingForm() {
  const [form, setForm] = useState({
    hall: "",
    sport: "",
    date: "",
    time: "",
    people: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking data:", form);
    // add your API POST logic here
  };

  return (
    <section className="p-4 bg-white rounded-lg shadow-sm mx-1 mt-1">
      <h2 className="text-lg text-black font-semibold mb-4">Make a Booking</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          {
            id: "hall",
            label: "Select Hall",
            options: [
              { value: "", text: "Choose a hall" },
              { value: "hall1", text: "Main Sports Hall" },
              { value: "hall2", text: "Basketball Court" },
              { value: "hall3", text: "Volleyball Court" },
              { value: "hall4", text: "Tennis Court" },
            ],
          },
          {
            id: "sport",
            label: "Sport Type",
            options: [
              { value: "", text: "Select sport" },
              { value: "basketball", text: "Basketball" },
              { value: "volleyball", text: "Volleyball" },
              { value: "tennis", text: "Tennis" },
              { value: "badminton", text: "Badminton" },
              { value: "football", text: "Indoor Football" },
            ],
          },
          {
            id: "time",
            label: "Time",
            options: [
              { value: "", text: "Select time slot" },
              ...[...Array(13).keys()].map((i) => {
                const hour = 8 + i;
                return {
                  value: `${hour.toString().padStart(2, "0")}:00`,
                  text: `${hour.toString().padStart(2, "0")}:00 - ${
                    hour + 1
                  }:00`,
                };
              }),
            ],
          },
          {
            id: "people",
            label: "Number of People",
            options: [
              { value: "", text: "Select number of people" },
              { value: "1", text: "1 person" },
              { value: "2", text: "2 people" },
              { value: "3-5", text: "3-5 people" },
              { value: "6-10", text: "6-10 people" },
              { value: "10+", text: "10+ people" },
            ],
          },
          {
            id: "status",
            label: "Status",
            options: [
              { value: "", text: "Select status" },
              { value: "confirmed", text: "Confirmed" },
              { value: "pending", text: "Pending" },
              { value: "requested", text: "Requested" },
            ],
          },
        ].map(({ id, label, options }) => (
          <div key={id} className="relative">
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
            <select
              id={id}
              value={form[id]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {options.map((o) => (
                <option key={o.value} value={o.value} disabled={o.value === ""}>
                  {o.text}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6">
              <FaChevronDown className="text-gray-400" />
            </div>
          </div>
        ))}

        {/* Date */}
        <div id="date-select">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
        >
          <FaCalendarCheck className="mr-2" /> Book Now
        </button>
      </form>
    </section>
  );
}
