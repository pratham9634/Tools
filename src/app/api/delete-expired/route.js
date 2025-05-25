

import File from '@/models/File'
import cloudinary from '@/lib/cloudinary'
import dbConnect from '@/lib/mongodb'

export const GET = async () => {
  await dbConnect()
  const expired = await File.find({ expireAt: { $lte: new Date() } })

  for (const file of expired) {
    await cloudinary.uploader.destroy(file.cloudinaryId, { resource_type: 'auto' })
    await file.deleteOne()
  }

  return new Response('Expired files cleaned')
}
