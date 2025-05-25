import React from "react";

import Link from "next/link";
const page = () => {
  return (
    <div className="w-full pt-40 lg:pt-10 min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center justify-center px-4 py-10">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
      🚀 Developer Toolbox
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
      <Link href="/youTubePlaylistDuration">
        <div className="bg-white/10  hover:border rounded-2xl p-8 h-52 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl backdrop-blur-sm cursor-pointer flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-white mb-2">🎵 YouTube Playlist Duration</h2>
          <p className="text-white/80 text-center">
            Calculate total duration of any YouTube playlist in one click.
          </p>
        </div>
      </Link>

      <Link href="/quickShare">
        <div className="bg-white/10 hover:border rounded-2xl p-8 h-52 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl backdrop-blur-sm cursor-pointer flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-white mb-2">⚡ QuickShare</h2>
          <p className="text-white/80 text-center">
            Instantly share files or text that auto-delete after a few minutes.
          </p>
        </div>
      </Link>
    </div>

    {/* More tools coming soon section */}
    <div className="mt-16 text-center">
      <h3 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
        🌟 More Stunning Tools Coming Soon...
      </h3>
      <p className="text-gray-300 mt-2">Stay tuned for exciting developer utilities 🚧</p>
    </div>
  </div>
  );
};

export default page;
