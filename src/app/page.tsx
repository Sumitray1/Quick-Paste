"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import DarkModeSwitch from "./components/DarkModeSwitch";

export default function Home() {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [isSender, setIsSender] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // if (!mounted) return null; // Avoid hydration mismatch
  useEffect(() => {
    const storedId = localStorage.getItem("quicktext_id");
    if (storedId) {
      setId(storedId);
      setIsSender(true);
    } else {
      fetch("/api/generateId")
        .then((res) => res.json())
        .then((data) => {
          setId(data.id);
          localStorage.setItem("quicktext_id", data.id);
          setIsSender(true);
        });
    }
  }, []);

  const handleSubmit = async () => {
    if (!id) return;

    localStorage.setItem("quicktext_id", id);

    const res = await fetch(`/api/saveText?id=${id}`, {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.success) {
      setLink(window.location.origin + `/${id}`);
    }
  };

  const handleNewText = () => {
    localStorage.removeItem("quicktext_id");
    setId(null);
    setText("");
    setLink("");
  };

  return (
    <>
      <div className="min-h-screen dark:bg-gray-900 flex items-center justify-center">
        <div className="absolute top-6 right-6">
          <DarkModeSwitch />
        </div>
        <div className="dark:bg-gray-800  p-8 rounded-lg shadow-md w-full max-w-[80%] ">
          <div className="flex items-center justify-between  mb-4">
            <h1 className="text-2xl font-bold">Quick Paste</h1>
            {link && (
              <h2 className="font-normal text-xl">
                Sharing Code - <span className="font-bold">{id}</span>
              </h2>
            )}
          </div>
          <div className="flex items-end flex-col">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border dark:bg-gray-800  border-gray-300 rounded-lg mb-4 min-h-[60vh]"
              placeholder="Enter your text or code here..."
            />

            <div className="flex gap-4 mt-3">
              {link === "" ? (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Share Now
                </button>
              ) : (
                <a href={link} target="_blank">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600">
                    Visit
                  </button>
                </a>
              )}
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-slate-600"
                onClick={handleNewText}
              >
                New Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
