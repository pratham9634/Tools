import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import File from '@/models/File'
import dbConnect from '@/lib/mongodb'

export const POST = async (req) => {
  const formData = await req.formData()
  const file = formData.get('file')

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  await dbConnect()

  // Get MIME type from uploaded file
  const mimeType = file.type || ''

  // Determine Cloudinary resource_type based on MIME type
  let resourceType = 'raw' // default fallback for unknown types

  if (mimeType.startsWith('image/')) {
    resourceType = 'image'
  } else if (mimeType.startsWith('video/')) {
    resourceType = 'video'
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  // Wrap cloudinary upload_stream in a Promise
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    stream.end(buffer)
  })

  const newFile = await File.create({
    originalName: file.name,
    cloudinaryUrl: uploadResult.secure_url,
    cloudinaryId: uploadResult.public_id,
    expireAt: new Date(Date.now() + 10 * 60 * 1000), // 5 minutes expiry
  })

  return NextResponse.json({ downloadId: newFile._id })
}
