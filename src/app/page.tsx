"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-400 rounded-full filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-white">
        {/* Header & Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center filter blur-md opacity-70">
              <Image
                src="/next.svg"
                alt="Next.js logo blurred"
                width={180}
                height={37}
                priority
                className="dark:invert"
              />
            </div>
            <Image
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={37}
              priority
              className="relative dark:invert"
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-2xl mb-12 text-center">
          <h1 className="mb-6 text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Present<span className="text-white">AI</span>
            </span>
          </h1>
          <p className="mb-2 text-3xl font-light text-white">
            <span className="bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent">
              Brilliant presentations
            </span>{" "}
            in seconds
          </p>
          <p className="max-w-md mx-auto mb-8 text-lg text-gray-300">
            Transform your ideas into captivating stories with our AI-powered
            presentation builder.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="px-4 py-1 text-sm bg-gradient-to-r from-pink-500 to-amber-400 rounded-full text-gray-900 font-medium">
              Smart Templates
            </span>
            <span className="px-4 py-1 text-sm bg-white/10 backdrop-blur-md rounded-full border border-pink-500/30">
              AI Content Generation
            </span>
            <span className="px-4 py-1 text-sm bg-white/10 backdrop-blur-md rounded-full border border-amber-400/30">
              One-Click Design
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className="relative transition-transform duration-300 hover:scale-105"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-amber-400 rounded-lg blur ${
              isHovering ? "opacity-70" : "opacity-50"
            } transition-opacity duration-300`}
          ></div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/sign-in")}
            className="relative px-8 py-6 text-lg font-medium text-white transition-colors border-2 border-pink-500/30 hover:bg-pink-800/40 bg-gray-900/80 backdrop-blur-sm"
          >
            Get Started Now →
          </Button>
        </div>

        {/* Dashboard shortcut for logged-in users */}
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="text-gray-300 hover:text-white hover:bg-gray-800/40"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-20 -left-20 w-64 h-64 border border-pink-500/20 rounded-full"></div>
      <div className="absolute top-20 -right-10 w-32 h-32 border border-amber-400/20 rounded-full"></div>

      {/* Footer Section */}
      <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-4 text-sm text-gray-400">
        <div className="flex items-center space-x-1">
          Powered by
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 underline hover:text-pink-400"
          >
            Next.js
          </a>
          <span className="mx-1">and</span>
          <span className="bg-gradient-to-r from-pink-500 to-amber-400 bg-clip-text text-transparent font-medium">
            and built with 💙
          </span>
        </div>
      </footer>
    </div>
  );
}
