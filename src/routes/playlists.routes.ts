import express from 'express';
import Playlist from '../models/playlist.model';
import Song from '../models/song.model';

const playlistsRouter = express.Router();

//CRUD SONGS
//CREATE
playlistsRouter.post("/", async (req, res) => {
    const playlist = await new Playlist(req.body).save();

    return res.json(playlist);
})

//READ ALL
playlistsRouter.get("/all", async (req, res) => {
    const playlists = await Playlist.find();

    return res.json(playlists);
})

//READ
playlistsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const playlist = await Playlist.findById({ _id: id });

    return res.json(playlist);
})

//GET ONLY PUBLIC PLAYLISTS
playlistsRouter.get("/", async (req, res) => {
    const publicPlaylists = await Playlist.find({ owner: null });

    return res.json(publicPlaylists);
})

//GET PLAYLIST SONGS
playlistsRouter.get("/:id/songs", async (req, res) => {
    const { id } = req.params;
    const playlist = await Playlist.findById({ _id: id });
    const playlistSongs = await Song.find({ _id: { $in: playlist.songs } });

    return res.json(playlistSongs);
})

//UPDATE
playlistsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await Playlist.updateOne({ _id: id }, { $set: req.body });

    return res.json({ message: "Playlist successfully changed!" });
})

//DELETE
playlistsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Playlist.findByIdAndDelete({ _id: id });

    return res.json({ message: "Playlist successfully removed!" });
})

export default playlistsRouter;