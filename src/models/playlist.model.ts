import mongoose, { Schema } from 'mongoose';

const PlaylistSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    cover: { type: String, required: true },
    about: { type: String, required: true },
    owner: { type: String, default: null },
    songs: { type: Array, required: true },
}, {
    timestamps: true
});

export default mongoose.model('Playlist', PlaylistSchema);