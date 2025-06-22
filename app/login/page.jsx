"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Oddiy validatsiya
    if (!email || !password) {
      setError("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    // Bu yerda autentifikatsiya logikasini yozasan,
    // Masalan, API ga so'rov yuborish
    // Hozircha oddiy tekshiruv:
    if (email === "student@unihub.com" && password === "123456") {
      setError("");
      // Kirish muvaffaqiyatli bo‘lsa, bosh sahifaga yo‘naltirish
      router.push("/");
    } else {
      setError("Email yoki parol noto‘g‘ri");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>UniHub Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Emailingizni kiriting"
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              marginBottom: 12,
            }}
          />
        </label>
        <label>
          Parol:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolingizni kiriting"
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              marginBottom: 12,
            }}
          />
        </label>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
            fontSize: 16,
          }}
        >
          Kirish
        </button>
      </form>
    </div>
  );
}
