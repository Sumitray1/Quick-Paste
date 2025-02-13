"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [isSender, setIsSender] = useState(false);

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

    localStorage.setItem("quicktext_id", id); // Save sender's ID

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[80%] ">
        <h1 className="text-2xl font-bold mb-4">Quick Paste</h1>
        <div className="flex items-end flex-col">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 min-h-[60vh]"
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
                  Visit Link
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
  );
}
