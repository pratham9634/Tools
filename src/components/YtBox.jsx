'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Loading from './Loading'

const YtBox = () => {
    const [error, setError] = useState(null);
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState(null);
    const [videoCount, setVideoCount] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(link)
        setError(null);

  if (!link.trim()) {
    setError('Please paste a YouTube playlist URL.');
    return;  // Stop the form submit here
  }
        setLoading(true);
        setDuration(null);

        const res = await fetch('/api/get-duration', {
            method: 'POST',
            body: JSON.stringify({ url:link }),
            headers: { 'Content-Type': 'application/json' },
          }); 
        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            setDuration(data.formattedDuration);
            setVideoCount(data.videoCount);
          } else {
            setError(data.error || 'Something went wrong!');
          }
    }

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex w-full max-w-md items-center space-x-2 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg">
        <Input
          placeholder="Paste YouTube playlist URL"
          className="flex-1 bg-white/80 text-black placeholder:text-gray-700 rounded-2xl focus:ring-8 focus:ring-amber-500"
          onChange={(e) => setLink(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-white text-purple-700 hover:bg-purple-100 font-semibold rounded-lg"
        >
           Get Duration
        </Button>
      </div>
      </form>
      {loading && (
        <div className="mt-4 text-center text-white">
          <Loading/>
        </div>
      )}
      {duration && (
  <div className="mt-6 flex justify-center animate-fadeInUp">
    <div className="px-6 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-lg border border-white/20">
    <p className="text-lg font-semibold tracking-wide mb-1">
        🎬 Total Videos: <span className="text-yellow-300">{videoCount}</span>
      </p>
      <p className="text-lg font-semibold tracking-wide">
        ⏱ Total Duration: <span className="text-yellow-400">{duration}</span>
      </p>
    </div>
  </div>
)}
{error && (
  <div className="mt-4 text-red-100 bg-red-500/30 p-3 rounded-xl text-center">
    ❌ {error}
  </div>
)}



    </div>
  )
}

export default YtBox
