'use client'
import Image from "next/image";
import { useState } from 'react';
import StreamDeck from "./components/StreamDeck.jsx";

export default function Home() {
  return (
    <div className="bg-black flex flex-col min-h-screen items-center justify-center">
      <main className="mx-auto w-auto my-auto">
        <StreamDeck rows={3} cols={5} />
      </main>
    </div>
  );
}
