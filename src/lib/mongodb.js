// lib/mongodb.js

import mongoose from 'mongoose'

let isConnected = false // global connection state

export default async function dbConnect() {
  if (isConnected) return

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'file-share',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = db.connections[0].readyState === 1
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
    throw err
  }
}
