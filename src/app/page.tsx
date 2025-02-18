"use client";
import React, { useState } from "react";
import DarkModeSwitch from "./components/DarkModeSwitch";
import { CiShare1 } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function Home() {
  const [sharingCode, setSharingCode] = useState("");
  const route = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    route.push(window.location.origin + `/${sharingCode}`);
  };
  return (
    <div className="min-h-screen dark:bg-gray-900 flex items-center justify-center flex-col">
      <div className="absolute top-6 right-6">
        <DarkModeSwitch />
      </div>
      <h1 className="text-7xl/snug font-bold  ">
        Quick, Secure & No-Hassle Text Sharing
      </h1>
      <p className="text-2xl/snug max-w-screen-lg mt-4">
        Share text instantly. No sign-ups, no clutter just paste, share, and go.
        Fast, secure, and accessible from any device. Set expiration and share
        with a single click.
      </p>
      <h2>{sharingCode}</h2>
      <div className="mt-8 flex items-center justify-around gap-4">
        <button
          onClick={() => route.push("/home")}
          className="bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600 flex items-center gap-2 text-xl font-semibold "
        >
          <CiShare1 /> Get Started
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Sharing Code"
            value={sharingCode}
            onChange={(e) => setSharingCode(e.target.value)}
            className="p-2 pl-7  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
        </form>
      </div>
    </div>
  );
}
