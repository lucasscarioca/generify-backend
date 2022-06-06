import express from 'express';
import Song from '../models/song.model';

const songsRouter = express.Router();

//CRUD SONGS
//CREATE
songsRouter.post("/", async (req, res) => {
    const song = await new Song(req.body).save();

    return res.json(song);
})

//READ ALL
songsRouter.get("/", async (req, res) => {
    const songs = await Song.find();

    return res.json(songs);
})

//READ
songsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const song = await Song.findById({ _id: id });

    return res.json(song);
})

//GET SONGS BY NAME
songsRouter.get("/findByName/:name", async (req, res) => {
    const { name } = req.params;
    const filteredSongs = await Song.find({ name: { $regex: name, $options: 'i' } });

    return res.json(filteredSongs);
})

//UPDATE
songsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await Song.updateOne({ _id: id }, { $set: req.body });

    return res.json({ message: "Song successfully changed!" });
})

//DELETE
songsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Song.findByIdAndDelete({ _id: id });

    return res.json({ message: "Song successfully removed!" });
})

export default songsRouter;