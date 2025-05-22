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
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex w-full max-w-md items-center space-x-2 bg-gray-800/60 backdrop-blur-md p-6 rounded-3xl shadow-2xl">
          <Input
            placeholder="Paste YouTube playlist URL"
            className="flex-1 bg-gray-700 text-white placeholder:text-gray-400 rounded-2xl focus:ring-4 focus:ring-indigo-500"
            onChange={(e) => setLink(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition duration-200"
          >
            Get Duration
          </Button>
        </div>
      </form>

      {loading && (
        <div className="mt-6 text-center text-white">
          <Loading />
        </div>
      )}

      {duration && (
        <div className="mt-8 flex justify-center animate-fadeInUp">
          <div className="px-6 py-4 bg-gray-800/70 backdrop-blur-md text-white rounded-2xl shadow-xl border border-gray-700">
            <p className="text-lg font-semibold tracking-wide mb-1">
              🎬 Total Videos: <span className="text-indigo-400">{videoCount}</span>
            </p>
            <p className="text-lg font-semibold tracking-wide">
              ⏱ Total Duration: <span className="text-indigo-300">{duration}</span>
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 text-red-200 bg-red-500/20 border border-red-400/30 p-3 rounded-xl text-center max-w-md w-full">
          ❌ {error}
        </div>
      )}
    </div>
  )
}

export default YtBox
