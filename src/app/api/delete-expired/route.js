import { NextResponse } from 'next/server';

import File from '@/models/File'
import cloudinary from '@/lib/cloudinary'
import dbConnect from '@/lib/mongodb'

export const GET = async () => {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }
  await dbConnect()
  const expired = await File.find({ expireAt: { $lte: new Date() } })

  for (const file of expired) {
    await cloudinary.uploader.destroy(file.cloudinaryId, { resource_type: 'auto' })
    await file.deleteOne()
  }
  return NextResponse.json({message:"cron job ran at : "+ new Date()});
}
