'use client'
import Image from "next/image";
import { useState } from 'react';
import StreamDeck from "./components/StreamDeck.jsx";

export default function Home() {
  return (
    <div className="bg-black">
      <main className="min-h-screen mx-auto w-auto my-auto">
        <StreamDeck rows={3} cols={4} />
      </main>
    </div>
  );
}
