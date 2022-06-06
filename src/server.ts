import express from 'express';
import cors from 'cors';
import router from './routes';
import mongoose from 'mongoose';

const app = express();

// Database
mongoose.connect('mongodb+srv://admin:12345@cluster0.1seggv7.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(8080, () => {
    console.log('HTTP server running!');
});