'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Loading from './Loading'

const YtBox = () => {
  const [error, setError] = useState(null)
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [duration, setDuration] = useState(null)
  const [videoCount, setVideoCount] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!link.trim()) {
      setError('Please paste a YouTube playlist URL.')
      return
    }

    setLoading(true)
    setDuration(null)

    const res = await fetch('/api/get-duration', {
      method: 'POST',
      body: JSON.stringify({ url: link }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setDuration(data.formattedDuration)
      setVideoCount(data.videoCount)
    } else {
      setError(data.error || 'Something went wrong!')
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 py-10">
      
    <form onSubmit={handleSubmit} className="w-full max-w-xl text-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
        🎵 YouTube Playlist Duration
      </h1>

      <div className="flex w-full items-center space-x-3 bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
        <Input
          placeholder="Paste YouTube playlist URL"
          className="flex-1 bg-gray-900/60 text-white placeholder:text-gray-400 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setLink(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200"
        >
          Get Duration
        </Button>
      </div>
    </form>

    {loading && (
      <div className="mt-8 text-center text-white">
        <Loading />
      </div>
    )}

    {duration && (
      <div className="mt-10 flex justify-center animate-fadeInUp">
        <div className="px-8 py-6 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-white/20">
          <p className="text-xl font-medium tracking-wide mb-2">
            🎬 <span className="text-blue-400">Total Videos:</span> {videoCount}
          </p>
          <p className="text-xl font-medium tracking-wide">
            ⏱ <span className="text-cyan-400">Total Duration:</span> {duration}
          </p>
        </div>
      </div>
    )}

    {error && (
      <div className="mt-8 text-red-100 bg-red-500/10 border border-red-400/20 p-4 rounded-xl text-center max-w-xl w-full">
        ❌ {error}
      </div>
    )}
  </div>
  )
}

export default YtBox
