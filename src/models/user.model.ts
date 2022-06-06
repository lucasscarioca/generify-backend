import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: { type: String, required: true },
    userPlaylists: { type: Array, required: true },
}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema);