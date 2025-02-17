import React from "react";
import DarkModeSwitch from "../components/DarkModeSwitch";

export default function Home() {
  return (
    <div className="min-h-screen dark:bg-gray-900 flex items-center justify-center flex-col">
      <div className="absolute top-6 right-6">
        <DarkModeSwitch />
      </div>
      <h1 className="text-7xl/snug font-bold  max-w-screen-lg">
        Quick, Secure & No-Hassle Text Sharing
      </h1>
      <p className="text-2xl/snug max-w-screen-lg mt-4">
        Share text instantly. No sign-ups, no clutter just paste, share, and go.
        Fast, secure, and accessible from any device. Set expiration and share
        with a single click.
      </p>
    </div>
  );
}
