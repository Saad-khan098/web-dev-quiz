import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    createdAt: {type: Date, default: new Date()}
})
export default mongoose.models.User || mongoose.model('User', UserSchema)
