import mongoose from 'mongoose'

const FileSchema = new mongoose.Schema({
  originalName: String,
  cloudinaryUrl: String,
  cloudinaryId: String,
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date }, // e.g., 5 mins after upload
})

FileSchema.index({ expireAt: 1 }, { expireAfterSeconds: 600 })

export default mongoose.models.File || mongoose.model('File', FileSchema)
