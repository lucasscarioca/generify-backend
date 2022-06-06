import mongoose, { Schema } from 'mongoose';

const SongSchema: Schema = new mongoose.Schema({
    artist: { type: String, required: true },
    name: { type: String, required: true },
    file: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model('Song', SongSchema);