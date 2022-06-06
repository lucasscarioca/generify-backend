import express from 'express';
import User from '../models/user.model';
import Playlist from '../models/playlist.model';
import { hash, compare } from 'bcrypt';

const usersRouter = express.Router();

//CRUD USERS
//CREATE
usersRouter.post("/", async (req, res) => {
    const { username, email, password, birthDate, userPlaylists } = req.body;
    const hashedPassword = await hash(password, 8);
    const user = {
        username,
        email,
        password: hashedPassword,
        birthDate,
        userPlaylists
    }
    const savedUser = await new User(user).save();

    return res.json(savedUser);
})

//READ ALL
usersRouter.get("/", async (req, res) => {
    const users = await User.find();

    return res.json(users);
})

//READ
usersRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById({ _id: id });

    return res.json(user);
})

//GET USER PLAYLISTS
usersRouter.get("/:id/playlists", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    const userPlaylists = await Playlist.find({ _id: { $in: user.userPlaylists } });

    return res.json(userPlaylists);
})

//VALIDATE USER
usersRouter.post("/validate", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.find({ username: username });
    const matchPassword = await compare(password, user[0].password);
    const status = matchPassword ? "success" : "error";

    return res.json({ status, data: matchPassword ? user : {} });
})

//UPDATE
usersRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await User.updateOne({ _id: id }, { $set: req.body });

    return res.json({ message: "User successfully changed!" });
})

//DELETE
usersRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete({ _id: id });

    return res.json({ message: "User successfully removed!" });
})

export default usersRouter;