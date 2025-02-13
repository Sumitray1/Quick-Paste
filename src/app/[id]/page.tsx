"use client";
import { useEffect, useState, use } from "react";
import { FaCopy } from "react-icons/fa";

export default function TextPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [text, setText] = useState<string | null>(null);
  const [isSender, setIsSender] = useState(false);
  const [prevText, setPrevText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/getText?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPrevText(data.text);
        setText(data.text || "Text not found");
        setIsSender(localStorage.getItem("quicktext_id") === id);
      });
  }, [id]);

  const handleEdit = async () => {
    if (!id || !text) return;

    await fetch(`/api/saveText?id=${id}`, {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });

    setPrevText(text); // Update previous text after saving
    setIsSaved(true); // Change button text to "Changes Saved"
    setTimeout(() => setIsSaved(false), 2000); // Reset after 2s
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text!);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[80%]">
        <h1 className="text-2xl font-bold mb-4">Quick Paste</h1>
        <div className="flex items-end flex-col relative">
          <textarea
            value={text || ""}
            disabled={!isSender}
            onChange={(e) => {
              setText(e.target.value);
              setIsSaved(false); // Reset saved state when user types
            }}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 min-h-[60vh]"
            placeholder="Enter your text or code here..."
          />
          <button
            onClick={handleCopy}
            className="px-2 py-1 rounded border border-gray-400 absolute top-2 right-2 z-10"
          >
            <p className="flex items-center gap-1">
              <FaCopy /> {isCopied ? "Copied!" : "Copy"}
            </p>
          </button>
          <div className="flex gap-4 mt-3">
            {isSender && (
              <button
                className={`mt-4 text-white px-4 py-2 rounded ${
                  prevText === text
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500"
                }`}
                onClick={handleEdit}
                disabled={prevText === text}
              >
                {isSaved ? "Changes Saved" : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
