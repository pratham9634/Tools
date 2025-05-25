

import File from '@/models/File'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import dbConnect from '@/lib/mongodb'

export const GET = async (_req, { params }) => {
  const { id } = params
  await dbConnect()

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const file = await File.findById(id)
  if (!file) {
    return NextResponse.json({ error: 'File not found or expired' }, { status: 404 })
  }

  return NextResponse.redirect(file.cloudinaryUrl)
}
