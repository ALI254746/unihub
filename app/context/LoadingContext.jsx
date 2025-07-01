"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 700); // sahifa o‘tgach 700ms kutib loadingni o‘chir
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg">
          <p className="text-white text-xl animate-pulse">⏳ Yuklanmoqda...</p>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
