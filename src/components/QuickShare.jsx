'use client'
import styled from 'styled-components';
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FaCopy } from 'react-icons/fa'
import { MdCheck } from 'react-icons/md'
import { cn } from '@/lib/utils'

const QuickShare = () => {
  const [file, setFile] = useState(null)
  const [link, setLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
  
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
  
      if (!res.ok) {
        const errText = await res.text()
        console.error('Upload failed:', errText)
        throw new Error('Failed to upload file')
      }
  
      const { downloadId } = await res.json()
      setLink(`${window.location.origin}/api/download/${downloadId}`)
    } catch (err) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }
  

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
  <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl px-8 py-10 max-w-xl w-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] text-white text-center space-y-8">
    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 via-white to-amber-800 text-transparent bg-clip-text">
      🔐 Quick File Share
    </h1>

    {/* File Upload Section */}
    <div className="flex flex-col gap-4 items-center">
      <StyledWrapper>
        <div className="container">
          <div className="folder">
            <div className="top" />
            <div className="bottom" />
          </div>
          <label className="custom-file-upload">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer focus:outline-none"
            />
            Choose a file
          </label>
        </div>
      </StyledWrapper>

      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-500 transition-all duration-200"
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </Button>
    </div>

    {/* Link and Copy Section */}
    {link && (
      <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
        <Input
          className="text-white bg-gray-900 border border-gray-700 focus:ring-violet-500 select-text"
          value={link}
          readOnly
        />
        <div className="flex gap-4 justify-center w-full">
          <Button
            className={cn(
              'flex items-center gap-2 bg-violet-600 hover:bg-violet-500 transition-all duration-200',
              copied && 'bg-emerald-600 hover:bg-emerald-500'
            )}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                Copied <MdCheck className="text-lg" />
              </>
            ) : (
              <>
                Copy Link <FaCopy className="text-sm" />
              </>
            )}
          </Button>

          <Button
            onClick={() => window.open(link, '_blank')}
            className="bg-blue-600 hover:bg-blue-500 transition-all duration-200"
          >
            Open Link
          </Button>
        </div>
      </div>
    )}

    {/* Note Section */}
    <p className="text-sm text-yellow-200 bg-yellow-800/20 border border-yellow-400/40 p-3 rounded-lg shadow-sm">
      ⚠️ Currently supports <span className="font-semibold">image</span> and <span className="font-semibold">video</span> files only.<br />
      Other file types (e.g. PDFs, ZIPs) will be supported <span className="italic">very soon</span>.<br />
      ⏳ <span className="font-medium">Note:</span> The download link is valid for <span className="font-semibold">10 minutes</span> only.
    </p>
  </div>
</div>



  )
}

export default QuickShare

const StyledWrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #6dd5ed, #2193b0);
    border-radius: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  .folder {
    position: relative;
    animation: float 2.5s infinite ease-in-out;
    transition: transform 0.3s ease;
  }

  .folder:hover {
    transform: scale(1.05);
  }

  .folder .top {
    background: linear-gradient(135deg, #ff9a56, #ff6f56);
    width: 80px;
    height: 20px;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 2;
  }

  .folder .bottom {
    background: linear-gradient(135deg, #ffe563, #ffc663);
    width: 120px;
    height: 80px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    border-radius: 0 10px 10px 10px;
    position: relative;
    top: -10px;
  }

  .custom-file-upload {
    font-size: 1.1em;
    color: #ffffff;
    text-align: center;
    margin-top: 20px;
    padding: 15px 25px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background 0.3s ease;
    display: inline-block;
    width: 220px;
  }

  .custom-file-upload:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  .custom-file-upload input[type="file"] {
    display: none;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-20px);
    }

    100% {
      transform: translateY(0px);
    }
  }`;