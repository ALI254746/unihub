import Link from "next/link";

const clubsData = {
  dasturchilar: {
    name: "Dasturchilar Klubi",
    leader: "Shahzod Mamatqulov",
    members: [
      {
        name: "Ali Karimov",
        course: "3-kurs",
        gpa: 3.8,
        interests: ["React", "TypeScript"],
      },
      {
        name: "Zarina Qodirova",
        course: "2-kurs",
        gpa: 3.9,
        interests: ["Node.js", "Design"],
      },
      {
        name: "Javohir Oripov",
        course: "4-kurs",
        gpa: 3.6,
        interests: ["GraphQL", "Next.js"],
      },
    ],
    description: "Frontend, backend va mobil dasturlashni o‘rganamiz.",
    badge: true,
  },
  robototexnika: {
    name: "Robototexnika Klubi",
    leader: "Dilrabo Umarova",
    members: [
      {
        name: "Aziz Akramov",
        course: "1-kurs",
        gpa: 3.9,
        interests: ["Arduino", "IoT"],
      },
    ],
    description: "Arduino, IoT va avtomatlashtirish ishlari.",
    badge: false,
  },
  "suniy-intellekt": {
    name: "Sun'iy Intellekt Klubi",
    leader: "Sardor Usmonov",
    members: [
      {
        name: "Madina G‘aniyeva",
        course: "4-kurs",
        gpa: 4.0,
        interests: ["AI", "ML", "Python"],
      },
    ],
    description: "AI va ML bo‘yicha loyihalar va seminarlar.",
    badge: true,
  },
};

export default function ClubDetailsPage({ params }) {
  const clubId = params.clubId;
  const club = clubsData[clubId];

  if (!club) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600 font-bold">
        Klub topilmadi.
      </main>
    );
  }

  const { name, leader, members, description, badge } = club;

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow border border-yellow-200">
        <div className="mb-4">
          <Link
            href="/clubs"
            className="text-sm text-yellow-700 hover:underline"
          >
            ← Klublar sahifasiga qaytish
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-yellow-800 mb-2">
          {name}{" "}
          {badge && (
            <span className="ml-2 px-2 py-1 text-xs bg-yellow-500 text-white rounded">
              Verified
            </span>
          )}
        </h1>
        <p className="text-gray-700 mb-4">{description}</p>
        <p className="text-sm text-gray-500 mb-4">
          👤 Klub yetakchisi: {leader}
        </p>

        <h2 className="text-xl font-semibold text-yellow-700 mb-2">
          👥 A’zolar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((m, idx) => (
            <div
              key={idx}
              className="border border-yellow-100 bg-yellow-50 rounded-xl p-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">{m.name}</h3>
              <p className="text-sm text-gray-600">
                📚 {m.course} · GPA: {m.gpa}
              </p>
              <p className="text-sm text-gray-600">
                🎯 Qiziqishlar: {m.interests.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
